import { Item } from "@prisma/client";
import bot from "../lib/bot";
import config from "../config";

export function notifyItem(item: Item) {
  if (config.NOTIFY_IDS === undefined) {
    throw new Error("Notify IDs are undefined");
  }

  const notifyIDs = config.NOTIFY_IDS.split(",").map(Number);

  notifyIDs.forEach((chatID: number) => {
    bot.telegram.sendMessage(
      chatID,
      item.content
        .replace(/<p>|<\/p>/g, "")
        .replace(/<br\s*\/?>/g, "\n"),
      {
        parse_mode: "HTML",
      },
    );
  });
}
