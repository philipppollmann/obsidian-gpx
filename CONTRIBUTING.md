# Contributing

Contributions are welcome! Please follow the guidelines below.

## Getting Started

```bash
git clone https://github.com/your-username/obsidian-gpx.git
cd obsidian-gpx
npm install
npm run dev
```

Symlink or copy the plugin folder into your vault for live testing:
```
<your-vault>/.obsidian/plugins/obsidian-gpx/ → this repo
```

## Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run the type check: `npm run lint`
5. Build to verify: `npm run build`
6. Commit and open a Pull Request against `main`

## Branch Naming

| Prefix | Use case |
|--------|----------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Tooling, dependencies, CI |
| `docs/` | Documentation only |

## Commit Messages

Use short, imperative-style commit messages:

```
feat: add elevation chart to stats panel
fix: map container height on first open
chore: bump leaflet to 1.9.5
```

## Code Style

- TypeScript strict mode is enabled — no `any` unless unavoidable
- Keep each source file focused on a single responsibility
- No external dependencies beyond Leaflet without prior discussion

## Reporting Bugs

Please open a GitHub Issue with:
- Obsidian version
- Plugin version
- Steps to reproduce
- What you expected vs. what happened
