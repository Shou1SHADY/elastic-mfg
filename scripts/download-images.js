import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/hero-sequence');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const baseUrl = 'https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/';
const frameCount = 147;

const downloadImage = (index) => {
    const frameNumber = (index + 1).toString().padStart(4, '0');
    const filename = `${frameNumber}.jpg`;
    const url = `${baseUrl}${filename}`;
    const filePath = path.join(outputDir, filename);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const fileStream = fs.createWriteStream(filePath);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filePath, () => { }); // Delete partial file
            reject(err);
        });
    });
};

const downloadAll = async () => {
    console.log('Starting download...');
    for (let i = 0; i < frameCount; i++) {
        try {
            await downloadImage(i);
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log('All downloads complete.');
};

downloadAll();
