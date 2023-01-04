import { Schema, models, model } from "mongoose";

const ApiKeySchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID field is required"],
    },
    machine: {
      type: String,
      enum: ["ChatBot", "Recommendation System", "Sentiment Analysis"],
      required: [true, "Machine Name field is required"],
      match: [
        /^[a-zA-Z_ ]+$/,
        (props) => `${props.value} is not a valid Machine Name`,
      ],
      trim: true,
    },
    api_key: {
      type: String,
      required: [true, "Api Key field is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Api_Key || model("Api_Key", ApiKeySchema);
