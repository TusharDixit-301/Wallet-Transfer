const fs = require('fs');
const path = require('path');
const axios = require('axios');
var FormData = require('form-data');
const helper = require("./helper");

let URL = [];


const infuraEndpoint = 'https://ipfs.infura.io:5001/api/v0';
const infuraProjectId = '29l8LmTDhgubYwRqevSu29joCvA';
const infuraProjectSecret = '3e91046bb7b0437061534cc6897be4e1';

async function readFiles() {
const publicFolderPath = path.join(__dirname, '.././NFT');

fs.readdir(publicFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter out non-image files (modify this condition as per your requirements)
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

  imageFiles.forEach((file, index) => { 
     const filePath = path.join(publicFolderPath, file);
      Upload(filePath)
  });
});
}

async function Upload(data) {
  
  // Add file to IPFS
      try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(data));
  
      const headers = {
        ...formData.getHeaders(),
        Authorization: `Basic ${Buffer.from(`${infuraProjectId}:${infuraProjectSecret}`).toString('base64')}`
      };
  
      const response = await axios.post(`${infuraEndpoint}/add?pin=true&cid-version=1&wrap-with-directory=false`, formData, {
        headers,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
  
      console.log('File added to IPFS with CID:', response.data.Hash);
      let Obj = new Object()
      Object.assign(Obj, {token_URL: response.data.Hash});
      URL.push(Obj);
    } catch (error) {
      console.error('Error adding file to IPFS:', error);
    }
    console.log(URL)
    await helper.writeJsonObj(URL, "NFTGalleryURLs.json");
  }
  

readFiles();