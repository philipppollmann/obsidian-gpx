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

## Releasing

Ein neues Release wird automatisch über GitHub Actions erstellt, sobald ein Version-Tag gepusht wird:

```bash
git tag 1.0.1
git push origin 1.0.1
```

Die Pipeline baut das Plugin und erstellt ein GitHub Release mit `main.js`, `styles.css` und `manifest.json` als Anhänge.

> Das Tag muss dem Format `MAJOR.MINOR.PATCH` entsprechen, z. B. `1.0.1`.