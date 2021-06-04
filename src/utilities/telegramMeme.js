import { toast } from "react-toastify";

import { sendMemeOnTelegram } from "../api/memes";

const sendMemeOnTelegramHelper = async (user,memeId) => {
    if (!user) return toast.error("ابتدا وارد اکانت خود شوید");
    if (user && !user.telegramId)
      return toast.error("اکانت شما به بات متصل نیست. راهنما را ببینید");
    const result = await sendMemeOnTelegram(memeId);
    if (result.status && result.status === 200)
      return toast.info("میم در تلگرام ارسال شد ");
}

export default sendMemeOnTelegramHelper;