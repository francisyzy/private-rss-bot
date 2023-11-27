import { Item, PrismaClient } from "@prisma/client";
import { RSSItem } from "./rss";
import { extractYear, getCurrentYear } from "./utils/dateExtract";
const prisma = new PrismaClient();

export async function addIntoDb(items: RSSItem[]): Promise<void> {
  for (const item of items) {
    if (extractYear(item.title) > getCurrentYear() - 2) {
      const clean_item = {
        creator: item.creator,
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item.content,
        contentSnippet: item.contentSnippet,
        guid: item.guid,
        isoDate: new Date(item.isoDate),
      };
      await prisma.item.upsert({
        where: { guid: item.guid },
        update: clean_item,
        create: clean_item,
      });
    }
  }
}

export async function extractNotNotified(): Promise<Item[]> {
  const items = await prisma.item.findMany({
    where: {
      toNotify: true,
    },
    orderBy: {
      isoDate: "desc",
    },
  });
  await prisma.item.updateMany({
    where: {
      toNotify: true,
    },
    data: {
      toNotify: false,
    },
  });
  return items;
}
