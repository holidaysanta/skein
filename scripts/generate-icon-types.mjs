import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const spriteUrl = new URL('../public/icons.svg', import.meta.url);
const svg = readFileSync(spriteUrl, 'utf-8');

const symbolPattern = /<symbol\b[^>]*\sid\s*=\s*(["'])(.*?)\1/g;

const matches = [...svg.matchAll(symbolPattern)];
const iconNames = matches.map((match) => match[2]);

if (iconNames.length === 0) {
  throw new Error('В спрайте не найдены иконки');
}

if (new Set(iconNames).size !== iconNames.length) {
  throw new Error('В спрайте повторяются ID иконок');
}

const variants = iconNames.map((name) => `  | ${JSON.stringify(name)}`);

const typeSource = `// Generated from public/icons.svg. Do not edit manually.
// prettier-ignore
export type IconName =
${variants.join('\n')};
`;

const outputUrl = new URL('../src/app/shared/icons.ts', import.meta.url);

const currentSource = existsSync(outputUrl)
  ? readFileSync(outputUrl, 'utf8').replace(/\r\n/g, '\n')
  : '';

if (currentSource !== typeSource) {
  writeFileSync(outputUrl, typeSource, 'utf8');
  console.log('Типы иконок обновлены');
} else {
  console.log('Типы иконок актуальны');
}
