import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      callback(p);
    }
  }
}

const vars = [
  'elephantPortrait',
  'elephantPortrait800',
  'elephantPortrait1200',
  'elephantPortrait1600',
  'landscape',
  'landscape800',
  'landscape1200',
  'landscape1600',
  'wildlife',
  'ethicalImg',
  'ethicalImg800',
  'ethicalImg1200',
  'ethicalImg1600',
  'colomboImg',
  'ellaImg',
  'galleImg',
  'hiriketiyaImg',
  'kandyImg',
  'mirissaImg',
  'nuwaraEliyaImg',
  'tangalleImg',
  'jeep',
  'mapLines'
];

walk('./src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const v of vars) {
    // We want to replace {v} with {v.src} when used as a value (e.g. src={landscape}, or ${landscape})
    // But NOT in imports: `import landscape from ...`
    // We can just use a regex that matches `v` preceded by `{` or `\$\{` or `\[` or ` `(in arrays) and followed by `}`, `,`, `]`, ` `.
    
    // Safer: Just find all places where it's not preceded by 'import ' or followed by ' from' or '.src'
    const re = new RegExp(`(?<!import\\s)(?<!import\\s+\\{\\s*)(?<!\\.)\\b${v}\\b(?!\\s+from)(?!\\.src)`, 'g');
    if (re.test(content)) {
      content = content.replace(re, `${v}.src`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed images in ${filePath}`);
  }
});
