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

// get api// Base configuration
const API_CONFIG = {
  headers: {
    'X-Custom-Token': 'aaaaa'
  }
};

// Helper functions
const getRequest = (endpoint, params = {}) => {
  return API.get(endpoint, {
    params,
    ...API_CONFIG
  });
};

const postRequest = (endpoint, data = {}, params = {}) => {
  return API.post(endpoint, data, {
    params,
    ...API_CONFIG
  });
};


// featured section 
export const GetFeaturedSection = (portal_id) =>
  postRequest('/featured-section', { portal_id });

export const GetFeaturedNews = (portal_id) =>
  postRequest('/featured-news', { portal_id });

// Auth API
export const GetUserAuthentication = (data) => postRequest('/auth-user', data);

// Utils APIs
export const GetOwnerSocialLinks = (portal_id) =>
  getRequest('/social-media', { portal_id });

export const GetWebTheme = (portal_id) =>
  getRequest('/web-theme', { portal_id });

// Navigation Menu
export const menuWithSubNavMenuList = (portal_id) =>
  postRequest('/menu-with-sub-nav-list', { portal_id });

// News Management
export const getBreakingNews = (portal_id) =>
  postRequest('/breaking-news', { portal_id });

export const loadNewsByCategory = (category) =>
  postRequest('/news-by-category', { category });

export const loadNewsBySubCategory = (sub_category) =>
  postRequest('/news-by-subcategory', { sub_category });

export const newsRoadMapBottom = (portal_id) =>
  API.get('/news-road-map', {
    params: { portal_id },
    ...API_CONFIG
  });

export const GetShortsNews = (portal_id) =>
  postRequest('/short-news', {}, { portal_id });

export const GetShortsNewsDetails = (portal_id) =>
  postRequest('/short-news-details', { short_id: portal_id });

export const SubmitShortsClap = (short_id, user_id) =>
  postRequest('/submit-clap', { shorts_id: short_id, user_id });

export const CheckShortsClapped = (short_id, user_id) =>
  postRequest('/check-clap-status', { shorts_id: short_id, user_id });
// check-clap-status


// News Categories
export const GetNewsCategories = (portal_id) =>
  postRequest('/category-list', {}, { portal_id });

export const GetNewsSubcategories = (portal_id, category_id) =>
  postRequest('/sub-category-by-list', { category_id }, { portal_id });

export const GetNewsById = (newsId, ip) =>
  postRequest('/news-by-id', { news_id: newsId, ip });

export const LocationList = () =>
  postRequest('/location-list');

export const NewsSortBy = (portal_id, filter) =>
  postRequest('/news-by-filter',
    filter,
    { portal_id }
  );
// export const NewsSortBy = (portal_id, filter) => 
// postRequest('/news-sort-by-filter', 
//  filter, 
//   { portal_id }
// );

// Comments
export const SubmitComment = (data) => postRequest('/submit-comment', data);
export const GetCommentsOnNews = (newsId) =>
  postRequest('/get-comments', { news_id: newsId });

export const SubmitCommentsReply = (data) =>
  postRequest('/submit-comment-reply', data);

export const GetCommentsreply = (comment_id) =>
  postRequest('/get-comment-reply', { comment_id });

// Ads
export const GetTopBannerAds = (portal_id) =>
  getRequest('/top-banner-ads', { portal_id });

export const GetMarketPlaceAds = (portal_id) =>
  getRequest('/marketplace-ads', { portal_id });

export const GetLeftBannerAds = (portal_id) =>
  getRequest('/left-home-banner-ads', { portal_id });

export const GetLeftHomeMainAds = (portal_id) =>
  getRequest('/left-home-main-ads', { portal_id });

export const GetSearchPageTopAds = (portal_id) =>
  getRequest('/search-page-ads', { portal_id });

export const GetReadNewsPageTopAds = (portal_id) =>
  getRequest('/news-read-main-page-ads', { portal_id });

export const GetReadNewsPageBottomAds = (portal_id) =>
  getRequest('/news-read-bottom-ads', { portal_id });

export const GetBottomBannerAds = (portal_id) =>
  getRequest('/bottom-banner-ads', { portal_id });

export const GetRightTopAds = (portal_id) =>
  getRequest('/custom-right-home-main-ads', { portal_id });

export const GetRightMainAds = (portal_id) =>
  getRequest('/custom-right-home-main-2-ads', { portal_id });

export const GetRightBottomAds = (portal_id) =>
  getRequest('/custom-right-home-bottom-ads', { portal_id });

// Election API
export const GetElectionYear = (election_poll_id) =>
  postRequest('/election-years', { election_poll_id });

export const GetElectionPolls = () => getRequest('/election-poll');
//Roadmap
export const GetTrending = () => getRequest('/road-map');

// Horoscope
export const GetHoroscope = (sign) =>
  postRequest('/get-daily-horoscope', { zodiac: sign });

// Live Cricket
export const GetLiveCrickeScore = (params) =>
  postRequest('/app/live-cricket', { params });

// Stock Market
export const GetLiveStockMarcket = (params) =>
  getRequest('/live-stock-marcket', params);

// Live YouTube
export const GetLiveYouTube = () => postRequest('/live-link', {});

// Polls
export const getPollsIds = () => postRequest('/poll-category', {});

export const getPollByCategoryId = (categoryId) =>
  postRequest('/poll-questions', { pollcategory_id: categoryId });

export const submitVote = (data) =>
  postRequest('/submit-quiz', {
    user_id: data.user_id,
    question_id: data.question_id,
    option_id: data.option_id
  });

// Pages
export const GetAboutUsData = (portal_id) =>
  getRequest('/page/about-us', { portal_id });

export const GetPrivacyPolicyData = (portal_id) =>
  getRequest('/page/privacy-and-policy', { portal_id });

export const GetTermsAndConditionData = (portal_id) =>
  getRequest('/page/terms-and-conditions', { portal_id });

export const GetContactData = (portal_id) =>
  getRequest('/contact-us', { portal_id });

export const GetOurRepoterData = (portal_id) =>
  getRequest('/contact-us', { portal_id });

export const AdvertiseWithUsApi = (data) =>
  postRequest('/raise-query', data);

// settings

export const getSettings = (portal_id) =>
  getRequest('/active-services', { portal_id });
