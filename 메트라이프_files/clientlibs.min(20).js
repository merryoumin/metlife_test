var DisclaimerModule=function(){var b=$(".disclaimer");return{init:function(){b.find("a").on("click",function(){var a=$(this).text().trim();AnalyticsModule.linkClick("","Disclaimer",a)}).on("keydown",function(a){if(13===a.keyCode||32===a.keyCode)a.preventDefault(),$(this)[0].click()})}}}();DisclaimerModule.init();