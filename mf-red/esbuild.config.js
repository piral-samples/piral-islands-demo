const { resolve, basename } = require("path");
const { readFile, writeFile } = require("fs/promises");

function getIndex(content, markers) {
  for (const marker of markers) {
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      return [idx, marker];
    }
  }

  return [-1, undefined];
}

module.exports = (cfg) => {
  cfg.plugins.unshift({
    name: "external-css-plugin",
    setup(build) {
      build.onEnd(async (result) => {
        const { outputs } = result.metafile;
        const { entryPoints } = build.initialOptions;
        const [name] = Object.keys(entryPoints);
        const root = process.cwd();
        const entryModule = resolve(root, entryPoints[name]);
        const cssFiles = Object.keys(outputs).filter((m) => m.endsWith(".css"));

        cssFiles.forEach((file) => delete outputs[file]);

        await Promise.all(
          Object.keys(outputs)
            .filter((m) => m.endsWith(".js"))
            .map(async (file) => {
              const { entryPoint } = outputs[file];
              const path = resolve(root, file);
              const isEntryModule =
                entryPoint && resolve(root, entryPoint) === entryModule;

              if (isEntryModule) {
                const content = await readFile(path, "utf8");
                const markers = ["export{", "export {"];
                const [idx, marker] = getIndex(content, markers);
                const sc = `var si=${JSON.stringify(
                  cssFiles.map((m) => basename(m))
                )};export{si as styles,`;
                const newContent =
                  content.substring(0, idx) +
                  sc +
                  content.substring(idx + marker.length);
                await writeFile(path, newContent, "utf8");
              }
            })
        );
      });
    },
  });
  return cfg;
};
