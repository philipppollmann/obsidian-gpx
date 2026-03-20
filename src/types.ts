export const GPX_VIEW_TYPE = "gpx-view";

export interface GpxPoint {
  lat: number;
  lon: number;
  ele: number | null;
  time: Date | null;
}

export interface GpxData {
  name: string;
  points: GpxPoint[];
}

export interface RouteStats {
  distanceKm: number;
  elevationGainM: number;
  durationSeconds: number | null;
  paceMinPerKm: number | null;
  startTime: Date | null;
}
