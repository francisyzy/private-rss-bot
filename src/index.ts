import { schedule } from "node-cron";

import bot from "./lib/bot";
import { readRssFeed } from "./rss";
import { addIntoDb, extractNotNotified } from "./sorter";
import { notifyItem } from "./utils/sendMessage";

const cron = async () => {
  // https://crontab.guru/#3_0-23_*_*_*
  schedule("3 0-23 * * *", async () => {
    await run();
  });
};

const run = async () => {
  addIntoDb(await readRssFeed());

  const toNotify = await extractNotNotified();
  // console.log(toNotify);

  toNotify.forEach((currentItem) => {
    notifyItem(currentItem);
  });
};

cron();

run();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
