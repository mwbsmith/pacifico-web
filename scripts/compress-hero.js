import sharp from "sharp";
import { writeFileSync, readdirSync, existsSync } from "fs";

// Fetch the high-res image from the blob URL
const imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-rope-swing-XYVScIeeAu1OksdhHYkEbQXaEMQbe4.jpg";
const response = await fetch(imageUrl);
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const metadata = await sharp(buffer).metadata();
console.log(`Original: ${metadata.width}x${metadata.height}, ${(buffer.length / 1024).toFixed(0)}KB`);

const output = await sharp(buffer)
  .resize({ width: 1920, withoutEnlargement: true })
  .jpeg({ quality: 80, progressive: true })
  .toBuffer();

console.log(`Compressed: ${(output.length / 1024).toFixed(0)}KB`);

// Output base64 for verification
console.log(`Compression ratio: ${((1 - output.length / buffer.length) * 100).toFixed(1)}% reduction`);
console.log("Compressed image is ready at 1920x wide, quality 80, progressive JPEG");
