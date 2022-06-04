import Artist from "../../models/Artist";
import { IPriceHistory } from "../types";

export const updatePrice = async (address: string, data: IPriceHistory) => {
  const artist = await Artist.findOne({ social_token_id: address });
  if (!artist) return "Artist not found";

  artist.price_history.push(data);

  artist.save();

  return "Success";
};
