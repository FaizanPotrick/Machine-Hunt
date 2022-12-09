import mongoose from "mongoose";

const DB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

export default DB;
