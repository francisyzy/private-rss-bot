import Parser from "rss-parser";
import config from "./config";

const parser = new Parser();
const feedURL = config.URL;

export type RSSItem = {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
};

export async function readRssFeed(): Promise<any> {
  if (feedURL === undefined) {
    throw new Error("URL not specified");
  }
  return (await parser.parseURL(feedURL)).items as RSSItem[];
}
