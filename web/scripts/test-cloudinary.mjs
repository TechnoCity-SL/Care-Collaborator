/**
 * Cloudinary integration verification script.
 * Run with: node scripts/test-cloudinary.mjs
 *
 * Set env vars before running — do NOT hardcode credentials:
 *   CLOUDINARY_CLOUD_NAME=yyuznnk7 \
 *   CLOUDINARY_API_KEY=your_api_key \
 *   CLOUDINARY_API_SECRET=your_rotated_secret \
 *   node scripts/test-cloudinary.mjs
 */
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

async function run() {
  const uploadResult = await cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    { public_id: 'care-collaborator-test' }
  );

  process.stdout.write(`Uploaded: ${uploadResult.secure_url}\n`);
  process.stdout.write(`Public ID: ${uploadResult.public_id}\n`);

  const details = await cloudinary.api.resource(uploadResult.public_id);
  process.stdout.write(`Dimensions: ${details.width}x${details.height}\n`);
  process.stdout.write(`Format: ${details.format}\n`);
  process.stdout.write(`File size: ${details.bytes} bytes\n`);

  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  process.stdout.write(`\nOptimised URL:\n${transformedUrl}\n`);
}

run().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
