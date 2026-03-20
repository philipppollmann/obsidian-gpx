# GPX Viewer for Obsidian

Visualize GPX tracks on an interactive map directly in Obsidian — like Strava.

## Features

- Click any `.gpx` file → opens an interactive map
- Route drawn in Strava orange with start/finish markers
- Stats panel: distance, elevation gain, duration, pace
- OpenStreetMap tiles, pan and zoom freely

## Installation

1. Build: `npm install && npm run build`
2. Copy `main.js`, `styles.css`, `manifest.json` into:
   ```
   <your-vault>/.obsidian/plugins/obsidian-gpx/
   ```
3. Obsidian → Settings → Community Plugins → enable **GPX Viewer**

## Usage

Click any `.gpx` file in the file explorer — it opens in the map view automatically.

## Development

```bash
npm install     # install dependencies
npm run dev     # watch mode (auto-rebuild on save)
npm run build   # production build
npm run lint    # TypeScript type check
```