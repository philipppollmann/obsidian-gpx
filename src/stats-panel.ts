import { RouteStats } from "./types";

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(2)} km`;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatPace(minPerKm: number): string {
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function renderStatsPanel(
  container: HTMLElement,
  trackName: string,
  stats: RouteStats
): void {
  container.empty();

  const header = container.createDiv("gpx-stats-header");
  header.createEl("h2", { text: trackName, cls: "gpx-track-name" });
  if (stats.startTime) {
    header.createEl("p", {
      text: formatDate(stats.startTime),
      cls: "gpx-track-date",
    });
  }

  const grid = container.createDiv("gpx-stats-grid");

  const statItems: { label: string; value: string; icon: string }[] = [
    {
      label: "Distance",
      value: formatDistance(stats.distanceKm),
      icon: "📏",
    },
    {
      label: "Elevation",
      value: `${stats.elevationGainM} m`,
      icon: "⛰️",
    },
    {
      label: "Duration",
      value: stats.durationSeconds !== null
        ? formatDuration(stats.durationSeconds)
        : "—",
      icon: "⏱️",
    },
    {
      label: "Pace",
      value: stats.paceMinPerKm !== null
        ? formatPace(stats.paceMinPerKm)
        : "—",
      icon: "🏃",
    },
  ];

  for (const item of statItems) {
    const card = grid.createDiv("gpx-stat-card");
    card.createDiv({ text: item.value, cls: "gpx-stat-value" });
    card.createDiv({ text: item.label, cls: "gpx-stat-label" });
  }
}
