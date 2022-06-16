interface ISocials {
  facebook: string;
  instagram: string;
  twitter: string;
}

interface IUserSocialTokens {
  [key: string]: { token_id: string; balance: string };
}

interface BucketStorage {
  Location: string;
  Bucket: string;
  Key: string;
  Etag: string;
}

interface AccountType {
  default: string;
  type: string;
}

interface Media {
  _id?: string;
  filename?: string;
  image_key?: string;
  name: string;
  album_name?: string;
  play_count: number;
  created_at: number;
  file: BucketStorage;
  image?: BucketStorage;
  likes?: number;
  credits?: string;
  about?: string;
  duration?: number;
  is_public?: boolean;
  is_safe?: boolean;
}

interface Mixtape {
  name: string;
  created_at: number;
  image: BucketStorage;
  files: Media[];
  credits?: string;
  about?: string;
}

interface ITokenStatus {
  default: string;
  enum: string[];
}

type Split = { address: string; percentage: number };

interface ISocialToken {
  icon: any;
  slope: number;
  symbol: string;
  address: string;
  artist_id: string;
  splits: Split[] | any;
  maximum_supply: number;
}

interface IHasCapabilities {
  fusd_vault: boolean;
  social_vault: string[];
}

export interface IPriceHistory {
  current_price: string;
  created_at: string | Date | number;
}

interface IFans {
  [key: string]: {
    name: string;
    balance: string;
    username: string;
    profile_image_key: string;
  };
}

interface IVault {
  [key: string]: number;
}

interface IProfileNft {
  token_uri: string;
  image_url: string;
}

export interface IArtistStatus {
  default: string;
  enum: string[];
}

export interface IPendingArtist {
  twitter_id?: string;
  artist_name: string;
  token_symbol: string;
  token_icon_key?: string;
}

export interface IArtist {
  _id?: string;
  account_type?: AccountType;
  created_at?: number;
  email?: string;
  name?: string;
  profile_image_key?: string;
  has_capabilities?: IHasCapabilities;
  bio?: string;
  token_status?: ITokenStatus;
  socials?: ISocials;
  featured?: boolean;
  is_dao?: boolean;
  profile_song_name?: string;
  profile_mp3_key?: string;
  profile_mp3_duration?: number;
  updated_at?: string;
  launch_at?: string;
  address?: string;
  singles?: Media[];
  mixtapes?: Mixtape[];
  videos?: Media[];
  album?: Media[];
  active?: { status: boolean; date: Date };
  username?: string;
  twitter_id?: string;
  token_symbol?: string;
  token_icon_key?: string;
  social_token?: ISocialToken;
  social_token_id?: string;
  profile_nfts?: IProfileNft[];
  social_tokens?: IUserSocialTokens;
  price_history?: IPriceHistory[];
  total_fee?: number;
  fans?: IFans;
  vaults?: IVault;
}

export interface IUser {
  account_type: string;
  applied_as_artist: boolean;
  created_at?: number;
  profile_image_key?: string;
  artist_status?: IArtistStatus;
  has_capabilities?: IHasCapabilities;
  pending_artist?: IPendingArtist;
  email?: string;
  twitter_id?: string;
  socials: ISocials;
  username?: string;
  profile_image?: BucketStorage;
  updated_at?: string;
  address: string;
  __v?: number;
  _id: string;
  social_tokens?: IUserSocialTokens;
}

export interface IAdmin {
  account_type: string;
  applied_as_artist: boolean;
  created_at?: number;
  email?: string;
  twitter_id?: string;
  profile_image_key?: string;
  socials: ISocials;
  username?: string;
  password: string;
  profile_image?: BucketStorage;
  has_capabilities?: IHasCapabilities;
  updated_at?: string;
  address?: string;
  __v?: number;
  _id: string;
}
