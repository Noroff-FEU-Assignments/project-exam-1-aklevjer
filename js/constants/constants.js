// API
export const apiBaseUrl = "https://sinnsykt.net/shutter-journey/wp-json";
export const apiNamespace = "/wp/v2";

export const apiEndpointPosts = "/posts";
export const apiEndpointCategories = "/categories";
export const apiEndpointComments = "/comments";
export const apiEndpointCF7 = "/contact-form-7/v1/contact-forms/81/feedback";

export const apiParamsAll = "?per_page=100";
export const apiParamsLatest = "?per_page=12";
export const apiParamsFeatured = "?tags=7";
export const apiParamsPopular = "?tags=8";

export const apiUrlPosts = apiBaseUrl + apiNamespace + apiEndpointPosts;
export const apiUrlCategories = apiBaseUrl + apiNamespace + apiEndpointCategories;
export const apiUrlComments = apiBaseUrl + apiNamespace + apiEndpointComments;
export const apiUrlCF7 = apiBaseUrl + apiEndpointCF7;
