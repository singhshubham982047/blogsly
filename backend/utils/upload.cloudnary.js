import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      folder: "covers",
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);

    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete local file after error
    console.error(`Error while trying to upload image on Cloudinary ${error}`);
    return null;
  }
};

export const deleteFileFromCloudinary = async (public_id) => {
  const res = await cloudinary.uploader.destroy(public_id);

  return res;
};

export default uploadOnCloudinary;
