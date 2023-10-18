// import { Dropbox } from 'dropbox';

// const YOUR_ACCESS_TOKEN = process.env.DROPBOX_TOKEN; // Replace this with your access token

// const dropbox = new Dropbox({ accessToken: YOUR_ACCESS_TOKEN });

// // Function to upload an image to a specific folder in Dropbox
//  async function uploadImageToDropbox(imageFile, folderPath, fileName) {
//   try {
//     const targetPath = `${folderPath}/${fileName}`; // The full path of the image in the desired folder
//     const response = await dropbox.filesUpload({
//       path: targetPath,
//       contents: imageFile,
//     });

//     console.log('Image uploaded successfully!', response);
//     return response;
//   } catch (error) {
//     console.error('Error uploading image to Dropbox:', error);
//   }
// }

// // Example usage
// const imageFile = ... // Your image file in binary format or Blob
// const folderPath = '/my_images'; // Replace this with the path to your desired folder in Dropbox
// const fileName = 'image.jpg'; // Replace this with your desired file name

// uploadImageToDropbox(imageFile, folderPath, fileName);
