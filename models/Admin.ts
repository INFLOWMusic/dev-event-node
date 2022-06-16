import mongoose from "mongoose";

import type { IAdmin } from "../src/types";

const AdminSchema = new mongoose.Schema<IAdmin>({
  account_type: { type: String, default: "admin" },
  username: { type: String, unique: true },
  password: { type: String },
  created_at: { type: Number },
  email: {
    type: String,
    required: [true, "Please provide a valid email address"],
  },
  has_capabilities: {
    fusd_vault: { type: Boolean, default: true },
    social_vault: { type: Array, default: [] },
  },
  twitter_id: { type: String },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  profile_image: {
    type: Object,
  },
  profile_image_key: { type: String },
  updated_at: { type: String },
  address: { type: String, required: true },
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
