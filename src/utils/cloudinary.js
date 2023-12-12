// import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been upload successfully
    console.log(`file uploaded successfully on cloudinary`, response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    //remove the locally uploaded file if failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const deleteFromCloudinary= async(filepath)=>{
  const fileName = filepath.split("/")

  const response = await cloudinary.uploader.destroy(fileName[fileName.length-1].split(".")[0])
return response
}

export { uploadOnCloudinary, deleteFromCloudinary};
