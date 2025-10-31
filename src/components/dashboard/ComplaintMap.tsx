import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

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
    if (status === "resolved") return "bg-green-100 text-green-800 border-green-300";
    if (status === "in_progress") return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="h-full overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.length === 0 ? (
            <div className="col-span-full flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 mb-2 opacity-50" />
                <p>No complaints with location data</p>
              </div>
            </div>
          ) : (
            complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-1 truncate">{complaint.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">ID: {complaint.complaint_id}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    <span className="text-gray-700">{complaint.category}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`inline-block px-2 py-0.5 rounded border capitalize ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace("_", " ")}
                    </span>
                  </p>
                  <p className="text-gray-600 truncate" title={complaint.location}>
                    <span className="font-semibold">Location:</span> {complaint.location}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Coordinates:</span>{" "}
                    {complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintMap;
