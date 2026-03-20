import { GpxData, GpxPoint } from "./types";

export function parseGpx(content: string): GpxData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid GPX file: " + parseError.textContent);
  }

  const nameEl =
    doc.querySelector("trk > name") || doc.querySelector("metadata > name");
  const name = nameEl?.textContent?.trim() || "GPX Track";

  // Collect all track points across all segments
  const trkpts = doc.querySelectorAll("trkpt");
  const points: GpxPoint[] = [];

  trkpts.forEach((pt) => {
    const lat = parseFloat(pt.getAttribute("lat") ?? "");
    const lon = parseFloat(pt.getAttribute("lon") ?? "");

    if (isNaN(lat) || isNaN(lon)) return;

    const eleEl = pt.querySelector("ele");
    const timeEl = pt.querySelector("time");

    const eleRaw = eleEl?.textContent ? parseFloat(eleEl.textContent) : null;
    const timeRaw = timeEl?.textContent
      ? new Date(timeEl.textContent)
      : null;

    points.push({
      lat,
      lon,
      ele: eleRaw !== null && !isNaN(eleRaw) ? eleRaw : null,
      time: timeRaw && !isNaN(timeRaw.getTime()) ? timeRaw : null,
    });
  });

  return { name, points };
}
