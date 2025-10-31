import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { supabase } from "@/integrations/supabase/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
      const { data, error } = await (supabase as any)
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

  const mapContainerProps = {
    center: [40.7489, -73.9680] as [number, number],
    zoom: 12,
    scrollWheelZoom: false,
    style: { height: "100%", width: "100%" }
  };

  const tileLayerProps = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer {...mapContainerProps as any}>
        <TileLayer {...tileLayerProps as any} />
        {complaints.map((complaint) => (
          <Marker
            key={complaint.id}
            position={[complaint.latitude, complaint.longitude] as any}
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
