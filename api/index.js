import axios from "axios";

if (import.meta.env.VITE_REACT_APP_API_URL === undefined) {
    console.error("VITE_REACT_APP_API_URL is not defined");
}
if (import.meta.env.VITE_REACT_APP_API_URL === "") {
    console.error("VITE_REACT_APP_API_URL is empty");
}
if (import.meta.env.VITE_REACT_APP_API_URL === null) {
    console.error("VITE_REACT_APP_API_URL is null");
}
/**
 Route::prefix('v1')->group(function () {

// Public routes

Route::middleware('custom.api.token')->group(function () {
Route::post('/auth-user', [AuthAppUserController::class, 'user_register']);
Route::post('/auth-login', [AuthAppUserController::class, 'user_login']);

Route::post('/customer-login', [AuthController::class, 'login']);
Route::get('social-media',[GeneralWebController::class, 'owner_social_media']);
Route::get('web-theme',[GeneralWebController::class, 'web_theme']);
Route::get('news-road-map',[RoadMapController::class, 'news_road_map']);

// News Comment
Route::post('submit-comment',[NewsCommentController::class, 'submitComment']);
Route::post('submit-comment-reply',[NewsCommentController::class, 'replyComment']);
Route::post('get-comments',[NewsCommentController::class, 'getComments']);
Route::post('get-comment-reply',[NewsCommentController::class, 'getReplies']);

// Election Poll
Route::get('election-poll',[ElectionPollController::class, 'electionPoll']);
Route::post('election-years',[ElectionPollController::class, 'electionYears']);

// General Controller
Route::post('get-daily-horoscope',[GeneralWebController::class, 'getDailyHoroscope']);
Route::post('get-live-cricket',[GeneralWebController::class, 'live_cricket']);
Route::post('get-live-stock-market',[GeneralWebController::class, 'liveStockMarket']);

// Shorts News
Route::post('short-news', [WebShortNewsController::class, 'short_news']);
Route::post('short-news-details', [WebShortNewsController::class, 'short_news_details']);
Route::post('submit-clap', [WebShortNewsController::class, 'submit_clap']);

// Reporter Controller
Route::post('reporter-list',[WebReporterController::class, 'reporter_list']);

// Ads Query
Route::post('raise-query', [WebAdsQueryController::class, 'raise_query']);

// Poll Question
Route::post('poll-category', [WebPollCategoryController::class, 'poll_category']);
Route::post('poll-questions', [WebPollCategoryController::class, 'poll_list']);
Route::post('submit-quiz',[WebPollCategoryController::class, 'submit_quiz']);

// News Controller
Route::post('news-by-id', [WebNewsController::class, 'NewsbyID']);
Route::post('news-by-location', [WebNewsController::class, 'NewsbyLocation']);
Route::post('breaking-news', [WebNewsController::class, 'BreakingNews']);
Route::post('news-sort-by-filter', [WebNewsController::class, 'NewsSortBy']);
Route::post('news-by-location', [WebNewsController::class, 'NewsSortBy']);
Route::post('news-by-category', [WebNewsController::class, 'news_by_category']);
Route::post('news-by-subcategory', [WebNewsController::class, 'news_by_category_subcategory']);


Route::post('category-list', [WebCategroySubCatController::class, 'categoryList']);
Route::post('sub-category-by-list', [WebCategroySubCatController::class, 'subcategory_by_cat_id']);

// Featured Section
Route::post('featured-section',[WebFeaturedSectionController::class, 'featured_section']);
Route::post('featured-news',[WebFeaturedSectionController::class, 'featuredNews']);
Route::post('live-link', [WebLiveStreamingController::class, 'live_link']);

// Pages
Route::get('/page/{slug}', [WebPagesController::class, 'show']);
Route::get('/contact-us', [WebPagesController::class, 'contact_us']);

// Ads Controller
Route::get('top-banner-ads',[WebAdsController::class, 'topBannerAds']);
Route::get('left-home-banner-ads',[WebAdsController::class, 'leftHomeBannerAds']);
Route::get('left-home-main-ads',[WebAdsController::class, 'leftHomeMainAds']);
Route::get('bottom-banner-ads',[WebAdsController::class, 'bottomBannerAds']);
Route::get('search-page-ads',[WebAdsController::class, 'searchPageAds']);
Route::get('custom-right-home-main-ads',[WebAdsController::class, 'customRightHomeMainAds']);
Route::get('custom-right-home-main-2-ads',[WebAdsController::class, 'customRightHomeMainAds2']);
Route::get('custom-right-home-bottom-ads',[WebAdsController::class, 'customRightHomeBottomAds']);
Route::get('news-read-main-page-ads',[WebAdsController::class, 'newsReadMainPageAds']);
Route::get('news-read-bottom-ads',[WebAdsController::class, 'newsReadBottomAds']);

// Menu Management
Route::get('nav-list',[WebMenuManagementController::class, 'menuList']);
Route::post('sub-nav-list',[WebMenuManagementController::class, 'submenu_by_menu_id']);
Route::post('menu-with-sub-nav-list',[WebMenuManagementController::class, 'menuWithSubmenus']);
});
});
 */
