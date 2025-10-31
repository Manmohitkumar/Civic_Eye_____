import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { supabase } from "@/integrations/supabase/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Complaint {
  id: string;
  complaint_id: string;
  title: string;
  status: string;
  location: string;
  latitude: number;
  longitude: number;
  category: string;
}

const ComplaintMap = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .not("latitude", "is", null)
        .not("longitude", "is", null);

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === "resolved") return "text-green-600";
    if (status === "in_progress") return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        // @ts-ignore - react-leaflet type issue
        center={[40.7489, -73.9680]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {complaints.map((complaint) => (
          <Marker
            key={complaint.id}
            // @ts-ignore - react-leaflet type issue
            position={[complaint.latitude, complaint.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-bold text-sm mb-1">{complaint.title}</h4>
                <p className="text-xs text-gray-600 mb-1">ID: {complaint.complaint_id}</p>
                <p className="text-xs mb-1">
                  <span className="font-semibold">Category:</span> {complaint.category}
                </p>
                <p className="text-xs mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={`capitalize ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace("_", " ")}
                  </span>
                </p>
                <p className="text-xs text-gray-600">{complaint.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ComplaintMap;
