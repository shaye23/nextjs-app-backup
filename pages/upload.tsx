import { getDownloadURL, uploadBytes, ref, getStorage } from 'firebase/storage';
import React, { useState } from 'react';

import { storage } from '@/config/firebase';

export const Upload = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSelectedFile = (files: any) => {
    const selectedFile = files && files[0];

    if (selectedFile && selectedFile.size < 1000000) {
      setImageFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setImageUrl(fileUrl);
    } else {
      alert('File size exceeded or file not selected');
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const imageref = ref(storage, `shaye/images/${imageFile.name}`);

      
      uploadBytes(imageref, imageFile).then((snapshot) => {

        getDownloadURL(snapshot.ref).then((url) => {
          console.log('File uploaded successfully:', url);

        });
      }).catch((error) => {
        console.error('Error uploading file:', error.message);
      });
    } else {
      alert('File not found');
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <input
          type="file"
          placeholder="Select file to upload"
          accept="image/png"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />
        <div className="bg-gray-200 p-4 mt-4">
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="max-w-full mb-4" />}
          <h5>{imageFile && imageFile.name}</h5>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUploadFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
