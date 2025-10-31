import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Complaint } from "./LiveMapComponent";
import L from "leaflet";

interface MapProps {
    complaints: Complaint[];
    icons: Record<string, L.Icon>;
}

export default function Map({ complaints, icons }: MapProps) {
    const chandigarhCenter: [number, number] = [30.7333, 76.7794];

    return (
        <MapContainer
            center={chandigarhCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {complaints.map((complaint, index) => (
                <Marker
                    key={index}
                    position={[complaint.location_lat, complaint.location_lng]}
                    icon={icons[complaint.status]}
                >
                    <Popup>
                        <div className="p-2 text-sm">
                            <strong>{complaint.category}</strong>
                            <p>Status: {complaint.status}</p>
                            <p>{complaint.description || "No description"}</p>
                            <a
                                href={complaint.google_maps_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Location
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}