const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "app");
const exts = [".js", ".jsx", ".ts", ".tsx"];
let modified = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      if (exts.includes(path.extname(entry.name))) {
        processFile(full);
      }
    }
  }
}

function processFile(file) {
  const original = fs.readFileSync(file, "utf8");
  // Remove JSX comments like {/* ... */}
  const updated = original.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    modified.push(file);
  }
}

walk(root);
console.log("Removed JSX comments from", modified.length, "files");
if (modified.length) console.log(modified.join("\n"));
process.exit(0);
