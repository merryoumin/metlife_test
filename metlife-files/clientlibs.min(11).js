var VideoPromoModule=function(){function d(a){var b=a.find(".video-js").attr("id");if(!a.find(".video-js").hasClass("video-playing")){$(".video-js, .video_container").removeClass("video-playing");var c=videojs(b);c.ready(function(){c.play();a.find(".video-js").addClass("video-playing");a.find(".video_container").addClass("video-playing")})}}var b=$(".video-promo");return{init:function(){b.find(".video-js").removeAttr("aria-label");b.find(".play-button, .videoWrapper--brightcove .video-js").on("click",
function(a){b.find(".video-js").removeAttr("aria-label");a.preventDefault();a=$(this).closest(".video-promo.component");d(a);$(this).closest(".video-promo.component").focus()}).on("keydown",function(a){if(13===a.keyCode||32===a.keyCode)a.preventDefault(),$(this)[0].click()});b.find(".video-promo__content--cta a, .video-promo__content--copy a").on("click",function(){var a=$(this).closest(".video-promo").find(".video-promo__content--title").text().trim();var b=$(this).parent().hasClass(".video-promo__content--cta")?
$(this).find("span").text().trim():$(this).text().trim();AnalyticsModule.linkClick(a,"Video Promo",b)}).on("keydown",function(a){if(13===a.keyCode||32===a.keyCode)a.preventDefault(),$(this)[0].click()})}}}();VideoPromoModule.init();