import { colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";
extend([lchPlugin]);

const hexes = {
  "forest-900": "#1a2e1c",
  "forest-700": "#24402a",
  "forest-500": "#3d5c40",
  "sand-100": "#f5efe1",
  "sand-200": "#ede3cd",
  "action-500": "#c1521a",
  "text-light-on-dark": "#f2ede0",
  "text-dark-on-light": "#1a2e1c",
  "text-muted-on-light": "#3a3630",
};

for (const [name, hex] of Object.entries(hexes)) {
  const lch = colord(hex).toLch();
  console.log(`--${name}: oklch(TODO calculate actual oklch)`);
}
