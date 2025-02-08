import { NextApiRequest,NextApiResponse } from "next";
import path from "path";
import fs from "fs";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const images = populateImages();
  res.status(200).json(images);
}

function populateImages() {
const directory = path.join(process.cwd(), 'public', 'generated-images');
const users = fs.readdirSync(directory);
const images = users.map((user) => {
  const userDir = path.join(directory, user);
  const descriptions = fs.readdirSync(userDir);
  return descriptions.map((description) => {
    const image = fs.readFileSync(path.join(userDir, description));
    const base64Image = image.toString('base64');
    const mimeType = 'image/png';
    return {
      src: `data:${mimeType};base64,${base64Image}`,
      alt: description,
      prompt: user,
    };
  });
});
return images.flat();

}