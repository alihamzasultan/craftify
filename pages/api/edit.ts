import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';

const HF_TOKEN =process.env.HF_EDIT_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log("recieved")
      const inputBase64 = req.body.image;
      const prompte = req.body.prompt;

      if (!inputBase64) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const imageBuffer = Buffer.from(inputBase64, 'base64');
      const imageBlob = new Blob([imageBuffer], { type: 'image/png' });

      const hf = new HfInference(HF_TOKEN);

      const response = await hf.imageToImage({
        inputs: imageBlob,
        model: 'timbrooks/instruct-pix2pix',
        parameters: { prompt: prompte },
      });

      console.log(response);

     
      res.setHeader('Content-Type', 'image/png');
      const arrayBuffer = await (response as Blob).arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: 'Error generating or uploading image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



