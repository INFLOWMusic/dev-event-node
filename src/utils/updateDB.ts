import { get, isEmpty } from "lodash";

import Artist from "../../models/Artist";
import { IPriceHistory } from "../types";
import Admin from "../../models/Admin";
import User from "../../models/User";
import cache from "./cache";

interface Params {
  address: string;
  balance: string;
  social_token_id: string;
  price_history: IPriceHistory;
}

export const updateDB = async ({
  balance,
  address,
  price_history,
  social_token_id,
}: Params) => {
  try {
  const artist = await Artist.findOne({ social_token_id });
  if (!artist) {
    console.error("Artist not found");
    return "Artist not found";
  }

  artist.price_history.push(price_history);
  let userId = "";
  const user = await User.findOne({ address });

  const artistUsername = get(artist, "username");
  const artistId = get(artist, "_id");

  if (!isEmpty(user)) {
    user.social_tokens = {
      ...user.social_tokens,
      [artistId]: { balance, token_id: social_token_id },
    };

    artist.fans = {
      ...artist.fans,
      [user._id]: {
        balance,
        name: user.name,
        username: user.username,
        profile_image_key: user.profile_image_key,
      },
    };
    userId = user._id;
    user.save();
  } else {
    const admin = await Admin.findOne({ address });

    if (!isEmpty(admin)) {
      admin.social_tokens = {
        ...admin.social_tokens,
        [artistId]: { balance, token_id: social_token_id },
      };

      artist.fans = {
        ...artist.fans,
        [admin._id]: {
          balance,
          name: admin.name,
          username: admin.username,
          profile_image_key: admin.profile_image_key,
        },
      };

      userId = admin._id;
      admin.save();
    } else {
      const artistAcc = await Artist.findOne({ address });

      if (!isEmpty(artistAcc)) {
        artistAcc.social_tokens = {
          ...artistAcc.social_tokens,
          [artistId]: { balance, token_id: social_token_id },
        };

        artist.fans = {
          ...artist.fans,
          [artistAcc._id]: {
            balance,
            name: artistAcc.name,
            username: artistAcc.username,
            profile_image_key: artistAcc.profile_image_key,
          },
        };
      }

      userId = get(artistAcc, "_id");
      artistAcc.save();
    }
  }

  artist.save();
  await cache.del([
    "artists",
    "discover-daos",
    "discover-artists",
    "dashboard-artists",
    `artist:${artistId}`,
    `artist:${artistUsername}`,
    `dashboard-user:${userId}`,
  ]);
  return "Success";
  }
  catch(error) {
    console.log("there was an error")
    console.error(error);
  }
};
