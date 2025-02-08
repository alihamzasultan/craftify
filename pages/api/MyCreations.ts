import { NextApiRequest,NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { use } from "react";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const username = req.body.username;
    const images = populateImages(username);
  res.status(200).json(images);
}

function populateImages(username:string) {
const directory = path.join(process.cwd(), 'public', 'generated-images');
const users = fs.readdirSync(directory);
let images = users.map((user) => {
if (user == username){
    console.log("found")
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
    
  });}
});

images = images.filter(function (el) {
    return el != null || el != undefined;
} );
return images.flat();


}