import { db } from "@/config/db";

const createLanguage = async () => {
  console.log("Start creating samples for languages table");

  await db.Languages.bulkCreate([
    {
      code: "vi",
      name: "tiếng việt",
      description: "tiếng việt",
    },
    {
      code: "en",
      name: "english",
      description: "english",
    },
  ]);
};

const createNewsCate = async () => {
  await db.News_categories.bulkCreate([
    {
      code: "vi",
      name: "tiếng việt",
      description: "tiếng việt",
    },
    {
      code: "en",
      name: "english",
      description: "english",
    },
  ]);
};

export const createSampleData = async () => {
  createLanguage();
  console.log("start creating bulk data");

  for (let i = 1; i <= 100; i++) {
    //create sample for news, news_languages
    try {
      let news = await db.News.create({
        categories: "cat1, cat2",
        tags: "tag1, tag2",
        post_author: "huy",
        post_status: process.env.POST_STATUS_DRAFT,
        news_code: `url_news_code${i}`,
      });

      await db.News_languages.bulkCreate([
        {
          newsId: news.id,
          title: "tiêu đề của tin " + news.id,
          excerpt: "mô tả ngắn của tin " + news.id,
          content: "Nội dung của tin " + news.id,
          languageCode: "vi",
        },
        {
          newsId: news.id,
          title: "Title of news " + news.id,
          excerpt: "Excerpt of news " + news.id,
          content: "Content of news " + news.id,
          languageCode: "en",
        },
      ]);
      //create sample for articles
      console.log("create sample for articles");
      let article = await db.Articles.create({
        categories: "cat1, cat2",
        tags: "tag1, tag2",
        post_author: "huy",
        post_status: process.env.POST_STATUS_DRAFT,
        article_code: `Article_news_project${i}`,
      });

      await db.Article_languages.bulkCreate([
        {
          articleId: article.id,
          title: "tiêu đề của tin " + article.id,
          excerpt: "mô tả ngắn của tin " + article.id,
          content: "Nội dung của tin " + article.id,
          languageCode: "vi",
        },
        {
          articleId: article.id,
          title: "Title of news " + article.id,
          excerpt: "Excerpt of news " + article.id,
          content: "Content of news " + article.id,
          languageCode: "en",
        },
      ]);
    } catch (error) {
      console.error("Error creating sample data:", error);
    }
  }
  console.log("creating bulk data for news and article is done");

  for (let i = 1; i <= 5; i++) {
    try {
      let articleCate = await db.Article_categories.create({
        category_code: `cate-${i}`,
      });

      await db.Article_cate_langs.bulkCreate([
        {
          articleCategoryId: articleCate.id,
          name: "Tên cate " + articleCate.id,
          description: "mô tả của cate " + articleCate.id,
          languageCode: "vi",
        },
        {
          articleCategoryId: articleCate.id,
          name: "Name cate " + articleCate.id,
          description: "description about cate " + articleCate.id,
          languageCode: "en",
        },
      ]);

      let newsCate = await db.News_categories.create({
        category_code: `cate-${i}`,
        parent: i,
      });

      await db.News_cate_langs.bulkCreate([
        {
          newsCategoryId: newsCate.id,
          name: "Tên cate " + newsCate.id,
          description: "mô tả của cate " + newsCate.id,
          languageCode: "vi",
        },
        {
          newsCategoryId: newsCate.id,
          name: "Name cate " + newsCate.id,
          description: "description about cate " + newsCate.id,
          languageCode: "en",
        },
      ]);
    } catch (error) {
      console.error("Error creating sample data:", error);
    }
  }
  console.log("creating bulk data for cate news and cate article is done");
};
