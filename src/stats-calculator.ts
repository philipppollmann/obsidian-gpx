import { GpxData, RouteStats } from "./types";

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function computeStats(data: GpxData): RouteStats {
  const { points } = data;

  let totalDistanceM = 0;
  let elevationGainM = 0;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    totalDistanceM += haversineDistance(prev.lat, prev.lon, curr.lat, curr.lon);

    if (curr.ele !== null && prev.ele !== null && curr.ele > prev.ele) {
      elevationGainM += curr.ele - prev.ele;
    }
  }

  const startTime = points[0]?.time ?? null;
  const endTime = points[points.length - 1]?.time ?? null;
  const durationSeconds =
    startTime && endTime
      ? (endTime.getTime() - startTime.getTime()) / 1000
      : null;

  const distanceKm = totalDistanceM / 1000;
  const paceMinPerKm =
    durationSeconds !== null && distanceKm > 0
      ? durationSeconds / 60 / distanceKm
      : null;

  return {
    distanceKm,
    elevationGainM: Math.round(elevationGainM),
    durationSeconds,
    paceMinPerKm,
    startTime,
  };
}
