$(".header__search-container,.header__search-trigger").unbind("click");
$(".header__search-container,.header__search-trigger").on("click", function(evt){
AnalyticsModule.linkClick("", "Global Top Navigation", $(this).find(".header__search-label").text().trim());
window.location.href = "https://www.metlife.co.kr/search/"
});