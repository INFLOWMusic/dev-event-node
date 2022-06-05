import mongoose from "mongoose";
import type { IUser } from "../src/types";

const UserSchema = new mongoose.Schema<IUser>({
  account_type: { type: String, default: "user" },
  username: { type: String, unique: true },
  created_at: { type: Number },
  artist_status: {
    default: "none",
    enum: ["none", "pending"],
    type: String,
  },
  has_capabilities: {
    fusd_vault: { type: Boolean, default: true },
    social_vault: { type: Array, default: [] },
  },
  profile_image_key: { type: String },
  pending_artist: {
    artist_name: { type: String },
    twitter_id: { type: String },
    token_symbol: { type: String },
    token_icon_key: { type: String },
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email address"],
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
  updated_at: { type: String },
  address: { type: String, required: true },
  social_tokens: { type: Object },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
