var SortingHatModule=function(){function d(){$(".sorting-hat__right-section").each(function(){var a=$(this).find(".sorting-hat-menu-option:visible \x3e .sorting-hat__itemtitle");a.css("min-height","0px");var c=0;a.each(function(){c=$(this).outerHeight()>c?$(this).outerHeight():c});a.css("min-height",c+"px")})}return{init:function(){$(window).on("resize load",function(){$(".sorting-hat").each(function(){var a=$(this).find(".sorting-hat__right-section .sorting-hat-menu-option").length;"mobile"!=UtilityModule.getViewport()||
$(this).find(".showmore-link").hasClass("hide-products")?$(this).find(".showmore-link").hasClass("hide-products")||(6<a&&"mobile"!=UtilityModule.getViewport()?$(this).find(".show-more__section").removeClass("hide-show-more"):6>=a&&"mobile"!=UtilityModule.getViewport()&&$(this).find(".show-more__section").addClass("hide-show-more")):4<a&&"mobile"==UtilityModule.getViewport()?$(this).find(".show-more__section").removeClass("hide-show-more"):4>=a&&"mobile"==UtilityModule.getViewport()&&$(this).find(".show-more__section").addClass("hide-show-more")});
d()});$(".sorting-hat .showmore-link").on("click",function(){$(this).closest(".sorting-hat").find(".sorting-hat__right-section").addClass("show-more-products").promise().done(function(){"mobile"==UtilityModule.getViewport()?$(".sorting-hat__right-container .sorting-hat__right-section .sorting-hat-menu-option:nth-child(5) .sorting-hat__itemtitle").focus():$(".sorting-hat__right-container .sorting-hat__right-section .sorting-hat-menu-option:nth-child(7) .sorting-hat__itemtitle").focus()});$(this).addClass("hide-products");
$(this).removeAttr("tabindex");$(this).removeAttr("role");$(this).removeAttr("aria-label");AnalyticsModule.linkClick($(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text().trim(),"Sorting Hat",$(this).text().trim());d()}).on("keyup",function(a){if(13===a.keyCode||32===a.keyCode)$(this).closest(".sorting-hat").find(".sorting-hat__right-section").addClass("show-more-products").promise().done(function(){"mobile"==UtilityModule.getViewport()?$(".sorting-hat__right-container .sorting-hat__right-section .sorting-hat-menu-option:nth-child(5) .sorting-hat__itemtitle").focus():
$(".sorting-hat__right-container .sorting-hat__right-section .sorting-hat-menu-option:nth-child(7) .sorting-hat__itemtitle").focus()}),$(this).addClass("hide-products"),$(this).removeAttr("tabindex"),$(this).removeAttr("role"),$(this).removeAttr("aria-label"),AnalyticsModule.linkClick($(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text().trim(),"Sorting Hat",$(this).text().trim()),d()});$(".sorting-hat .sorting-hat__itemtitle").on("click",function(){if(void 0!=
$(this).attr("aria-label")){var a=$(this).attr("aria-label");$(".sorting-hat__headline-left-backButton").attr("label",a)}AnalyticsModule.linkClick($(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text().trim(),"Sorting Hat",$(this).find(".sorting-hat__itemlink span").text().trim())}).on("keydown",function(a){if(13===a.keyCode||32===a.keyCode)void 0!=$(this).attr("aria-label")&&(a=$(this).attr("aria-label"),$(".sorting-hat__headline-left-backButton").attr("label",
a)),AnalyticsModule.linkClick($(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text().trim(),"Sorting Hat",$(this).find(".sorting-hat__itemlink span").text().trim())});$(".sorting-hat__headline-left-backButton").on("click keypress touchstart",function(){$(".sorting-hat .sorting-hat-menu-option:first-child").find(".font-meta-2").focus();var a=$(this).closest(".sorting-hat").find(".sorting-hat__headline-left").attr("data-default-text");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").attr("aria-hidden",
"false");var c=$(this).attr("label");switch($(this).attr("data-previous")){case "find-dentist-us-network":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").removeClass("d-none");
$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "find-dentist-us-submission":var b=$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");
$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").removeClass("d-none");$(this).closest(".sorting-hat").find(".find-dentist-us-input").val("");$(this).closest(".sorting-hat").find(".find-dentist-us-input").blur();$(this).closest(".sorting-hat").find(".find-dentist-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-dentist-us-network");break;case "find-agent-us-insurance":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-find-agent-us')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "find-agent-us-submission":b=$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").removeClass("d-none");
$(this).closest(".sorting-hat").find(".find-agent-us-input").val("");$(this).closest(".sorting-hat").find(".find-agent-us-input").blur();$(this).closest(".sorting-hat").find(".find-agent-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-agent-us-insurance");break;case "find-vision-us-plan":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");
$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-find-vision-us')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");
break;case "find-vision-us-submission":b=$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").removeClass("d-none");$(this).closest(".sorting-hat").find(".find-vision-us-input").val("");$(this).closest(".sorting-hat").find(".find-vision-us-input").blur();
$(this).closest(".sorting-hat").find(".find-vision-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-vision-us-plan");break;case "get-a-form-overlay":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".get-a-form-overlay").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-get-a-form')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "get-a-form-multi-overlay":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".get-a-form-multi-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "get-a-form-multi-overlay-tile-landing":1==$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num")?(--sortingHatMulticount,$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num",sortingHatMulticount),b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").attr("data-overlay-text"),
$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").removeClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","get-a-form-multi-overlay"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").addClass("d-none")):(--sortingHatMulticount,$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num",
sortingHatMulticount),a=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").attr("data-back-redirect-option"),b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").addClass("d-none"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").removeClass("d-none"));$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");break;case "get-a-form-multi-overlay-form-landing":a=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").attr("data-back-redirect-option");"undefined"!==typeof a?(b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").addClass("d-none"),
$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").removeClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","get-a-form-multi-overlay-tile-landing")):(b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").removeClass("d-none"),
$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").addClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","get-a-form-multi-overlay"));$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");break;default:$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b),
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate")}$(".sorting-hat__itemtitle.font-meta-2").each(function(){void 0!=$(this).attr("aria-label")&&$(this).attr("aria-label")==c&&($(this).addClass("sorting-hat_item__active"),$(this).focus())})}).on("keydown",function(a){if(13===a.keyCode||32===a.keyCode){a.preventDefault();a=$(this).closest(".sorting-hat").find(".sorting-hat__headline-left").attr("data-default-text");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").attr("aria-hidden",
"false");var c=$(this).attr("label");switch($(this).attr("data-previous")){case "find-dentist-us-network":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").removeClass("d-none");
$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "find-dentist-us-submission":var b=$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");
$(this).closest(".sorting-hat").find(".find-dentist-us-plan-overlay").removeClass("d-none");$(this).closest(".sorting-hat").find(".find-dentist-us-input-container").val("");$(this).closest(".sorting-hat").find(".find-dentist-us-input-container").blur();$(this).closest(".sorting-hat").find(".find-dentist-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-dentist-us-network");break;case "find-agent-us-insurance":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-find-agent-us')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "find-agent-us-submission":b=$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-agent-us-insurance-overlay").removeClass("d-none");
$(this).closest(".sorting-hat").find(".find-agent-us-input-container").val("");$(this).closest(".sorting-hat").find(".find-agent-us-input-container").blur();$(this).closest(".sorting-hat").find(".find-agent-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-agent-us-insurance");break;case "find-vision-us-plan":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-find-vision-us')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "find-vision-us-submission":b=$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").attr("data-overlay-text");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".find-vision-us-plan-overlay").removeClass("d-none");
$(this).closest(".sorting-hat").find(".find-dentist-us-vision-container").val("");$(this).closest(".sorting-hat").find(".find-dentist-us-vision-container").blur();$(this).closest(".sorting-hat").find(".find-vision-us-submission-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","find-vision-us-plan");break;case "get-a-form-overlay":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);
$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".get-a-form-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option:not('.sorting-hat-get-a-form')").removeClass("d-none");$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");
$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "get-a-form-multi-overlay":$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(a);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");$(this).closest(".sorting-hat").find(".get-a-form-multi-overlay").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__itemtitle").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").removeClass("d-none");
$(this).closest(".sorting-hat").find(".show-more__section").removeClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").addClass("d-none");$(this).closest(".sorting-hat").find(".sorting-hat-menu-option").addClass("col-sm-6");break;case "get-a-form-multi-overlay-tile-landing":1==$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num")?(--sortingHatMulticount,$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num",
sortingHatMulticount),b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").removeClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","get-a-form-multi-overlay"),
$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").addClass("d-none")):(--sortingHatMulticount,$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("tile-landing-num",sortingHatMulticount),a=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").attr("data-back-redirect-option"),b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing:visible").addClass("d-none"),
$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").removeClass("d-none"));$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");break;case "get-a-form-multi-overlay-form-landing":a=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").attr("data-back-redirect-option");"undefined"!==
typeof a?(b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").addClass("d-none"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-landing[data-redirect-option\x3d'"+a+"']").removeClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous","get-a-form-multi-overlay-tile-landing")):
(b=$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").attr("data-overlay-text"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").closest(".sorting-hat-get-a-form-multi").find(".get-a-form-multi-overlay").removeClass("d-none"),$(this).closest(".sorting-hat").find(".get-a-form-multi-tile-form-landing:visible").addClass("d-none"),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left-backButton").attr("data-previous",
"get-a-form-multi-overlay"));$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b);$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate");break;default:$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").text(b),$(this).closest(".sorting-hat").find(".sorting-hat__headline-left .headline-text").toggleClass("animate")}$(".sorting-hat__itemtitle.font-meta-2").each(function(){void 0!=
$(this).attr("aria-label")&&$(this).attr("aria-label")==c&&($(this).addClass("sorting-hat_item__active"),$(this).focus())})}});$(".sorting-hat-menu-option").on("keyup",function(a){if(13===a.keyCode||32===a.keyCode)a=$(".sorting-hat__headline-left-backButton"),a.length&&a.focus()});$(".showmore-link").on("keydown",function(a){13==a.which||32==a.which?$(this).attr("aria-hidden","true"):$(this).removeAttr("aria-hidden")})}}}();SortingHatModule.init();