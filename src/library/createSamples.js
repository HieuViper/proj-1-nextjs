const db = require("@/app/models");
const myConstant = require('@/store/constant')

const createLanguage = async () => {
  console.log("Start creating samples for languages table");

  await db.Languages.bulkCreate([
    {
      id: 1,
      code: "vi",
      name: "tiếng việt",
      description: "tiếng việt",
    },
    {
      id: 2,
      code: "en",
      name: "english",
      description: "english",
    },
  ]);
};

//create users
export const createUsers = async () => {
  console.log("Start creating samples for Users table");

  await db.Users.bulkCreate([
    {
      username: "admin",
      password: "$2b$10$rPaOOP0Qz/5tEfm5BqFfwOzrDAVBfpjiB2radK82ybwnylPUqXKZa", //admin
      nick_name: "admin",
      role: "Administrator",
      createdAt: db.sequelize.literal("now()"),
      updatedAt: db.sequelize.literal("now()"),
    },
  ]);
};

//create news category
const createNewsCate = async () => {
  try {
    //first record of news category
    let newsCate0 = await db.News_categories.create({
      category_code: `kinh_te`,
      parent: null,
    });

    await db.News_cate_langs.bulkCreate([
      {
        news_categoryId: newsCate0.id,
        name: "Kinh tế",
        description: "Hoạt động kinh tế nổi bật trong vòng 24h qua ",
        languageCode: 'vi',
      },
      {
        news_categoryId: newsCate0.id,
        name: "Economy",
        description: "Featured economic activities",
        languageCode: 'en',
      },
    ]);
    //second record of news category
    let newsCate1 = await db.News_categories.create({
      category_code: `xa_hoi`,
      parent: null,
    });

    await db.News_cate_langs.bulkCreate([
      {
        news_categoryId: newsCate1.id,
        name: "Xã hội",
        description: "Các sự kiện xã hội trong nước",
        languageCode: 'vi',
      },
      {
        news_categoryId: newsCate1.id,
        name: "Society",
        description: "The social events in the dosmetic country",
        languageCode: 'en',
      },
    ]);

    //the third record of news category
    let newsCate = await db.News_categories.create({
      category_code: `bat_dong_san`,
      parent: newsCate0.id,
    });

    await db.News_cate_langs.bulkCreate([
      {
        news_categoryId: newsCate.id,
        name: "Bất động sản",
        description: "Thông tin các dự án mới đang được triển khai",
        languageCode: 'vi',
      },
      {
        news_categoryId: newsCate.id,
        name: "Real Estate",
        description: "New starting projects's information ",
        languageCode: 'en',
      },
    ]);

    //the fourth record of news category
    let newsCate4 = await db.News_categories.create({
      category_code: `chung_khoan`,
      parent: newsCate0.id,
    });

    await db.News_cate_langs.bulkCreate([
      {
        news_categoryId: newsCate4.id,
        name: "Chứng khoán",
        description: "Thông tin tức thời trên thị trường chứng khoán",
        languageCode: 'vi',
      },
      {
        newsCate4goryId: newsCate.id,
        name: "Stock market",
        description: "Instant news of stock market",
        languageCode: 'en',
      },
    ]);
  } catch (error) {
    console.log("cannot create category for news");
  }
  console.log("Creating news Category is done");
};

//Create article category
const createArticleCategories = async () => {
  for (let i = 1; i <= 5; i++) {
    try {
      let articleCate = await db.Article_categories.create({
        category_code: `cate-${i}`,
      });

      await db.Article_cate_langs.bulkCreate([
        {
          article_categoryId: articleCate.id,
          name: "Tên cate " + articleCate.id,
          description: "mô tả của cate " + articleCate.id,
          languageCode: 'vi',
        },
        {
          article_categoryId: articleCate.id,
          name: "Name cate " + articleCate.id,
          description: "description about cate " + articleCate.id,
          languageCode: 'en',
        },
      ]);
    } catch (error) {
      console.error("Error creating article category data:", error.message);
    }
  }
  console.log("Creating article category is done");
};

//Create tags
const createTags = async () => {
  for (let i = 1; i <= 5; i++) {
    try {
      let tag = await db.Tags.create({
        tag_code: `tag-${i}`,
      });

      await db.Tag_langs.bulkCreate([
        {
          tagId: tag.id,
          name: "Tên tag " + tag.id,
          description: "mô tả của tag " + tag.id,
          languageCode: 'vi',
        },
        {
          tagId: tag.id,
          name: "Name tag " + tag.id,
          description: "description about tag " + tag.id,
          languageCode: 'en',
        },
      ]);
    } catch (error) {
      console.error("Error creating tag data:", error.message);
    }
  }
  console.log("Creating tags is done");
};

