import { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";

const chandigarhCenter: [number, number] = [30.7333, 76.7794];

const getMarkerColor = (status: string) => {
    switch (status) {
        case 'Resolved':
            return '#4CAF50';  // Green
        case 'In Progress':
            return '#FFC107';  // Yellow
        default:
            return '#F44336';  // Red
    }
};

interface Complaint {
    location_lat: number;
    location_lng: number;
    category: string;
    status: "Resolved" | "In Progress" | "Pending";
    description: string;
    google_maps_link: string;
}

function LiveMapComponent() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchComplaints();
        const interval = setInterval(fetchComplaints, 60000); // refresh every 1 min
        return () => clearInterval(interval);
    }, []);

    const fetchComplaints = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // For testing, using mock data until the API is ready
            const mockData: Complaint[] = [
                {
                    location_lat: 30.7352,
                    location_lng: 76.7811,
                    category: "Sanitation",
                    status: "In Progress",
                    description: "Garbage pile near Sector 22 market",
                    google_maps_link: "https://www.google.com/maps?q=30.7352,76.7811"
                },
                {
                    location_lat: 30.7411,
                    location_lng: 76.7899,
                    category: "Roads & Infrastructure",
                    status: "Resolved",
                    description: "Pothole repaired near Sector 17 Plaza",
                    google_maps_link: "https://www.google.com/maps?q=30.7411,76.7899"
                }
            ];

            // Comment this line and uncomment the axios call when API is ready
            setComplaints(mockData);
            // const response = await axios.get<Complaint[]>("/api/complaints/map");
            // setComplaints(response.data);
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setError("Failed to load complaint data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // No need for heatmap data or marker colors as we're using Leaflet icons

    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

    return (
        <div className="w-full h-screen relative">
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-[1000]">
                    <div className="text-lg font-semibold">Loading map data...</div>
                </div>
            )}
            {error && (
                <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-[1000]">
                    {error}
                </div>
            )}
            <Map
                defaultCenter={chandigarhCenter}
                defaultZoom={13}
                width={window.innerWidth}
                height={window.innerHeight}
            >
                {complaints.map((complaint, index) => (
                    <Marker
                        key={index}
                        width={50}
                        anchor={[complaint.location_lat, complaint.location_lng]}
                        color={getMarkerColor(complaint.status)}
                        onClick={() => setSelectedComplaint(complaint)}
                    />
                ))}
            </Map>

            {selectedComplaint && (
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{selectedComplaint.category}</h3>
                            <p className="text-gray-600">Status: {selectedComplaint.status}</p>
                            <p className="mt-2">{selectedComplaint.description || "No description"}</p>
                            <a
                                href={selectedComplaint.google_maps_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 underline mt-2 inline-block"
                            >
                                View in Google Maps
                            </a>
                        </div>
                        <button
                            onClick={() => setSelectedComplaint(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveMapComponent;
