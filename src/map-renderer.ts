import * as L from "leaflet";
import { GpxData } from "./types";

// Fix Leaflet's broken default icon URLs when bundled with esbuild
function fixLeafletIcons() {
  // We use circleMarkers so no default icons are needed, but this
  // prevents Leaflet from throwing errors trying to resolve image URLs.
  (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl =
    undefined;
  L.Icon.Default.mergeOptions({
    iconUrl: "",
    iconRetinaUrl: "",
    shadowUrl: "",
  });
}

export function initMap(container: HTMLElement): L.Map {
  fixLeafletIcons();

  const map = L.map(container, {
    zoomControl: true,
    preferCanvas: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  return map;
}

export function renderTrack(map: L.Map, data: GpxData): void {
  // Clear previous layers except tile layer
  map.eachLayer((layer) => {
    if (!(layer instanceof L.TileLayer)) {
      map.removeLayer(layer);
    }
  });

  if (data.points.length === 0) return;

  const latlngs: L.LatLngExpression[] = data.points.map((p) => [p.lat, p.lon]);

  // Draw the route polyline (Strava orange)
  const polyline = L.polyline(latlngs, {
    color: "#FC4C02",
    weight: 4,
    opacity: 0.9,
    lineJoin: "round",
    lineCap: "round",
  }).addTo(map);

  // Start marker (green)
  L.circleMarker(latlngs[0] as L.LatLngExpression, {
    radius: 9,
    fillColor: "#00C853",
    color: "#ffffff",
    weight: 2,
    fillOpacity: 1,
  })
    .bindTooltip("Start", { permanent: false, direction: "top" })
    .addTo(map);

  // End marker (red)
  L.circleMarker(latlngs[latlngs.length - 1] as L.LatLngExpression, {
    radius: 9,
    fillColor: "#D50000",
    color: "#ffffff",
    weight: 2,
    fillOpacity: 1,
  })
    .bindTooltip("Finish", { permanent: false, direction: "top" })
    .addTo(map);

  // Fit map bounds with some padding
  map.fitBounds(polyline.getBounds(), { padding: [24, 24] });
}
