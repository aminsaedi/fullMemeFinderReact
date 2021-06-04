import { toast } from "react-toastify";

import { likeMeme } from "../api/memes";

const likeMemeHelper = async (user, meme,likes) => {
  if (!user) return toast.error("ابتدا وارد اکانت خود شوید");
  const isLiked = likes.includes(user._id)
  if (isLiked) {
    // Dislike operation
    console.log("dissLiking")
    const result = await likeMeme(meme._id, true);
    if (result.status && result.status === 200)
      return toast.success("میم دیس لایک شد");
  } else if (!isLiked) {
    // Like operation
    console.log("Liking")
    const result = await likeMeme(meme._id, false);
    if (result.status && result.status === 200)
      return toast.success("میم لایک شد");
  }
};

export default likeMemeHelper;
