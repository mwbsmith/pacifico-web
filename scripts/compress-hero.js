import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const inputPath = "public/images/hero-rope-swing.jpg";
const buffer = readFileSync(inputPath);

const metadata = await sharp(buffer).metadata();
console.log(`Original: ${metadata.width}x${metadata.height}, ${(buffer.length / 1024).toFixed(0)}KB`);

const output = await sharp(buffer)
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 80, progressive: true })
  .toBuffer();

writeFileSync(inputPath, output);
console.log(`Compressed: ${(output.length / 1024).toFixed(0)}KB`);
console.log("Done!");
