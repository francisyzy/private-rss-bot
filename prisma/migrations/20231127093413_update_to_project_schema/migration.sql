-- CreateTable
CREATE TABLE "Item" (
    "creator" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "pubDate" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentSnippet" TEXT NOT NULL,
    "guid" TEXT NOT NULL PRIMARY KEY,
    "isoDate" DATETIME NOT NULL,
    "toNotify" BOOLEAN NOT NULL DEFAULT true
);
