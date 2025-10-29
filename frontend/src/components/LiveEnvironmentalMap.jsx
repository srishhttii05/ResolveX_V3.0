import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- New Imports ---
import ReactDOMServer from "react-dom/server";
import { FaTrash } from "react-icons/fa";
import { IoWater } from "react-icons/io5";

// --- Updated Icon Definitions ---
// Use L.DivIcon to render React components as icons
const wasteIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    // Using green to match your cluster color
    <FaTrash style={{ color: "#22c55e", fontSize: "24px" }} />
  ),
  // Set className to '' to remove Leaflet's default white box and border
  className: "",
  iconSize: [24, 24], // Size of the icon
  iconAnchor: [12, 12], // Center the icon on the coordinate
});

const waterIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    // Using blue to match your cluster color
    <IoWater style={{ color: "#3b82f6", fontSize: "24px" }} />
  ),
  // Set className to '' to remove Leaflet's default white box and border
  className: "",
  iconSize: [24, 24], // Size of the icon
  iconAnchor: [12, 12], // Center the icon on the coordinate
});
// --- End of Updated Definitions ---

const LiveEnvironmentalMap = () => {
  // Focus near IIIT Bhagalpur, Bihar
  const center = [25.2405, 87.0417];

  // Waste reports (sample)
  const wasteReports = [
    { id: 1, position: [25.243, 87.037], description: "Overflowing garbage bin near IIIT Bhagalpur gate" },
    { id: 2, position: [25.236, 87.045], description: "Plastic waste dumping near Ganga riverbank" },
    { id: 3, position: [25.248, 87.052], description: "Burning of biomedical waste near village outskirts" },
    { id: 4, position: [25.250, 87.032], description: "Animal waste accumulation near market area" },
    { id: 5, position: [25.238, 87.041], description: "Open landfill detected near residential zone" },
  ];

  // Water reports (sample)
  const waterReports = [
    { id: 1, position: [25.239, 87.047], description: "High turbidity detected in borewell sample" },
    { id: 2, position: [25.245, 87.039], description: "Contaminated groundwater near drainage zone" },
    { id: 3, position: [25.251, 87.049], description: "High nitrate level recorded near local pond" },
    { id: 4, position: [25.247, 87.030], description: "Unusual color and odor in canal water" },
    { id: 5, position: [25.242, 87.044], description: "Increased TDS in water testing sample" },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Floating Legend */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-200 px-4 py-3 text-sm">
        <h3 className="font-semibold text-gray-800 mb-2 text-center">Legend</h3>
        <div className="flex items-center gap-2 mb-1">
          {/* Using the icon directly in the legend for consistency */}
          <FaTrash style={{ color: "#22c55e" }} />
          <span className="text-gray-700">Waste Reports</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Using the icon directly in the legend for consistency */}
          <IoWater style={{ color: "#3b82f6" }} />
          <span className="text-gray-700">Water Reports</span>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Waste Issue Cluster (Green) */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) =>
            L.divIcon({
              html: `<div style="
                      background-color: #22c55e;
                      color: white;
                      border-radius: 50%;
                      width: 38px;
                      height: 38px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border: 2px solid white;
                      font-weight: bold;">
                      ${cluster.getChildCount()}
                    </div>`,
              className: "waste-cluster",
              iconSize: [38, 38],
            })
          }
        >
          {wasteReports.map((report) => (
            <Marker key={`waste-${report.id}`} position={report.position} icon={wasteIcon}>
              <Tooltip>
                <b className="text-green-600">Waste Issue</b>
                <p>{report.description}</p>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Water Issue Cluster (Blue) */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) =>
            L.divIcon({
              html: `<div style="
                      background-color: #3b82f6;
                      color: white;
                      border-radius: 50%;
                      width: 38px;
                      height: 38px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border: 2px solid white;
                      font-weight: bold;">
                      ${cluster.getChildCount()}
                    </div>`,
              className: "water-cluster",
              iconSize: [38, 38],
            })
          }
        >
          {waterReports.map((report) => (
            <Marker key={`water-${report.id}`} position={report.position} icon={waterIcon}>
              <Tooltip>
                <b className="text-blue-600">Water Quality Issue</b>
                <p>{report.description}</p>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LiveEnvironmentalMap;