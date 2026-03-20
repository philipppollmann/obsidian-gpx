import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { readFileSync, writeFileSync, existsSync } from "fs";

const prod = process.argv[2] === "production";

// After each build, prepend Leaflet's CSS to our styles.css
function mergeCssPlugin() {
  return {
    name: "merge-css",
    setup(build) {
      build.onEnd(() => {
        try {
          const leafletCss = readFileSync(
            "node_modules/leaflet/dist/leaflet.css",
            "utf-8"
          );
          const customCss = existsSync("src/styles.css")
            ? readFileSync("src/styles.css", "utf-8")
            : "";
          writeFileSync("styles.css", leafletCss + "\n" + customCss);
          console.log("styles.css merged successfully.");
        } catch (e) {
          console.error("CSS merge failed:", e.message);
        }
      });
    },
  };
}

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins,
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "main.js",
  plugins: [mergeCssPlugin()],
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