//Create manufacturers
const createManufaturer = async () => {
  for (let i = 1; i <= 5; i++) {
    try {
      let manu = await db.Manufacturers.create({
        code: `manufaturer-${i}`,
        website: `web-${i}.com`,
        email: `email-${i}@.yahoo.com`,
      });

      await db.Manufacturer_languages.bulkCreate([
        {
          manufacturerId: manu.id,
          name: "Tên manufaturer " + manu.id,
          description: "mô tả của manufacturer " + manu.id,
          languageCode: 'vi',
        },
        {
          manufacturerId: manu.id,
          name: "Name manufaturer " + manu.id,
          description: "Description of manufacturer " + manu.id,
          languageCode: 'en',
        },
      ]);
    } catch (error) {
      console.error("Error creating tag data:", error.message);
    }
  }
  console.log("Creating manufacturer is done");
};


//Create products
const createProducts = async () => {
  for (let i = 1; i <= 5; i++) {
    try {
      let product = await db.Products.create({
        product_code: `ProductCode-${i}`,
        product_author: 'huy',
        categories: `cat1`,
        price: 200,
      });

      await db.Product_languages.bulkCreate([
        {
          productId: product.id,
          name: "Tên Product " + product.id,
          description: "mô tả của product " + product.id,
          languageCode: 'vi',
        },
        {
          productId: product.id,
          name: "Name Product " + product.id,
          description: "Description of product " + product.id,
          languageCode: 'en',
        },
      ]);
    } catch (error) {
      console.error("Error creating tag data:", error.message);
    }
  }
  console.log("Creating manufacturer is done");
};

export const createSampleData = async () => {
  console.log("start creating bulk data");
  await createLanguage();
  await createUsers();
  await createNewsCate();
  await createArticleCategories();
  await createTags();
  await createManufaturer();
  await createProducts();

  for (let i = 1; i <= 100; i++) {
    //create sample for news, news_languages
    let news;
    try {
      if (i % 5 == 0) {
        news = await db.News.create({
          categories: "bat_dong_san",
          tags: "tag1, tag2",
          post_author: "admin",
          post_status: myConstant.post.POST_STATUS_DRAFT,
          news_code: `url_news_code${i}`,
          createdAt: db.sequelize.literal("now()"),
          post_modified: db.sequelize.literal("now()"),
        });
      } else if (i % 5 == 1) {
        news = await db.News.create({
          categories: "chung_khoan",
          tags: "tag1, tag2",
          post_author: "admin",
          post_status: myConstant.post.POST_STATUS_DRAFT,
          news_code: `url_news_code${i}`,
          createdAt: db.sequelize.literal("now()"),
          post_modified: db.sequelize.literal("now()"),
        });
      } else {
        news = await db.News.create({
          categories: "xa_hoi",
          tags: "tag1, tag2",
          post_author: "admin",
          post_status: myConstant.post.POST_STATUS_DRAFT,
          news_code: `url_news_code${i}`,
          createdAt: db.sequelize.literal("now()"),
          post_modified: db.sequelize.literal("now()"),
        });
      }

      await db.News_languages.bulkCreate([
        {
          newsId: news.id,
          title: "tiêu đề của tin " + news.id,
          excerpt: "mô tả ngắn của tin " + news.id,
          content: "Nội dung của tin " + news.id,
          languageCode: 'vi',
        },
        {
          newsId: news.id,
          title: "Title of news " + news.id,
          excerpt: "Excerpt of news " + news.id,
          content: "Content of news " + news.id,
          languageCode: 'en',
        },
      ]);
      //create sample for articles
      console.log("create sample for articles");
      let article = await db.Articles.create({
        categories: "cat-1, cat-2",
        tags: "tag1, tag2",
        post_author: "huy",
        post_status: myConstant.post.POST_STATUS_DRAFT,
        article_code: `Article_news_project${i}`,
      });

      await db.Article_languages.bulkCreate([
        {
          articleId: article.id,
          title: "tiêu đề của tin " + article.id,
          excerpt: "mô tả ngắn của tin " + article.id,
          content: "Nội dung của tin " + article.id,
          languageCode: 'vi',
        },
        {
          articleId: article.id,
          title: "Title of news " + article.id,
          excerpt: "Excerpt of news " + article.id,
          content: "Content of news " + article.id,
          languageCode: 'en',
        },
      ]);
    } catch (error) {
      console.error("Error creating sample data:", error);
    }
  }
  console.log("creating bulk data for news and article is done");
};
