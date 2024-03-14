import express from "express";
import RssParser from "rss-parser";

const app = express();
const parser = new RssParser();
let articles = [];

const addNewArticle = async () => {
  try {
    const feed = await parser.parseURL("https://www.billboard.com/feed/");
    const newArticle = feed.items.find(
      (item) => !articles.some((article) => article.link === item.link)
    );
    if (newArticle) {
      articles.push(newArticle);
      console.log("Added new article:", newArticle.title);
    }
  } catch (error) {
    console.error("Error adding new article:", error);
  }
};

addNewArticle();
setInterval(addNewArticle, 30 * 1000);

app.listen(4444, () => {
  console.log("Server is running on port 4444");
});
