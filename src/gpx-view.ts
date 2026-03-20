import { FileView, TFile, WorkspaceLeaf } from "obsidian";
import * as L from "leaflet";
import { GPX_VIEW_TYPE } from "./types";
import { parseGpx } from "./gpx-parser";
import { computeStats } from "./stats-calculator";
import { renderStatsPanel } from "./stats-panel";
import { initMap, renderTrack } from "./map-renderer";

export { GPX_VIEW_TYPE };

export class GpxView extends FileView {
  private map: L.Map | null = null;
  private mapContainer: HTMLElement | null = null;
  private statsContainer: HTMLElement | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return GPX_VIEW_TYPE;
  }

  getDisplayText(): string {
    return this.file?.basename ?? "GPX Viewer";
  }

  getIcon(): string {
    return "map";
  }

  async onOpen(): Promise<void> {
    const root = this.contentEl;
    root.empty();
    root.addClass("gpx-view-root");

    this.statsContainer = root.createDiv("gpx-stats-panel");
    this.mapContainer = root.createDiv("gpx-map-container");

    // Defer map init so the container has a real size in the DOM
    requestAnimationFrame(() => {
      if (this.mapContainer) {
        this.map = initMap(this.mapContainer);
      }
    });
  }

  async onLoadFile(file: TFile): Promise<void> {
    try {
      const content = await this.app.vault.read(file);
      const gpxData = parseGpx(content);
      const stats = computeStats(gpxData);

      if (this.statsContainer) {
        renderStatsPanel(this.statsContainer, gpxData.name, stats);
      }

      // Map may not be ready yet on first load — wait for it
      const render = () => {
        if (this.map && this.mapContainer) {
          renderTrack(this.map, gpxData);
          // Trigger a size recalculation in case the container resized
          setTimeout(() => this.map?.invalidateSize(), 50);
        } else {
          requestAnimationFrame(render);
        }
      };
      render();
    } catch (err) {
      if (this.statsContainer) {
        this.statsContainer.empty();
        this.statsContainer.createEl("p", {
          text: `Failed to parse GPX file: ${(err as Error).message}`,
          cls: "gpx-error",
        });
      }
    }
  }

  async onUnloadFile(file: TFile): Promise<void> {
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          this.map?.removeLayer(layer);
        }
      });
    }
    this.statsContainer?.empty();
  }

  async onClose(): Promise<void> {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.contentEl.empty();
  }
}
