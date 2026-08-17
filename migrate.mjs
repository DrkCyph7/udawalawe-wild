import fs from 'fs';
import path from 'path';

const routesDir = './src/routes';
const appDir = './src/app';

const files = fs.readdirSync(routesDir);

for (const file of files) {
  if (file === '__root.tsx' || file === 'sitemap[.]xml.ts' || file === 'routes.tsx' || !file.endsWith('.tsx')) {
    continue;
  }

  const content = fs.readFileSync(path.join(routesDir, file), 'utf-8');
  let newContent = content;

  // Remove createFileRoute import
  newContent = newContent.replace(/import\s*{\s*createFileRoute\s*}\s*from\s*['"]@tanstack\/react-router['"];?\n?/, '');

  // Extract component name from createFileRoute
  const componentMatch = newContent.match(/component:\s*([A-Za-z0-9_]+)/);
  let componentName = componentMatch ? componentMatch[1] : null;

  if (componentName) {
    // Export default the component
    newContent = newContent.replace(new RegExp(`function ${componentName}\\s*\\(`), `export default function ${componentName}(`);
  }

  // Very naive removal of export const Route = ...
  newContent = newContent.replace(/export const Route = createFileRoute\([^)]*\)\(\{[\s\S]*?\}\);\n?/, '');
  
  // Also clean up any lingering Route exports that might have been missed by the regex (e.g. if it had nested parens)
  // Instead of trying to parse, we can just delete from "export const Route =" to the matching ");" at the end of the block.
  if (newContent.includes('export const Route = createFileRoute')) {
      const start = newContent.indexOf('export const Route = createFileRoute');
      let depth = 0;
      let inString = false;
      let end = -1;
      for (let i = start; i < newContent.length; i++) {
          if (newContent[i] === '"' || newContent[i] === "'") inString = !inString;
          if (!inString) {
              if (newContent[i] === '{' || newContent[i] === '(') depth++;
              if (newContent[i] === '}' || newContent[i] === ')') {
                  depth--;
                  if (depth === 0 && newContent.substr(i+1, 2) === ');') {
                      end = i + 3;
                      break;
                  }
              }
          }
      }
      if (end !== -1) {
          newContent = newContent.substring(0, start) + newContent.substring(end);
      }
  }

  // Add "use client" for safety if it contains certain hooks (we will refine later if needed, but for now we just want it to compile)
  // Actually, we can add it to pages that have `useState`, `useEffect`, `useRouter`, `framer-motion`, etc.
  if (
    newContent.includes('useState') || 
    newContent.includes('useEffect') || 
    newContent.includes('useRouter') || 
    newContent.includes('framer-motion') ||
    newContent.includes('react-hook-form') ||
    newContent.includes('useCurtain')
  ) {
    newContent = '"use client";\n\n' + newContent;
  }

  const routeName = file === 'index.tsx' ? '' : file.replace('.tsx', '');
  const outDir = path.join(appDir, routeName);
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'page.tsx'), newContent);
  console.log(`Migrated ${file} to ${outDir}/page.tsx`);
}
