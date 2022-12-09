import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "Name cannot be less than 3 characters"],
      maxlength: [100, "Name cannot be more than 100 characters"],
      required: [true, "Name field is required"],
      capitalize: true,
      match: [/^[a-zA-Z ]+$/, (props) => `${props.value} is not a valid Name`],
    },
    email_address: {
      type: String,
      unique: true,
      trim: true,
      maxlength: [320, "Email Address cannot be more than 320 characters"],
      lowercase: true,
      required: [true, "Email Address field is required"],
      match: [
        /^[\w-\.]+@[A-Za-z]+\.[A-Za-z]{2,4}$/,
        (props) => `${props.value} is not a valid Email Address`,
      ],
    },
    type_of_user: {
      type: String,
      enum: ["google", "website"],
      default: "website",
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);
