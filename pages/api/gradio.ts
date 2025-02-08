// import { Client } from "@gradio/client";
// import { NextApiRequest, NextApiResponse } from 'next';
// import FormData from 'form-data';
// import axios from 'axios';


// const IMG_BB_API_KEY = '45fcf7cf49df70f571bbf68589dbd1a8';
// async function uploadImage(buffer: Buffer, filename: string, name: string = '', expiration: string = '') {
//   try {
//     const formData = new FormData();
//     formData.append('key', IMG_BB_API_KEY);
//     formData.append('image', buffer, {
//       filename,
//       contentType: 'image/png', 
//     });
//     if (name) {
//       formData.append('name', name);
//     }
//     if (expiration) {
//       formData.append('expiration', expiration);
//     }

//     const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
//       headers: {
//         ...formData.getHeaders(),
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw new Error('Error uploading image');
//   }
// }



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const imageFile = req.body;
//   console.log(imageFile);
//   const random = Math.random().toString(36).substring(7);
//   if (imageFile){
//     const resu = await uploadImage(imageFile, random);
//     console.log(resu.data);
//   }


//   const response_0 = await fetch("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s");
//   const exampleImage = await response_0.blob();


//   const client = await Client.connect("not-lain/background-removal");


//   const result = await client.predict("/image", {
//     image: exampleImage,
//   });

//   console.log(result.data);

//   res.status(200).json(result.data);
// }
