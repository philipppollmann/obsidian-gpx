import { Plugin } from "obsidian";
import { GPX_VIEW_TYPE, GpxView } from "./gpx-view";

export default class GpxPlugin extends Plugin {
  async onload() {
    this.registerView(GPX_VIEW_TYPE, (leaf) => new GpxView(leaf));
    this.registerExtensions(["gpx"], GPX_VIEW_TYPE);
  }

  onunload() {
    // Obsidian automatically detaches all registered views on unload
  }
}
