import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_DB)
      .then(() => console.log("connected to the database"))
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    process.exit(1);
  }
};

export default ConnectDb;
