import fs from 'fs';
import path from 'path';

const assetDirs = {
  icons: './assets/icons',
  images: './assets/images',
  backgrounds: './assets/backgrounds',
  banners: './assets/banners',
};

const outputFilePath = './constants/index.ts';

function toCamelCase(fileName: string): string {
  return fileName
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()) // kebab/snake to camelCase
    .replace(/^[^a-zA-Z]+/, ''); // remove invalid starting characters
}

function generateImportsAndExports() {
  const importLines: string[] = [];
  const exportGroups: Record<string, string[]> = {
    icons: [],
    images: [],
    backgrounds: [],
    banners: [],
  };

  for (const [group, dir] of Object.entries(assetDirs)) {
    const fullDir = path.resolve(dir);
    const files = fs.readdirSync(fullDir);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) continue;
      if (file.startsWith('.')) continue; // skip .DS_Store and hidden files

      const varName = toCamelCase(file);
      if (!varName) continue; // skip if we somehow end up with an empty name

      const importPath = `.${dir}/${file}`;
      importLines.push(`import ${varName} from "${importPath}";`);
      exportGroups[group].push(varName);
    }
  }

  const exportLines = Object.entries(exportGroups)
    .map(([groupName, identifiers]) => {
      const items = identifiers.map((id) => `  ${id},`).join('\n');
      return `export const ${groupName} = {\n${items}\n};`;
    });

  const fullOutput = [...importLines, '', ...exportLines].join('\n\n');

  fs.writeFileSync(outputFilePath, fullOutput);
  console.log(`✅ Asset file written to ${outputFilePath}`);
}

generateImportsAndExports();
