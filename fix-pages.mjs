import fs from 'fs';
import path from 'path';

const routesDir = './src/routes';
const appDir = './src/app';

const failedFiles = [
  'cancellation-policy.tsx',
  'privacy.tsx',
  'safari-from-colombo.tsx',
  'safari-from-ella.tsx',
  'safari-from-galle.tsx',
  'safari-from-hiriketiya.tsx',
  'safari-from-kandy.tsx',
  'safari-from-mirissa.tsx',
  'safari-from-nuwara-eliya.tsx',
  'safari-from-tangalle.tsx',
  'terms.tsx'
];

for (const file of failedFiles) {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf-8');
  let newContent = content;

  // Remove createFileRoute import
  newContent = newContent.replace(/import\s*{\s*createFileRoute\s*}\s*from\s*['"]@tanstack\/react-router['"];?\n?/, '');

  // Extract metadata part to create Next.js metadata if needed (optional for now, let's just make it compile)
  // The most important thing is to extract the component.
  
  // Find "component: () => ("
  let componentIdx = newContent.indexOf('component: () =>');
  if (componentIdx === -1) {
    componentIdx = newContent.indexOf('component: function');
  }

  if (componentIdx !== -1) {
    const startOfComponent = componentIdx;
    let endOfComponent = newContent.indexOf('});', startOfComponent);
    if (endOfComponent === -1) endOfComponent = newContent.length;

    // extract everything before export const Route
    const routeStartIdx = newContent.indexOf('export const Route');
    const imports = newContent.substring(0, routeStartIdx);
    
    // extract component body
    let componentBody = newContent.substring(startOfComponent + 'component: '.length, endOfComponent).trim();
    if (componentBody.endsWith(',')) componentBody = componentBody.slice(0, -1);
    
    newContent = imports + '\nexport default ' + componentBody + ';\n';
  } else {
    // maybe it has a named component, but our earlier script should have handled that.
    console.log(`Could not find component in ${file}`);
  }

  const routeName = file.replace('.tsx', '');
  const outDir = path.join(appDir, routeName);
  fs.writeFileSync(path.join(outDir, 'page.tsx'), newContent);
  console.log(`Fixed ${outDir}/page.tsx`);
}
