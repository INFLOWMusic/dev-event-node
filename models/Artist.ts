import mongoose from "mongoose";

import { IArtist } from "../src/types/index";

const ArtistSchema = new mongoose.Schema<IArtist>({
  account_type: { type: String, default: "artist" },
  created_at: { type: Number },
  email: {
    type: String,
    required: [true, "Please provide a valid email address"],
  },
  name: {
    type: String,
    required: [true, "Please provide a valid username"],
    maxlength: [20, "user name cannot be longer than 20 characters"],
  },
  bio: { type: String },
  active: { status: Boolean, date: String },
  featured: { type: Boolean, default: false },
  profile_image_key: { type: String },
  profile_mp3_key: { type: String },
  profile_mp3_duration: { type: Number },
  profile_song_name: { type: String },
  launch_at: { type: String },
  updated_at: { type: String },
  address: { type: String, required: true },
  token_status: {
    enum: ["pending", "active", "processing", "none"],
    type: String,
  },
  has_capabilities: {
    fusd_vault: { type: Boolean, default: true },
    social_vault: { type: Array, default: [] },
  },
  is_dao: { type: Boolean, default: false },
  socials: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  singles: [
    {
      genres: { type: Array },
      filename: { type: String },
      play_count: { type: Number },
      created_at: { type: Number },
      file: { type: Object },
      about: { type: String },
      likes: { type: Number },
      credits: { type: String },
      mp3_key: { type: String },
      image_key: { type: String },
      duration: { type: Number },
      is_public: { type: Boolean },
    },
  ],
  mixtapes: [
    {
      name: { type: String },
      created_At: { type: Number },
      image: { type: Object },
      files: { type: Array },
      credits: { type: String },
      about: { type: String },
    },
  ],
  videos: [
    {
      genres: { type: Array },
      filename: { type: String },
      play_count: { type: Number },
      created_at: { type: Number },
      file: { type: Object },
      image: { type: Object },
      likes: { type: Number },
      credits: { type: String },
      about: { type: String },
      video_key: { type: String },
      image_key: { type: String },
      duration: { type: Number },
      is_public: { type: Boolean },
      is_safe: { type: Boolean },
    },
  ],
  album: [
    {
      genres: { type: Array },
      about: { type: String },
      likes: { type: Number },
      image: { type: Object },
      credits: { type: String },
      image_key: { type: String },
      play_count: { type: Number },
      album_name: { type: String },
      created_at: { type: Number },
      songs: [{ name: String, key: String, duration: Number }],
      is_public: { type: Boolean },
    },
  ],
  profile_nfts: { type: Array },
  username: { type: String, unique: true },
  twitter_id: { type: String },
  token_symbol: { type: String },
  token_icon_key: { type: String },
  social_token_id: { type: String },
  social_tokens: { type: Object },
  total_fee: { type: Number },
  price_history: [
    {
      current_price: String,
      created_at: Date,
    },
  ],
  fans: { type: Object },
  vaults: { type: Object },
});

export default mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);
