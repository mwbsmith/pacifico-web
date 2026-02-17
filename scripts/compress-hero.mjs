import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const input = readFileSync('/public/images/hero-rope-swing.jpg');
console.log(`Original size: ${(input.length / 1024).toFixed(0)} KB`);

const output = await sharp(input)
  .resize(1920, null, { withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toBuffer();

writeFileSync('/public/images/hero-rope-swing.jpg', output);
console.log(`Compressed size: ${(output.length / 1024).toFixed(0)} KB`);
console.log('Done!');
