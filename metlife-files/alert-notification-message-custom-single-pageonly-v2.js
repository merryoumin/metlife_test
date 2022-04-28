$( document ).ready(function() {
    console.log( "ready!" );
	
	
	var alertMessage ='<section><script type="text/javascript" src="/etc.clientlibs/MetlifeMarketCore/components/content/global/alert-message/clientlibs.min.js" defer=""></script>';
	
	alertMessage +='<link rel="stylesheet" href="/etc.clientlibs/MetlifeMarketCore/components/content/global/alert-message/clientlibs.min.css" type="text/css">';
	
	alertMessage +='<div class="alert-message" aria-label="간편한 무료상담 신청으로,  전문적인 보험 컨설팅을 받아 보세요!"><div class="container"><div class="row"><div class="col-12 alert-message__container" aria-hidden="false"><div class="alert-message--description"><span class="inline-block alert-message-header font-subhead-desc-4 font-cta-3-sm font-content-link-1-md">간편한 무료상담 신청으로,  전문적인 보험 컨설팅을 받아 보세요!</span><span class="inline-block alert-message-supportcopy font-body-1 font-body-3-sm"><p><a href="https://www.metlife.co.kr/customer-service/contact-us/request-consultation/" aria-hidden="false" tabindex="0">신청하기</a></p></span></div><div class="alert-close-icon js-alertMessageAccept"><a href="#" tabindex="0" role="button" aria-label="Close " aria-hidden="false"><svg class="icon" aria-hidden="true" tabindex="-1" focusable="false"><use xlink:href="/static/images/icons-metlife.svg#icon-close" aria-hidden="true" tabindex="-1" focusable="false"></use></svg></a></div></div></div></div></div></section>';
	
	$(".header__search-overlay-section").before(alertMessage);
	
	})