const API = axios.create({
    // baseURL: "/api",  // Correct concatenation
    baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`
});

const X_Custom_Token = "aaaaa"
// get api

export const GetUserAuthentication = async (data) => {
    return await API.post("/auth-user", data, {

        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};


export const GetOwnerSocialLinks = async (portal_id) => {
    return await API.get("/social-media", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};



export const GetWebTheme = async (portal_id) => {
    return await API.get("/web-theme", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};

export const menuWithSubNavMenuList = async (portal_id) => {
    return await API.post("/menu-with-sub-nav-list", {
        portal_id
    },
        {
            headers: {
                'X-Custom-Token': "aaaaa",
                // 'Content-Type': 'application/json' // Not needed for GET
            }
        }
    );
};

// export const loadNewsByCategory = async (category) => {
export const loadNewsByCategory = async (category) => {

    return await API.post(
        "/news-by-category",
        { category },
        {
            headers: {
                'X-Custom-Token': "aaaaa",
                'Content-Type': 'application/json', // Optional, but safe to include for POST
            }
        }
    );
    // return await API.post("/news-by-category", {
    //     category
};


export const loadNewsBySubCategory = async (sub_category) => {
    return await API.post("/news-by-subcategory", {
        sub_category
    },
        {
            headers: {
                'X-Custom-Token': "aaaaa",
                'Content-Type': 'application/json' // Not needed for GET
            }
        }
    );
};


// 
// ads 
export const GetTopBannerAds = async (portal_id) => {
    return await API.get("/top-banner-ads", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};

export const GetLeftBannerAds = async (portal_id) => {
    return await API.get(`/left-home-banner-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetLeftHomeMainAds = async (portal_id) => {
    return await API.get(`/left-home-main-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetSearchPageTopAds = async (portal_id) => {
    return await API.get(`/search-page-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetReadNewsPageTopAds = async (portal_id) => {
    return await API.get(`/news-read-main-page-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetReadNewsPageBottomAds = async (portal_id) => {
    return await API.get(`/news-read-bottom-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};

export const GetBottomBannerAds = async (portal_id) => {
    return await API.get("/bottom-banner-ads", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};


// right side ads 
export const GetRightTopAds = async (portal_id) => {
    return await API.get(`/custom-right-home-main-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetRightMainAds = async (portal_id) => {
    return await API.get(`/custom-right-home-main-2-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};

export const GetRightBottomAds = async (portal_id) => {
    return await API.get(`/custom-right-home-bottom-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};
export const GetElectionYear = async (election_poll_id) => {
    return await API.post(
        "/election-years",
        { election_poll_id }, // send as JSON object
        {
            headers: {
                'X-Custom-Token': "aaaaa",
                'Content-Type': 'application/json'
            }
        }
    );
};
export const GetElectionPolls = async () => {
    return await API.get(
        "/election-poll",

        {
            headers: {
                'X-Custom-Token': "aaaaa",
            }
        }
    );
};

export const GetHoroscope = async (sign) => {
    return await API.post(
        "/get-daily-horoscope",
        { zodiac: sign }, // send as JSON object
        {
            headers: {
                'X-Custom-Token': "aaaaa",
            }
        }
    );
};
export const GetLiveCrickeScore = async (params) => {
    return await API.post(
        "/app/live-cricket", // URL
        { params }, // request body (empty in this case)
        {
            headers: {
                'X-Custom-Token': "aaaaa",
            }
        }
    );
};

export const GetLiveStockMarcket = async (params) => {
    return await API.get("/live-stock-marcket", { params }, {
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    }); // use GET with params in query
};

// get live youtube 
export const GetLiveYouTube = async () => {
    return await API.post(
        "/live-link",
        {}, // request body (empty in this case)
        {
            headers: {
                'X-Custom-Token': "aaaaa",
            }
        }
    );
};
// news rioad map 
export const NewsRoadMap = async () => await API.post("/news-road-map", {}, {
    headers: {
        'X-Custom-Token': X_Custom_Token
    }
}
);

// sidebar polls
export const getPollsIds = async () => {
    return await API.post("/poll-category", {}, {
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
}

export const getPollByCategoryId = async (categoryId) => {
    return await API.post("/poll-questions", { pollcategory_id: categoryId }, {
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
}

export const submitVote = async (data) => {
    return await API.post("/submit-quiz", {
        user_id: data.user_id,
        question_id: data.question_id,
        option_id: data.option_id,
    }, {
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
}



export const getBreakingNews = async (portal_id) => {
    return await API.post("/breaking-news", { portal_id }, {

        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};
export const GetAboutUsData = async (portal_id) => {
    return await API.get("/page/about-us", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};
export const GetPrivacyPolicyData = async (portal_id) => {
    return await API.get("/page/privacy-and-policy", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};

export const GetTermsAndConditionData = async (portal_id) => {
    return await API.get("/page/terms-and-conditions", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};
export const GetContactData = async (portal_id) => {
    return await API.get("/contact-us", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};
export const GetOurRepoterData = async (portal_id) => {
    return await API.get("/contact-us", {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
            // 'Content-Type': 'application/json' // Not needed for GET
        }
    });
};
export const AdvertiseWithUsApi = async (data) => {
    return await API.post("/raise-query", data, {
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
};
export const GetShortsNews = async (portal_id) => {
    return await API.post("/short-news", {}, {
        params: { portal_id },
        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
};
export const GetShortsNewsDetails = async (portal_id) => {
    return await API.post("/short-news-details", {
        short_id: portal_id
    }, {

        headers: {
            'X-Custom-Token': "aaaaa",
        }
    });
};


export const GetAdsRightSidebar = async (portal_id) => {
    return await API.get(`/custom-right-home-bottom-ads`, {
        headers: {
            'X-Custom-Token': 'aaaaa',
        },
        params: {
            portal_id: portal_id,
        }
    });
};

// 1. Get News Categories
export const GetNewsCategories = async (portal_id) => {
    try {
        return await API.post(
            "/category-list",
            {},
            {
                params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in GetNewsCategories:", error);
        throw error;
    }
};

// 2. Get News Subcategories (requires portal_id and category_id)
export const GetNewsSubcategories = async (portal_id, category_id) => {
    try {
        return await API.post(
            "/sub-category-by-list",
            { category_id },
            {
                params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in GetNewsSubcategories:", error);
        throw error;
    }
};
export const GetNewsById = async (newsId, ip) => {
    try {
        return await API.post(
            "/news-by-id",
            {
                news_id: newsId,
                ip: ip
            },
            {
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in GetNewsSubcategories:", error);
        throw error;
    }
};

// 3. News Sort By (you might need to pass sortBy type too)
export const NewsSortBy = async (portal_id, sortByType = "date", sub_category_id) => {
    try {
        return await API.post(
            "/news-sort-by-filter",
            {
                filter: sortByType,
                sub_category_id: sub_category_id
            },
            {
                params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in NewsSotBy:", error);
        throw error;
    }
};
export const SubmitComment = async (data) => {
    try {
        return await API.post(
            "/submit-comment",

            data,

            {
                // params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in NewsSotBy:", error);
        throw error;
    }
};
export const GetCommentsOnNews = async (newsId) => {
    try {
        return await API.post(
            "/get-comments",
            { news_id: newsId },
            {
                // params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in NewsSotBy:", error);
        throw error;
    }
};

export const SubmitCommentsReply = async (data) => {
    try {
        return await API.post(
            "/submit-comment-reply",
            data,
            {
                // params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in NewsSotBy:", error);
        throw error;
    }
};

export const GetCommentsreply = async (comment_id) => {
    try {
        return await API.post(
            "/get-comment-reply",
            { comment_id: comment_id },
            {
                // params: { portal_id },
                headers: {
                    "X-Custom-Token": "aaaaa",
                },
            }
        );
    } catch (error) {
        console.error("Error in NewsSotBy:", error);
        throw error;
    }
};
// comment
