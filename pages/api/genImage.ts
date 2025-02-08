import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

const eventEmitter = new EventEmitter();




const HF_TOKEN = process.env.HF_GEN_TOKEN;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log("recieved")
      const { description, details,username} = req.body;
      let inputbuilder;
      if (details === 'detailed') {
        inputbuilder = 'High Quality and Detailed Image of a ' + description 
      } else {
        inputbuilder = 'High Quality and Minimalistic image of a ' + description
      }

      const hf = new HfInference(HF_TOKEN);

      const response = await hf.textToImage({
        inputs: inputbuilder,
        model: 'prithivMLmods/Canopus-Realism-LoRA',
        parameters: {
          negative_prompt: 'blurry',
        }
      });

      console.log(response)
      const buffer = Buffer.from(await response.arrayBuffer());
       const filenamegenerater = Math.random().toString(36).substring(7);
      const base64Image = buffer.toString('base64');
      const mimeType = 'image/png'; 
      res.status(200).json({
        message: 'Image created and uploaded successfully',
        image: `data:${mimeType};base64,${base64Image}`,
      });
      SaveImage(base64Image,username,description).then(()=>{
        eventEmitter.emit('imageSaved')
      });
  
     

    } catch (error) {
      res.status(500).json({ error: 'Error generating or uploading image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function SaveImage(base64Image:string , userID:string,discrption:string){
  try{

  if(!base64Image || !userID){
     console.error("No image or user ID provided")
  }
  const userDir = path.join(process.cwd(), 'public', 'generated-images', userID);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      const filename = `${discrption}.png`;
      const filePath = path.join(userDir, filename);
      const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(filePath, base64Data, 'base64');


      const fileUrl = `/generated-images/${userID}/${filename}`;
      console.log(fileUrl);
    }catch(error){
      console.error('Error saving image:', error);
      throw new Error('Error saving image');
    }
}