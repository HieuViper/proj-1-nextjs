const myConstant = {
    news: {
        image: {
            PAGE_SIZE: 36,
            COLUMNS: 6,
            FILE_LIMITED_SIZE: 2,
            FOLDER_UPLOAD: '/uploads/news',
            QUALITY: 70
        },
    },
    articles: {
        image: {
            PAGE_SIZE: 36,
            COLUMNS: 6,
            FILE_LIMITED_SIZE: 2,
            FOLDER_UPLOAD: '/uploads/articles',
            QUALITY: 70
        },
    },
    users: {
        image: {
            FILE_LIMITED_SIZE: 2,
            FOLDER_UPLOAD: '/uploads/users',
            QUALITY: 70
        },
    },
    products: {
        PAGE_SIZE: 36,
        COLUMNS: 6,
        FILE_LIMITED_SIZE: 2,
        FOLDER_UPLOAD: '/uploads/products',
        QUALITY: 70
    },
    post: {
        POST_STATUS_DRAFT: 'draft',
        POST_STATUS_PUBLISH: 'publish',
        POST_STATUS_TRASH: 'trash',
        POST_STATUS_PRIORITY: 'priority',
        PAGE_SIZE: 10
    },
    DEFAULT_LANGUAGE: 'vi',
    LOGIN_TIME: 3600,
    SIZES: '(min-width: 450px) 100vw, 25vw',
}
module.exports = myConstant;