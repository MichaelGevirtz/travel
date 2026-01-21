import https from 'https';
import fs from 'fs';
import path from 'path';

// Using placeholder service that provides direct images
const BASE_URL = 'https://picsum.photos';

interface ImageConfig {
  filename: string;
  width: number;
  height: number;
  outputPath: string;
}

const images: ImageConfig[] = [
  // Hero images
  { filename: 'hero-vietnam.jpg', width: 1920, height: 1080, outputPath: 'public/images' },
  { filename: 'vietnam-hero.jpg', width: 1920, height: 1080, outputPath: 'public/images' },

  // Destination images
  { filename: 'hanoi.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'ho-chi-minh-city.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'ha-long-bay.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'hoi-an.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'da-nang.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'phu-quoc.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'sapa.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'nha-trang.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'hue.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'da-lat.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'ninh-binh.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'mui-ne.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'phong-nha.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'mekong-delta.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'cat-ba.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'ha-giang.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'quy-nhon.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'con-dao.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },
  { filename: 'vung-tau.jpg', width: 800, height: 600, outputPath: 'public/images/destinations' },

  // Itinerary images
  { filename: '1-week.jpg', width: 1600, height: 900, outputPath: 'public/images/itineraries' },
  { filename: '2-weeks.jpg', width: 1600, height: 900, outputPath: 'public/images/itineraries' },
  { filename: '3-weeks.jpg', width: 1600, height: 900, outputPath: 'public/images/itineraries' },
];

function downloadImage(config: ImageConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/${config.width}/${config.height}`;
    const outputFile = path.join(config.outputPath, config.filename);

    // Ensure directory exists
    fs.mkdirSync(config.outputPath, { recursive: true });

    const followRedirects = (url: string, maxRedirects = 5): void => {
      if (maxRedirects === 0) {
        reject(new Error('Too many redirects'));
        return;
      }

      https.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            followRedirects(redirectUrl, maxRedirects - 1);
          } else {
            reject(new Error('Redirect without location header'));
          }
        } else if (response.statusCode === 200) {
          const file = fs.createWriteStream(outputFile);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✓ Downloaded: ${config.filename}`);
            resolve();
          });
          file.on('error', (err) => {
            fs.unlink(outputFile, () => {});
            reject(err);
          });
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      }).on('error', (err) => {
        reject(err);
      });
    };

    followRedirects(url);
  });
}

async function downloadAll() {
  console.log('📥 Starting image downloads from Lorem Picsum...\n');
  console.log(`Total images to download: ${images.length}\n`);

  let completed = 0;
  let failed = 0;

  for (const imageConfig of images) {
    try {
      await downloadImage(imageConfig);
      completed++;
      // Small delay to avoid overwhelming the service
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Failed to download ${imageConfig.filename}:`, error);
      failed++;
    }
  }

  console.log(`\n✅ Download complete!`);
  console.log(`   Successfully downloaded: ${completed}`);
  if (failed > 0) {
    console.log(`   Failed: ${failed}`);
  }
}

downloadAll().catch(console.error);
