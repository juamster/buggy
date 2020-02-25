import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Note = new Schema(
  {
    content: { type: String, maxlength: 5000, required: true },
    bug: { type: ObjectId, ref: "Bug", required: true },
    reportedBy: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Note;