;(function ($, win, doc, undefined) {
	
//	'use strict';

	var 
		ua = navigator.userAgent,
		div = doc.createElement('div'),
		inp = doc.createElement("input"),
		ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i), 
		prefix = ['Webkit', 'Moz', 'O'],
		transition = 'transition',
		transform = 'transform',
		requestanimationframe = 'requestanimationframe',
		cancelanimationframe = 'cancelanimationframe',
		transfroms = {
			translate3d : 'taranslate3d(0px, 0px, 0px)',
			translate : 'tranaslate(0px, 0px)',
			scale3d : 'scale3d(1,1,1)',
			scale : 'scale(1,1)'
		},
		browser = $.borwser,
		support = $.support,
		version, i;

	if (!browser) {
		$.browser = browser = {};
	}
 
	browser.local = !(/^http:\/\//).test(location.href);
	browser.firefox = (/firefox/i).test(ua);
	browser.webkit = (/applewebkit/i).test(ua);
	browser.chrome = (/chrome/i).test(ua);
	browser.opera = (/opera/i).test(ua);
	browser.ios = (/ip(ad|hone|od)/i).test(ua);
	browser.android = (/android/i).test(ua);
	browser.safari = browser.webkit && !browser.chrome;

	// touch, mobile 환경 구분
	support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
	browser.mobile = support.touch && ( browser.ios || browser.android);
	
	// false 삭제
	for (i in browser) {
		if (!browser[i]) {
			delete browser[i]
		}
	}	
	// os 구분
	browser.os = (navigator.appVersion).match(/(mac|win|linux)/i),
	browser.os = (browser.os) ? browser.os[1].toLowerCase() : '';
	
	// version 체크
	if (browser.ios || browser.android) {
		version = ua.match(/applewebkit\/([0-9.]+)/i);
		if (version && version.length > 1) {
			browser.webkitversion = version[1];
		}
		if (browser.ios) {
			version = ua.match(/version\/([0-9.]+)/i);
			if (version && version.length > 1) {
				browser.ios = version[1];
			}
		} else if (browser.android) {
			version = ua.match(/android ([0-9.]+)/i);
			if (version && version.length > 1) {
				browser.android = parseInt(version[1].replace(/\./g, ''));
			}
		}
	}
	
	// ie 기본 프로퍼티 추가 및 버전 체크
	support.svgimage = true;
	support.pointerevents = true;
	if (ie) {
		browser.ie = ie = parseInt( ie[1] || ie[2] );
		if ( 9 > ie ) {
			browser.oldie = true;
		} else if ( 9 == ie ) {
			prefix.push('ms');
		}
		if ( 11 > ie ) {
			support.pointerevents = false;  
		}
		if ( 9 > ie ) {
			support.svgimage = false; 
		}
	}

	support.pushstate = !!history.pushState; // ie9 false
	support.mediaquery = typeof(win.matchMedia) == 'function' || !browser.oldie; // ie8 false
	support.placeholder = ("placeholder" in inp);
	support.video = doc.createElement('video').canPlayType !== undefined; // ie8 false
	support.backgroundsize = 'backgroundSize' in div.style; // ie8 false
	if ( support.backgroundsize ) {
		div.style.backgroundSize = 'cover';
		support.backgroundsize = div.style.backgroundSize == 'cover';
	}
	try {
		if (browser.ie > 8 || !browser.ie) {
			div.style.background = "rgba(0, 0, 0, 0)";
		} 
		support.rgba = div.style.background == 'rgba(0, 0, 0, 0)';
	} catch(e) {
		support.rgba = false;
	}
	support.canvas = doc.createElement('canvas');
	support.canvas = support.canvas.getContext && support.canvas.getContext('2d');
	
	// ie8 false
	if (div.style[transform] != undefined) {
		support.transform = transform;
	} else {
		transform = 'Transform';
		for (i = 0; i < 4; i++) {
			if (div.style[prefix[i] + transform] !== undefined) {
				support.transform = prefix[i] + transform;
				break;
			}
		}
	}
	if (win[requestanimationframe]) {
		support.requestanimationframe = true;
	} else {
		requestanimationframe = 'RequestAnimationFrame';
		for ( i = 0; i < 4; i++ ) {
			if ( win[prefix[i]+requestanimationframe] !== undefined ) {
				win.requestAnimationFrame = w[prefix[i]+requestanimationframe];
				win.cancelAnimationFrame = w[prefix[i]+cancelanimationframe];
				support.requestanimationframe = true;
				break;
			}
		}
	}
	/* 
	if ( !support.requestanimationframe ) {
		win.requestAnimationFrame = (function () {
			var lasttime = 0;
			return function (callback) {
				var currenttime = gettime();
				var timetocall = Math.max(0, 16-(currenttime-lasttime));
				lasttime = currenttime+timetocall;
				return setTimeout(function () { callback(currenttime+timetocall); }, timetocall);
			}
		})();
		win.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		}
	}
	*/
	$('html')
		.addClass(browser.os)
		.addClass(browser.chrome? "chrome" : browser.firefox ? "firefox" : browser.opera ? "opera" : browser.safari ? "safari" : browser.ie ? "ie ie" + browser.ie : "")
		.addClass(browser.ie && 8 > browser.ie ? "ie8" : "")
		.addClass(browser.ios ? "ios" : browser.android ? "android" : "")
		.addClass(support.transition ? 'transition' : 'notransition')
		.addClass(support.transform ? 'transform' : 'notransform')
		.addClass(support.backgroundsize ? 'backgroundsize' : 'nobackgroundsize')
		.addClass(support.rgba ? 'rgba' : 'norgba')
		.addClass(support.svgimage ? 'svg' : 'nosvg')
		.addClass(support.pointerevents ? 'pointerevents' : 'nopointerevents')
		.addClass(support.opacity ? 'opacity' : 'noopacity');
	
	
	/*
	* easings.
	* Convert to JS from "Robert Penner's Easing Functions" http://www.robertpenner.com/easing/
	*/
	var easings = {
			linear : function(t,b,c,d){return c*t/d+b;},
			easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
			easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
			easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
			easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
			easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
			easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
			easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
			easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
			easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
			easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
			easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
			easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
			easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
			easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
			easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
			easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
			easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
			easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
			easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
			easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
			easeInExpo : function(t,b,c,d){return (t==0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
			easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
			easeInOutExpo : function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
			easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
			easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
			easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
			easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
			easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
			easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
			easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
			easeInOutElastic : function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
			easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
			easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
			easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
			easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
			easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
			easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
			easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
			easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
			easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
		},
		easing,
/*
* css transition cubic-bezier
* from "Ceaser - CSS Easing Animation Tool - Matthew Lein" http://matthewlein.com/ceaser/
*/
		cubicbeziers = {
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			'ease-in': '0.420, 0.000, 1.000, 1.000',
			'ease-out': '0.000, 0.000, 0.580, 1.000',
			'ease-in-out': '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		};

	for ( easing in easings ) {
		jQuery.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			}
		})(easing);
	}
	
	// 쿠키값 설정, 가져오기
	$._cookie = {
		set: function(name, value, term, path, domain) {
			var cookieset = name + '=' + value + ';',
				expdate;
			if ( term ) {
				expdate = new Date();
				expdate.setTime( expdate.getTime() + term * 1000 * 60 * 60 * 24 ); // term 1 is a day
				cookieset += 'expires=' + expdate.toGMTString() + ';';
			}
			if ( path ) {
				cookieset += 'path=' + path + ';';
			}
			if ( domain ) {
				cookieset += 'domain=' + domain + ';';
			}
			document.cookie = cookieset;
		},
		get: function(name) {
			var match = ( document.cookie || ' ' ).match( new RegExp(name+' *= *([^;]+)') );
			return ( match ) ? match[1] : null;
		}
	};

	
	
	// 포커스 이동 특정 영역에서 홀딩
	$._uiHold = {
		hold : function (value) {
			var $hold = $(value),
				$hold_focus = $hold.find('h1, a, input, button, label, select');
			
			$hold.find('h1').attr('tabindex',0);
			$hold_focus.eq(0).addClass('fst');
			$hold_focus.eq(-1).addClass('end');

			$hold.off('keydown.modal').on('keydown.modal', function (e) {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$hold.find('.end').focus();
				}
			});
			$hold.find('.fst').off('keydown.dialog').on('keydown.dialog', function (e) {
				$hold.off('keydown.modal');
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$hold.find('.end').focus();
				}
			});
			$hold.find('.end').off('keydown.dialog').on('keydown.dialog', function (e) {
				$hold.off('keydown.modal');
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$hold.find('.fst').focus();
				}
			});
		}
	}
	
	
	$._opacityValue = {
		decrease : function (scroll, range, start) {
			var value = ((range - (scroll - start)) / range).toFixed(1);
			
			return (value < 0) ? 0 : value;
		},
		increase : function (scroll, range, start) {
			var value = ((scroll - start) / range).toFixed(1);

			return (value > 1) ? 1 : value;
		}
	}

	
	//바닥 클릭 시 callback
	$._backDrop = {
		close : function (target, callback) {
			var base = target,
				$body = $('body'),
				backdrop = false,
				eventHandle = ['mouseover.backdrop', 'mouseleave.backdrop' ];

			// 바닥 클릭 시 닫히기
			$(base)
				.off(eventHandle[0]).on(eventHandle[0], function (){
					backdrop = true;
					docEvent();
				})
				.off(eventHandle[1]).on(eventHandle[1], function (){
					backdrop = false;
					docEvent();
					if (!$body.data('old-backdrop-target')) {
						$body.data('old-backdrop-target', base);
						$body.data('old-backdrop-callback', callback);
					}
					
				})
				.off('click.old').on('click.old', function(){
					(!!$body.data('old-backdrop-target') && $body.data('old-backdrop-target') !== base) ? docEventOld() : '';
				});
			
			function docEvent() {
				(backdrop === true) ? $(doc).off('click.sel_doc') : $(doc).off('click.sel_doc').one('click.sel_doc', docClick);
			}
			function docEventOld() {
				var old_callback = $body.data('old-backdrop-callback');
				
				old_callback();
				$body.removeData('old-backdrop-target');
				$body.removeData('old-backdrop-callback');
			}
			function docClick() {
				(!!$body.data('old-backdrop-target') && $body.data('old-backdrop-target') !== base) ? docEventOld() : '';

				backdrop = true;
				callback();
			}	
		}
	}

	
	/* Ajax 
	var xmlHttp = false;
	try {
		xmlHttp = new XMLHttpRequest();
	}
	catch (trymicrosoft) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (othermicrosoft) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (failed) {
				xmlHttp = false;
			}
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
	  xmlHttp = new XMLHttpRequest();
	}
	*/

	/*!
	 * @module a variety of module
	 * @author jo
	 * @email jo@netive.co.kr
	 * @create 2016-07-17
	 * @license MIT License
	 */
	$._uiLoading = {
		show : function(target){
			var $body = $('body');
			
			if (!$body.data('loadingfull')) {
				var loading = 
					'<div class="ui_loading loading_netive">' +
					'<div class="loading_bg"></div>' +
					'<div class="loading_img"><span>잠시만 기다려주세요.</span></div>' +
					'</div>';
				
				if (!target) {
					$body.prepend(loading); 
					$body.data('loadingfull', true);
				} 
				else {
					$(target).prepend(loading);
					$body.data('loadingfull', false);
				}

				
				$('.ui_loading').fadeIn(500, function(){
					$('.loading_bg').stop().animate({
						opacity : 0.8
					}, 400);
					imgShow();
				});

			}
			
			function imgShow(){
				$('.ui_loading').find('.loading_img').stop().animate({
					opacity : 1
				}, function(){
					imgHide();
				});
			}
			function imgHide(){
				$('.ui_loading').find('.loading_img').stop().animate({
					opacity : 0
				}, function(){
					imgShow();
				});
			}
		},
		hide : function(target) {
			if (!target) {
				// 전체
				$('body > .ui_loading').fadeOut(300, function(){
					$(this).remove();
				});
			}
			else {
				$(target).find('.ui_loading').fadeOut(300, function(){
					$(this).remove();
				});
			}
			$('body').data('loadingfull', false);
		}
	}
	
	// 스크롤 위치 이동
	$._uiScroll = {	
		move : function(value, speed, callback) {
			!value ? value = 0 : '';
			isNaN(speed) ? speed = 600 : '';
			var $target = $('html');
			
			(browser.chrome) ? $target = $('body') : '';

			$target.animate({
				scrollTop : value
			},speed , function(){
				!!callback ? callback() : '';
			});
		}
	};
	
	$.fn.extend({
		uiAjaxPage : function (opt) {
			var defaults = {
					url : '',
					callname : null
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function (){	
				var $this = $(this),
					url = opt.url,
					callname = opt.callname,
					timer;
				
				$.ajax({
					type 		: 'GET',
					url 		: url,
					cache		: false,
					//async		: false,
					headers		: { "cache-control": "no-cache", "pragma": "no-cache" },
					beforeSend 	: function(){
										// 로딩 정리 필요
										timer = setTimeout(function(){
											$._uiLoading.show();
										},300);
									},
					error 		: function() {
										$this.text('error');
									},
					success 	: function (result) {
										clearTimeout(timer);
										// page 전환 시 상단 이동
										$._uiScroll.move(0, 300, function(){
											$._uiLoading.hide();
											$this.html(result);
											(!!callname) ? N.ui_ajaxPage_call(callname) : '';	
										});
									}
				});
				
				/*
				xmlHttp.open("GET", url, true);
				xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState == 4) {
						if (xmlHttp.status == 200) {
							var result = xmlHttp.responseText;
							$this.html(result);
							N.ui_ajaxPage_call(callname);
						}
					}
					if (xmlHttp.readyState == 2) {
						alert(1);
					}
					
				};
				xmlHttp.send(null);
				*/
			});	
		},
//		uiSliderRange : function() {
//			var defaults = {
//				},
//				opt = $.extend(defaults, opt);
//				
//				return this.each(function () {
//					var $base = $(this),
//						range_id = $base.attr('data-rangeid'),
//						$range = $('#' + range_id);
//					
//					var app = {
//							evt : function () {
//								
//								$range.slider({
//									range: "min",								
//									min:0,
//									values:[217],
//									slide: function( event, ui ) {
//										$base.find("#amount").val( ui.values[0] );										
//									}
//								});
//
//								$base.find("#amount").change(function() {
//									$range.slider('values',0,$(this).val());
//								});
//							}
//					}
//					app.evt();
//					
//				});
//						
//					
//			
//		},

		uiGuideline : function (opt){
			var defaults = {
				},
				opt = $.extend(defaults, opt);
			return this.each(function (){
				var $base = $(this),
					$line = $base.parent(),
					ps_x, ps_y;
				
				function pos(e) {
					if (e.touches !== undefined) {
						return {
							x : e.touches[0].pageX,
							y : e.touches[0].pageY
						};
					}
					if (e.touches === undefined) {
						if (e.pageX !== undefined) {
							return {
								x : e.pageX,
								y : e.pageY
							};
						}
						if (e.pageX === undefined) {
							return {
								x : e.clientX,
								y : e.clientY
							};
						}
					}
				}

				$base.on('touchstart.guide mousedown.guide', function (e){
					if ($(this).data('align') === 'hz') {
						ps_y = pos(e).y;
						
						$(doc).on('touchmove.guide mousemove.guide', function (e){
							$line.css('top', pos(e).y);
						});
						$(doc).on('touchend.guide touchcancel.guide mouseup.guide', function (e){
							$(doc).off('touchmove.guide mousemove.guide');
						});
					} 
					if ($(this).data('align') === 'vt') {
						ps_x = pos(e).x;
						
						$(doc).on('touchmove.guide mousemove.guide', function (e){
							$line.css('left', pos(e).x);
						});
						$(doc).on('touchend.guide touchcancel.guide mouseup.guide', function (e){
							$(doc).off('touchmove.guide mousemove.guide');
						});
					}
				});		
			});
		},	
		
		uiTab : function (opt){
			var defaults = {
					current : 1,
					eff : 'fade' // show, fade 
				},
				opt = $.extend(defaults, opt);
			return this.each(function (){
				var base = this,
					$base = $(base),
					$btn = $base.find('.ui_btn'),
					$pnl = $base.find('.ui_pnl'),
					eff = opt.eff,
					current = opt.current - 1,
					tab_sum, tab_id, open_id, $current;
				
				var app = {
					init : function() {
						var btn_id, btn_href;
						
						tab_sum = $btn.length; 
						$btn.parent().attr('role','tablist');
						$btn.attr('role','tab').attr('aria-selected', false);
						$pnl.attr('role','tabpanel');
						
						for (var i = 0; i < tab_sum; i++) {
							btn_id = $btn.eq(i).attr('id');
							btn_href = $btn.eq(i).attr('href');
							btn_href = btn_href.split('#');
							$btn.eq(i).attr('aria-controls', btn_href[1]);
							$('#' + btn_href[1]).attr('aria-labelledby', btn_id);
						}
						
						if (current > -1) {
							$current = $btn.eq(current);
							tab_id = $current.attr('href');
							open_id = tab_id;
							app.act(tab_id, 'selected');
						}

						app.evt();
					},
					act : function(tab_id, state) {
						$btn.removeClass('selected').attr('aria-selected', false);
						$current.addClass('selected').attr('aria-selected', true);

						if (eff === 'fade' && open_id !== tab_id) {
							$pnl.css('opacity', 0);
							$pnl.stop().animate({
								opacity : 0
							});
							$(tab_id).stop().animate({
								opacity : 1
							})
						}
						open_id = tab_id;
						
						$pnl.attr('aria-hidden', true);
						$(tab_id).attr('aria-hidden', false);
						(state !== 'selected') ? $(tab_id).attr('tabindex',0).focus() : '';
					},
					evt : function() {
						$btn.on('click', function(e) {
							e.preventDefault();
							$current = $(this);
							tab_id = $current.attr('href');
							
							app.act(tab_id);
						});	
					}
				}
				app.init();
			});
		},
		
		rangeTab : function() {
			var base = this,
			$base = $(base),
			$tab = $base.find('.rTabBox'),			
			$btn =  $tab.find('a'),			
			$tabCont = $(base).find('.rTabCont');
			
			$tabCont.eq(0).css('display','block');	
			$btn.eq(0).addClass('on');
			
			$btn.on('click', function(e) {
				e.preventDefault();
				
				$btn.removeClass('on').attr('aria-selected', false);
				$(this).addClass('on').attr('aria-selected', true);
				
				var tabOnId = $(this).attr('href');
				
				$tabCont.css('display','none');			
				$(tabOnId).css('display','block');
			});
			
		
		},
		selectTab : function() {			
			var base = this,
				$base = $(base),			
				$selTabConts = $(base).find('div.selBox'),
				selBtnId = $('.selTab').attr('id'),
				seletValue = $('#'+selBtnId), 
				selVal;
				
			var app = {
				init : function() {					
					$selTabConts.css('display','none');	
					$selTabConts.eq(0).show();								
					app.evt();		
				},
				evt : function() {	
					$(seletValue).change(function(){ 	
						selVal = $(seletValue).val();
					
						$selTabConts.hide();
						$('#'+selVal).show(); 
					});
				}
				
			}
			app.init();
			
		},
		
		/*
		 * ---------------------------------------------------------------------------
		 * 이름 : uiAccordion
		 * 설명 : 수직 아코디언 탭
		 * 옵션 :	
		 * 		current 	: 0				0 이면 전체 닫힘. 1~ 순번이 열림
		 * 		toggle 		:  		 
		 * 		focusTarget : 		
		 * 		scrollTop 	: 		
		 */
		uiAccordion : function (opt, callback){
			var defaults = {
					current : 0, // 0,1 ..... 'all'
					toggle : true,
					focusTarget : null,
					scrollTop : true,
					addTop : 60
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function (){
				var base = this,
					
					$base = $(base),
					$wrap = $base.find('.ui_wrap'),
					$all = $base.find('.ui_all'),
					$btnWrap = $base.find('.ui_btn_wrap'),
					$btn = $btnWrap.find('.ui_btn'),
					$txt = $btn.find('span'),
					$pnl = $base.find('.ui_pnl'),
					
					toggle = opt.toggle,
					focusTarget = opt.focusTarget,
					scrollTop = opt.scrollTop,
					addTop = opt.addTop,
					current = opt.current,
					
					acco_sum, tab_id, $current, $currentBtn;
					
				var app = {
					init : function() {
						acco_sum = $wrap.length; 
												
						// 열린 상태 선택
						if (current - 1 > -1) {
							$current = $wrap.eq(current - 1);
							$currentBtn = $current.find('.ui_btn');
						
							tab_id = $currentBtn.attr('href');
							app.show(tab_id, 'opened')
						
						} 
						else if (current === 'all') {
							app.showAll();
						}
	
						app.evt();
					},
					showAll: function(){
						$all.addClass('selected').find('span').text('전체닫기');
						$btn.data('expand',true);
						$wrap.addClass('selected');
						$txt.text('닫기');
						$pnl.stop().slideDown(200);
						$base.data('allopen', true);
					},
					hideAll : function(){
						$all.removeClass('selected').find('span').text('전체열기');
						$btn.data('expand',false);
						$wrap.removeClass('selected');
						$txt.text('열기');
						$pnl.stop().slideUp(200);
						$base.data('allopen', false);
					},
					show : function(tab_id, state) {
						// 이벤트로 열린 상태
						if (state !== 'opened') {
							if (toggle === true) {
								$pnl.stop().slideUp(200);
								$txt.text('열기');
								$btn.data('expand',false).closest('.ui_wrap').removeClass('selected');
							}

							$(tab_id).stop().slideDown(200, function(){
								// 현재선택영역 기준으로 스크롤 이동
								setTimeout(function(){
									var th_t = $(tab_id).offset().top - ($(tab_id).closest('.ui_wrap').find('.ui_btn_wrap').outerHeight()) - addTop;

									(!!scrollTop) ? $._uiScroll.move(th_t, 200) : '';
									!!callback ? callback() : '';
								},0);
							});
							
							// 기본 아니면 지정한 곳으로 포커스 이동
							if (!focusTarget) {
								$(tab_id).attr('tabindex',0).focus();
							} else {
								$base.closest('.selected').find(focusTarget).attr('tabindex',0).focus();
							}		
						} 
						// 처음 열린 상태
						else {
							$(tab_id).show();
							$currentBtn.data('expand', true);
						}

						$current.find('span').text('닫기');
						$current.data('expand',true).closest('.ui_wrap').addClass('selected');
					},
					hide : function(){
						$current.find('span').text('열기');
						$current.data('expand',false).closest('.ui_wrap').removeClass('selected'); 
						$(tab_id).stop().slideUp(200);
			
					},
					evt : function() {
						$btn.off('click.acco').on('click.acco', function(e) {
							e.preventDefault();
							
							$current = $(this);
							tab_id = $current.attr('href');
							
							(!$current.data('expand')) ? app.show(tab_id) : app.hide(tab_id); 
						});
						
						$all.off('click.acco').on('click.acco', function(e) {
							e.preventDefault();
							
							(!$base.data('allopen')) ? app.showAll() : app.hideAll();
						});
					}
				}
				
				app.init();
			});
		},
		
		uiPlaceholder : function (opt) {
			var defaults = {},
				opt = $.extend(defaults, opt);
			
			return this.each(function (){
				var base = this,
					$base = $(base),
					inp_w = $base.width(),
					txt = $base.attr('placeholder'),
					$ph, $ph_wrap;
				
				var app = {
					init : function (){
						if (!$base.data('overlap')) {
							var ph = '<span class="ph_item">' + txt + '</span>';
							
							$base.data('overlap', true).wrap('<span class="ph_wrap"></span>');
							$ph_wrap = $base.closest('.ph_wrap');
							$ph_wrap.prepend(ph);
							$ph = $ph_wrap.find('.ph_item');
							
							($base.val() === "") ? app.show(base) : app.hide(base);
							
							app.evt();
						}
					},
					show : function (target) {
						$(target).closest('.ph_wrap').find('.ph_item').css({
							'z-index' : 0,
							width : inp_w,
							opacity : 1
						}).removeAttr('aria-hidden');
					},
					hide : function (target) {
						$(target).closest('.ph_wrap').find('.ph_item').css({
							'z-index' : -1,
							opacity : 0
						}).attr('aria-hidden', true);
					},
					evt : function () {
						$ph.on('click.ph', function (){
							$ph_wrap.find('input').focus();
						});
						
						$base.on('keyup.ph', function (){
							($base.val() === "") ? app.show(this) : app.hide(this);
						});
					}
				}
				if (!support.placeholder) {
					app.init();
				}
				
			});	
		},
		
		uiRadioCheck : function (opt) {
			var defaults = {},
				opt = $.extend(defaults, opt);
		
			return this.each(function (){
				var base = this,
					$base = $(base),
					inp_type = $base.attr('type'),
					inp_id = $base.attr('id'),
					inp_name = $base.attr('name'),
					$label = $('label[for="' + inp_id + '"]');
				
				var app = {
					init : function () {
						if (inp_type === 'radio') {
							$label.addClass('uiRadio');
						}
						else if (inp_type === 'checkbox') {
							$label.addClass('uiCheckbox');
						}
						
						if ($base.prop('checked') === true) {
							$label.addClass('checked');
						}
						if ($base.prop('disabled') === true) {
							$label.addClass('disabled');
						}
						$base.addClass('ui_form');
						$label.attr('ui-name', inp_name);
						$label.attr('ui-id', inp_id);
						
						app.evt();
					},
					allCheck : function(name, value){
						var $all = $('input[name="'+ name + '"]'),
							all_len = $all.length,
							i = all_len,
							id;
													
							for (i; i--;) {
								id = $all.eq(i).attr('id');
								if ($all.eq(i).prop('disabled') !== true) {
									$all.eq(i).prop('checked', value);
									value ? $('label[for="' + id + '"]').addClass('checked') : $('label[for="' + id + '"]').removeClass('checked');
								}
							}
					},
					check : function(all_name){
						var $all = $('input[data-all-check="' + all_name + '"]');
						
						if ($('input[name="' + all_name + '"]').length === $('input[name="' + all_name + '"]:checked').length) {
							$all.prop('checked', true);
							$('label[for="' + $all.attr('id') + '"]').addClass('checked');
						} else {
							$all.prop('checked', false);
							$('label[for="' + $all.attr('id') + '"]').removeClass('checked');
						}
						
					},
					evt : function () {
						var $label = $('label');
						
						$('input[type="radio"]').off('click.rc').on('click.rc', function (){
							var current_id = $(this).attr('id'),
								current_name = $(this).attr('name');
							$label.removeClass('focus');
							$('label[ui-name="' + current_name + '"]').removeClass('checked');
							$('label[ui-id="' + current_id + '"]').addClass('checked focus');
						});
						
						$('input[type="checkbox"]').off('click.rc').on('click.rc', function (){
							var current_id = $(this).attr('id'),
								$current_label = $('label[ui-id="' + current_id + '"]'),
								all = $(this).data('all-check'),
								all_name = $(this).attr('name');

							$label.removeClass('focus');

							if ($(this).prop('checked') === true) {
								$current_label.addClass('checked focus');
								(!!$(this).data('all-check')) ? app.allCheck(all, true) : '';
							} else {
								$current_label.removeClass('checked').addClass('focus');
								(!!$(this).data('all-check')) ? app.allCheck(all, false) : '';
							}
							(!!$(this).attr('name')) ? app.check(all_name) : '';
						});
						

						$('input[type="checkbox"], input[type="radio"]').off('focus.rc').on('focus.rc', function (){
							var current_id = $(this).attr('id'),
								$current_label = $('label[ui-id="' + current_id + '"]');
							$label.removeClass('focus');
							$current_label.addClass('focus');
						});
						
						$('input[type="checkbox"], input[type="radio"]').off('blur.rc').on('blur.rc', function (){
							$label.removeClass('focus');
						});
					}
				}
				app.init();
			});
		},
		
//		uiSelect : function (opt) {
//			var defaults = {
//					id : null,
//					reset : false,
//					dsb : null
//				},
//				opt = $.extend(defaults, opt);
//			
//			return this.each(function (){
//				var base = this,
//				
//				$body = $('body'),
//					$base = $(base),
//					$base_optg = $base.find('optgroup'),
//					$base_opt = $base.find('option'),
//					
//					base_tit = $base.attr('title'),
//					base_id = $base.data('select-id'),
//					base_w = $base.outerWidth(),
//					opt_sum = $base_opt.length,
//					w_h = $(win).height(),
//					//backdrop = false,
//					
//					reset = opt.reset,
//					reset_id = opt.id,
//					
//					clone_w,
//
//					$clone, $ui_select_clone, $ui_clone_list, $ui_clone_btn, $ui_clone_tit, $ui_clone_opt;
//				
//								
//				var app = {
//					init : function () {
//						
//						//alert($base.parent().parent().find('.inputBox').length);
//						//(base_w < 60) ? base_w = 'auto' : '';
////						if ($base.parent().parent().find('.inputBox').length) {
////							
////							clone_w = '100%'
////						} else 
//						
////						if ($base.parent().parent().parent().find('.inputHalf').length) {
////							clone_w = '100%'
////						} else {
////							clone_w =  base_w + 'px';							
////						}
//												
//						//console.log(clone_w);
//						var clone = 
//							'<div class="ui_select_clone ' + base_id + '" id="' + base_id + '" style="width:' + base_w + 'px">' +
//							'<button type="button" class="ui_clone_btn" aria-controls="' + base_id + '_ctr">' +
//							'<em></em><span> 선택됨.</span> <span>' + base_tit + ' 선택창 <span class="ui_state">열기</span></span>' + 
//							'</button>' +
//							'</div>',
//							ui_clone_list = doc.createElement("div"),
//							i = 0;
//						
//						$(ui_clone_list)
//							.addClass('ui_clone_list')
//							.attr('role','listbox')
//							.attr('aria-expanded',false)
//							.attr('id', base_id + '_ctr');
//						$base.before(clone);
//						
//						$clone =  $('#' + base_id);
//						$ui_clone_btn = $('.ui_clone_btn');
//						$ui_clone_tit = $clone.find('.ui_clone_btn').find('em');
//
//						for (i; i < opt_sum; i++) {
//							var $currnet_opt = $base_opt.eq(i),
//								$optgroup = $currnet_opt.closest('optgroup'),
//								opt_txt = $currnet_opt.text(),
//								opt_val = $currnet_opt.val(),
//								opt_attrVal = $currnet_opt.attr('value'),
//								opt_class = '',
//								opt_sel = '',
//								optg_num = i,
//								j = 0, 
//								optg_sum = $optgroup.find('option').length;
//
//							// optgroup이 있다면.....
//							if ($optgroup.length) {
//								$(ui_clone_list).append('<div class="ui_optgroup_' + optg_num + '" role="group"><em>'+ $base_opt.eq(i).closest('optgroup').attr('label') +'</em></div>');
//								
//								for(j; j < optg_sum; j++) {
//									$currnet_opt = $base_opt.eq(i);
//									opt_txt = $currnet_opt.text();
//									opt_val =$currnet_opt.val();
//									
//									optClone(i);
//									$(ui_clone_list).find('.ui_optgroup_' + optg_num).append('<button role="option" class="ui_clone_opt '+ opt_class +'" type="button" value="' + opt_val + '" ' + opt_sel + ' data-optnum="' + i + '">' + opt_txt + '</button>');
//									i = i + 1;
//								}
//								i = i - 1;
//							} 
//							else {
//								optClone(i);
//								$(ui_clone_list).append('<button role="option" class="ui_clone_opt '+ opt_class +'" type="button" value="' + opt_val + '" ' + opt_sel + ' data-optnum="' + i + '">' + opt_txt + '</button>');
//							}
//						}
//						
//						function optClone(i) {
//							$currnet_opt.attr('data-optnum', i);
//							if ($currnet_opt.prop('selected') === true) {
//								$ui_clone_tit.text(opt_txt);
//								opt_class = 'selected';
//								opt_sel = 'aria-selected="true"';
//							}
//							if ($currnet_opt.prop('disabled') === true) {
//								opt_class = 'disabled';
//								opt_sel = 'disabled="disabled"';
//							}
//						}
//						
//						$clone.append(ui_clone_list);
//						$ui_clone_list = $('.ui_clone_list');
//						$ui_clone_opt = $('.ui_clone_opt');
//						
//						$base.hide(); 
//						app.evt();
//					},
//					sync: function (sel_id, sel_idx) {
//						var $re =  $('#' + sel_id),
//							opt_txt = $re.find('.ui_clone_opt').eq(sel_idx).text();
//						
//						$re.find('.ui_clone_btn').find('em').text(opt_txt);
//						$re.find('.ui_clone_opt')
//							.removeClass('selected')
//							.attr('aria-selected', false)
//							.eq(sel_idx).addClass('selected')
//							.attr('aria-selected', true)
//						
//					},
//					reset : function () {
//						$('#' + reset_id).remove();
//						app.init();
//					},
//					show : function (current) {
//						var c_t = $(current).offset().top,
//							w_t = $(win).scrollTop(),
//							c_p = c_t - w_t,
//							c_h = $(current).outerHeight() / 2,
//							half = (w_h + c_h) / 2,
//							$current_list = $(current).closest('.ui_select_clone').find('.ui_clone_list'),
//							l_h = $current_list.outerHeight(),
//							max_h = w_h - (c_p + (c_h * 2)),
//							max_h2 = (c_p);
//						//console.log('max_h2 : ' + max_h2 + ', l_h : ' + l_h +  ', c_p : ' + c_p + ', c_t : ' + c_t + ', w_t : ' + w_t + ', c_h : ' + c_h + ', w_h : ' + w_h + ', half : ' + half  );
//						app.hide();
//						
//						// clone list postion
//						if (max_h > l_h) {
//							$current_list.removeClass('ps_bottom').addClass('ps_top');
//						}
//						else {
//							if (half > c_p) {
//								if (max_h < l_h) {
//									$current_list.css({
//										height : max_h - 40,
//										overflowY : 'scroll'
//									});
//								} 
//								$current_list.removeClass('ps_bottom').addClass('ps_top');
//							} 
//							else {
//								if (max_h2 < l_h) {
//									$current_list.css({
//										height : max_h2 - 40,
//										overflowY : 'scroll'
//									});
//								} 
//								$current_list.removeClass('ps_top').addClass('ps_bottom');
//							}
//						}
//						
//						$('.ui_select_clone .ui_clone_btn').data('open', false);
//						$(current).closest('.ui_select_clone').addClass('open');
//						$current_list.stop().fadeIn(100, function(){
//							$(this).find('.selected').focus();
//						});
//					},
//					hide : function ($current) {
//						$('.ui_select_clone').removeClass('open');
//						$('.ui_clone_btn').data('open', false);
//						
//						$ui_clone_list.hide().removeAttr('style');
//						if (!!$current) {
//							$current.find('.ui_clone_btn').attr('tabindex', 0).focus();
//						}
//					},
//					evt : function () {
//						// clone button event
//						$ui_clone_btn.off('click.sel').on('click.sel', function (){
//							var current = this,
//								$current = $(current);
//
//							if (!$(current).data('open')) {
//								app.show(current);
//								$current.data('open', true).find('.ui_state').text('닫기');
//								
//							} else {
//								app.hide($current);
//								$current.data('open', false).find('.ui_state').text('열기');
//							}
//						});
//						
//						$('label[data-select-label]').off('click.sel_label').on('click.sel_label', function(){
//							$('#' + $(this).attr('data-select-label') + ' .ui_clone_btn').attr('tabindex', 0).focus();
//						});
//						
//						// clone option event
//						$ui_clone_opt.off('click.sel_opt').on('click.sel_opt', function () {
//							var $current = $(this),
//								idx = $current.attr('data-optnum'),
//								$current_clone = $current.closest('.ui_select_clone'),
//								$current_btn = $current_clone.find('.ui_clone_btn'),
//								current_id = $current_clone.attr('id'),
//								opt_txt = $current.text();
//							
//							$current.closest('.ui_clone_list').find('.ui_clone_opt').removeClass('selected').attr('aria-selected', false);
//							$current.addClass('selected').attr('aria-selected', true);
//							
//							$('select[data-select-id="' + current_id + '"]').find('option').eq(idx).prop('selected', true).change();
//							$current_btn.find('em').text(opt_txt);
//							$current_btn.data('open', false).find('.ui_state').text('열기');
//							
//							app.hide($current_clone);
//						});
//						
//						// select 선택값 전달
//						$base.on('change.sel', function (){
//							app.sync($(this).data('select-id'), $(this).find('option:selected').attr('data-optnum'));
//						});
//						
//						// backdrop close
//						var backDrop_target = '.ui_select_clone';
//						$._backDrop.close(backDrop_target, app.hide);
//					}
//				}
//				
//				if(browser.ie == 9) {
//					if (!$base.data('overlap')) {
//						app.init();
//						$base.data('overlap', true);
//					} 
//					if (reset === true) {
//						app.reset();
//					}					
//				}
//			});
//		},
		uiPopup : function (opt) {
			var defaults = {
					link : null,
					name : 'new popup', 
                    width : 300,
                    height : 400,
                    align: 'center',
                    top : 0,
                    left : 0,
                    toolbar : 'no',
                    location : 'no',
                    menubar : 'no',
                    status : 'no',
                    resizable : 'no',
                    scrollbars : 'no'
                   
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function (){
				var $base = $(this),
					href = $base.attr('href'),
					link = opt.link,
					align = opt.align,
					width = opt.width,
					height = opt.height,
					top = opt.top, 
					left = opt.left;
				
				$base.off('click.popup').on('click.popup', open);
				
				function open(e){
					e.preventDefault();
					
					if (align === 'center') {
						var w_w = $(win).outerWidth() / 2,
							w_h = $(win).outerHeight() / 2;
						
						left = w_w - (width / 2);
						top = w_h - (height / 2);
					}
					
					if (link !== null) {
						href = link;
					}

					var specs = 'width=' + width + ', height='+ height + ', left=' + left + ', top=' + top;
						specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
					
					win.open(href, opt.name , specs);
				}
			});
		},
		
		uiDropdowns : function (opt) {
			var defaults = {
					callback : null,
					resize : false,
					logTab : false
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function () {
				var base = this,
					$base = $(base),
					$btn = $(base).find('.uiDropBtn'),
					$cont = $(base).find('.uiDropCont'),					
					callback = opt.callback, resize = opt.resize, logTab = opt.logTab;
				
				var app = {
					resizeBase : null,
					resizeChg : null,
					resizeFlag : null,
					show : function (current) {
						$base = $(current);
						
						$cont.removeClass('on');
						$btn.data('open', false).attr('aria-expanded', false);
						
						$base.closest('.uiDrop').find('.uiDropCont').addClass('on');
						$base.data('open', true).attr('aria-expanded', true);
						
						callback !== null ? callback(current) : '';
						
					},
					hide : function () {
						$cont.removeClass('on');
						$btn.data('open', false).attr('aria-expanded', false);
					},
					evt : function () {
						if(logTab === true) tabAct();
						
						
						$base.find('.uiDropBtn').off('click.drop',act).on('click.drop',act);	
						
						$(win).resize(function(){
							resizeEvt();		
						});
												
						function resizeEvt(){
							var $body =	$('body'),
							$html = $('html');
							
							
							base.s1 = (!!$('html.s1').length);
							base.s2 = (!!$('html.s2').length);
							
							if(resize === true) { // 푸터 나라 선택
								$base.find('.uiDropBtn').off('click.drop',act).on('click.drop',act);	
								app.resizeChg = $('html').hasClass('s1') ? 'mobile' : $('html').hasClass('s2') ? 'tablet' : $('html').hasClass('s3') ? 'pc' : '';
								//console.log(app.resizeBase + ' / ' + app.resizeChg + ' / ' + app.resizeFlag );					
								
								if(app.resizeFlag && (app.resizeBase !== app.resizeChg)) app.hide();
								
							} else { // 기타
								
								if(base.s1) { 
									$base.find('.uiDropBtn').off('click.drop',act).on('click.drop',act); 
								} else {
									app.hide();
									
									$base.find('.uiDropBtn').off('click.drop');
								}	
								if(logTab === true) tabAct();
							}
						}
						
						function act(e){
							var current = this;
							e.preventDefault();
							(!$(this).data('open')) ? app.show(this) : app.hide();
							if(resize === true) {
								app.resizeBase = $('html').hasClass('s1') ? 'mobile' : $('html').hasClass('s2') ? 'tablet' : $('html').hasClass('s3') ? 'pc' : '';
								app.resizeFlag = $base.closest('.uiDrop').find('.uiDropCont').hasClass('on');
							}
						}	
						
						function 	tabAct() {
							var $links = $base.find('.uiDropCont').find('a'),
								$tabConts = $base.next('.logTabConts').find('>div'),
								$linksLi = $base.find('.uiDropCont').find('li');
							
							$links.off('click.tab').on('click.tab', function (e){
								e.preventDefault();	
								var Id = $(this).attr('href'),
									$tabId = $(Id),
									txt = $(this).text();
								
								$tabConts.hide();
								$tabId.show();	
								$linksLi.removeClass('on');
								
								$(this).closest('li').addClass('on');							
								
								$btn.attr('aria-expanded', false).text(txt);
								app.hide();
							
							});
						}
						
					}
					
				}
				app.evt();
			});
		},
		uiTooltip : function (opt) {
			var defaults = {
					trigger : 'click', // hover = 'moseover focus', click = 'click'
					place : 'top',	// top. middle, bottom
					align : 'left', // left, right, center
					max_w : 400,
					min_w : 180,
					auto : false, // 작업중
					space : 15
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function () {
				var base = this,
					$btn = $(base),
					tooltipId = $btn.data('tooltipid'),
					$body = $('body'),
					$cont = $('#' + tooltipId),
					$closeBtn = $cont.find('.uiClose'),
					trigger = opt.trigger,
					place = opt.place,
					align = opt.align,
					space = opt.space,
					auto = opt.auto,
					min_w = opt.min_w,
					max_w = opt.max_w,
					half = $(win).outerWidth() / 2,
					win_h = $(win).outerHeight(),
					backdrop = false,
					evt_show, evt_hide, timer;			
					
					var $html = $('html'), 
					width = $(doc).outerWidth(),
					devsize = [1440, 1023, 767],
					sizeMode = width > devsize[0] ? 4 : width > devsize[1] ? 3 : width > devsize[2] ? 2 : 1,
					sizeClass = (' s'+ sizeMode +' s'+ (2 > sizeMode ? 12 : 34) + (360 > width ? ' s0' : ''));
					$html.removeClass('notransition transform backgroundsize rgba svg pointerevents opacity');
					$html.removeClass('s0 s1 s2 s3 s4 s12 s34').addClass(sizeClass);
					
					
					
					
				var app = {
					init : function() {
						
//						if (trigger === 'hover') {
//							evt_show = 'mouseover.tooltip focus.tooltip'; 
//							evt_hide = 'mouseleave.tooltip blur.tooltip';
//						}
						if (trigger === 'click') {
							evt_show = 'click.tooltip'; 
							evt_hide = 'click.tooltip';
						}
						
						app.evt();
					},
					show : function (current, way, event) {
						var base = current, 
							tooltip_id = $(base).attr('data-tooltipid');
						
						// 다른 툴팁 초기화
						$('.uiTooltipCont').hide();
						$('.uiTooltip').attr('aria-expanded', false).removeClass('on');
						
						var t = Math.floor($(base).position().top),
							l = Math.floor($(base).position().left),
							w = Math.floor($(base).outerWidth()),
							h = Math.floor($(base).outerHeight()),
							
						
						$tooltip = $('#' + tooltip_id),
						h_t = $tooltip.outerHeight(),
						w_t = $tooltip.outerWidth(),
						value_top, value_left;
							
				
						(w_t < min_w) ? w_t = min_w : '';
						(w_t > max_w) ? w_t = max_w : '';
						
						$tooltip.css('width', w_t).css({
							'display' : 'block',
							'opacity' : 0
						});
						
						h_t = $tooltip.outerHeight();
						
						if (auto) {
							place = (win_h < ($(base).offset().top - $(win).scrollTop()) + h_t + 20) ? 'top' : 'bottom';
							align = (l > half) ? 'right' : 'left';
						}
						
						if (place === 'bottom' || place === 'top') {
							if (place === 'bottom') {
								value_top = t + h + space; 
								$tooltip.removeClass('bottom top').addClass('bottom');
							} else if(place === 'top') {
								value_top = t - (h_t + space);
								$tooltip.removeClass('bottom middle').addClass('top');
							}
							
							switch (align) {
								case 'left' : 
									if (!!$('html.s1').length) {
										value_left = (l + (w / 2)) - (w_t / 2); 
										$tooltip.removeClass('left right').addClass('center');
									} else { 
										value_left = l + -90; 
										$tooltip.removeClass('right center').addClass('left');
									}
									break;
								case 'right' : 
									value_left = l - (w_t - w); 
									$tooltip.removeClass('left center').addClass('right');
									break;
								case 'center' : 
									value_left = (l + (w / 2)) - (w_t / 2); 
									
									$tooltip.removeClass('left right').addClass('center');
									break;
								// not default
							}
						}
						
						$tooltip
							.css({
								top : value_top, 
								left : value_left, 
								display : 'block',
								opacity : 0
							})
							.stop().animate({
								opacity : 1
							},200)
							.data('backid', tooltip_id)
							.find('a, button, input, label').eq(-1).addClass('end');
						
						if (way === 'click') {
							$tooltip.attr('tabindex', 0).focus();
							$._uiHold.hold('#' + tooltip_id);
						}
						
						$(base).attr('aria-expanded', true).addClass('on');
						$btn.data('tooltip', true);
					},
					hide_click : function (){						
						var backid = $cont.data('backid');

						$('.uiTooltip[data-tooltipid="' + backid + '"]').focus();
						app.hide();
					},
					hide : function (val) {
						var speed = (val === 0) ? 0 : 200;
						//console.log($cont);
						$cont.stop().delay(10).fadeOut(speed);
						$btn.attr('aria-expanded', false).removeClass('on');
						$btn.data('tooltip', false);
					},
					evt : function () {
						$(win).resize(function(){
							 app.hide();
							
						});
						
						if (trigger === 'click') {
							$btn.off('click.tooltip').on('click.tooltip', function(e){
								e.preventDefault();
								(!$btn.data('tooltip')) ? app.show(this, '', e) : app.hide();
							});
							
						
							
							$closeBtn.off('click.tooltip').on('click.tooltip', function(e){
								
								e.preventDefault();								
								app.hide();
							});
						}
						
						// backdrop close
						var backDrop_target = '.uiTooltip, .uiTooltipCont';
						$._backDrop.close(backDrop_target, app.hide);
					}
				}
				app.init();
			});
		},

		
		uiDialog : function (opt) {
			var defaults = {
					auto : false,
					call : null,
					call_back : null,
					width : null, 
					height : null,
					ps_vt : 'middle', // top, middle, bottom 
					ps_hz : 'center' // left, center, right	
				},
				opt = $.extend(defaults, opt);
			
			return this.each(function () {
				var $base = $(this),
					dialog_id = $base.attr('data-dialogid'),
					$dialog = $('#' + dialog_id),
					$body = $('body'),
					auto = opt.auto,
					call = opt.call,
					call_back = opt.call_back,
					w = opt.width,
					h = opt.height,
					ps_vt = opt.ps_vt,
					ps_hz = opt.ps_hz,
					sc_t = 0,
					$back, $dialog_bg, left, right;
				
				var app = {
					position : function () {
						$dialog = $('#' + dialog_id);

						(w === null) ? w = $dialog.outerWidth() : '';
						(h === null) ? h = $dialog.outerHeight() : '';
						
						var w_h = $(win).outerHeight();
						
						if (w_h < h ) {
							$dialog.css({
								top : 10,
								height : w_h - 20,
								overflowY : 'scroll'
							});
						} else {
							if (ps_vt === 'middle') {
								$dialog.css({ 
									top : '50%',
									marginTop : (h / 2) * -1
								});
							} 
							else if (ps_vt === 'top') {
								$dialog.css('top', 0);
							} 
							else if (ps_vt === 'bottom') {
								$dialog.css('bottom', 0);
							}
						}

						if (ps_hz === 'center') {
							$dialog.css({ 
								left : '50%',
								marginLeft : (w / 2) * -1
							});
						} 
						else if (ps_hz === 'left') {
							$dialog.css('left', 0);
						} 
						else if (ps_hz === 'right') {
							$dialog.css('right', 0);
						}
					},
					bg : function () {
						$body.data('bg_dialog', true);
						$body.append('<div class="bg_dialog"></div>');
						
						$dialog_bg = $('.bg_dialog');
						$dialog_bg.css('display','block').stop().animate({
							opacity : 0.8
						},600 , function () {
							$dialog_bg.off('click.dialog_bg').on('click.dialog_bg', function () {
								app.hide();
							});
						});
					},
					show : function (dialog_id) {
						$dialog = $('#' + dialog_id);
						
						// dialog show
						app.position();
						$dialog.css('display', 'block').stop().animate({
							opacity : 1
						},200, function(){
							// dialog hold
							$._uiHold.hold('#' + dialog_id);
							(browser.mobile) ? $dialog.find('h1').eq(0).focus() : $dialog.attr("tabindex", 0).focus();
						});

						// bg
						(!$('body').data('bg_dialog')) ? app.bg() : '';
						
						// close
						$dialog.find('.ui_close').off('click.dialog_close').on('click.dialog_close', function () {
							app.hide();
						});
					},
					hide : function (callback_id) {
						(!!callback_id) ? $dialog = $('#' + callback_id) : $dialog = $('#' + dialog_id);
						
						$dialog.stop().animate({
							opacity : 0.5
						}, 100, function () {
							var $this_hide = $(this);
							
							$this_hide.find('.fst').removeClass('fst').removeAttr('tabindex');
							$this_hide.find('.end').removeClass('end');
							$this_hide.hide().removeAttr('style');
						});
						
						$dialog_bg.animate({
							opacity : 0
						}, 100, function () {
							$('body').data('bg_dialog', false);
							$dialog_bg.remove();
						});
						
						$._uiScroll.move(sc_t);
						$back.focus();
					},
					evt : function () {
						// click						
						$base.off('click.dialog').on('click.dialog', function (e) {
							e.preventDefault();
							
							if (call_back === null) {
								$back = $(this);
								sc_t = $(doc).scrollTop();
							} else {
								$back = $(call_back);
								$back.attr('tabindex',0);
								sc_t = $back.position().top;
							}
							dialog_id = $(this).attr('data-dialogid');
							
							app.show(dialog_id);
						});

						// auto & call
						if (auto === true || call !== null) {
							if (call_back === null) {
								$back = $body.find('a, input, button, label, select').eq(0);
								sc_t = $(doc).scrollTop();
							} else {
								$back = $(call_back);
								$back.attr('tabindex',0);
								sc_t = $back.position().top;
							}
							dialog_id = $base.attr('id');
							$dialog_bg = $('.bg_dialog');
							
							(call === 'show') ? app.show(dialog_id) : (call === 'hide') ? app.hide(dialog_id) : '';

							if (auto === true) {
								$base.off('click.dialog');
								($._cookie.get(dialog_id) === null) ? app.show(dialog_id) : '';
								
								// cookie button
								$('.ui_cookie_wrap button').off('click.cookie').on('click.cookie', function () {
									var $this 		= $(this),
										$ck_dialog 	= $this.closest('[role="dialog"]'),
										ck_id 		= $this.attr('data-cookieid'),
										d_id 		= $ck_dialog.attr('id'),
										$ck_inp 	= $('#' + ck_id),
										ck_val 		= $ck_inp.val();
									
									$dialog_bg = $('.bg_dialog');

									if ($ck_inp.prop('checked') === true) {
										$._cookie.set(d_id, ck_val, ck_id, "/")
									}
									app.hide();
								});
							}	
						}
					}
				}
				app.evt();
			});
		}
	});
			
	/*!
	 * @module slide effect
	 * @author jo
	 * @email jo@netive.co.kr
	 * @create 2016-07-02
	 * @license MIT License
	 */
	var UiSlide = {
			init : function (options, el) {
				var base = this;
				
				// base root
				base.$elem 			= $(el);
				base.$item_wrapper 	= base.$elem.find('.ui_item_wrapper');
				base.$item 			= base.$item_wrapper.find('.ui_item');

				// option
				base.opt 			= $.extend({}, $.fn.uiSlide.options, base.$elem.data(), options);
				
				// load type 이라면 load_item 실행(첫 보여줄 위치값 전달)
				(base.opt.load) ? base.load_item(base.opt.load_start, 'next') : base.set();
				
			},
			tabLinks : function(){
				var base = this;
				
				base.$itemTabLinks.off('click.uiSlide').on('click.uiSlide', function(e){
					e.preventDefault();
					var str = $(this).attr('href');
					var rgExp = /\d/i;
					str = rgExp.exec(str)[0];
					base.$itemTabLinks.removeClass('active');
					$(this).addClass('active');
					$('.lifeStageCont').removeClass('on');
					$('#lifeConts'+str+'').addClass('on');
					base.cIdx = base.$itemTabLinks.index(this);
					base.current = base.cIdx

					if(base.opt.cntLinks){ //cntLinks 옵션이 true 인 경우
//						console.log('tabLinks : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
					}
				});
			},
			load_item : function(n, dir, callback) {
				var base = this;
				
				// 첫번째 아이템값 순서값이 없다면(isNaN으로 숫자가 아닌지 체크) 0. 처음으로 자동 설정
				(isNaN(n)) ? n = 0 : '' ;
				
				// ajax로 파일 불러옴.
				$.ajax({
					url     	: base.opt.load_url,
					dataType	: base.opt.load_type, 
					error 		: function() {
						alert('error');
					},
					success 	: function(data) {
						// 처음 불러올때 한번만 사용. data 값으로 체크
						if (!base.$elem.data('itemload')){
							base.$elem.data('itemload', true);
							
							// ajax로 불러오는 파일의 items 갯수만큼.. !!! json 파일 items 키 이름 필수
							for (var i = 0; i < data.items.length; i++) {
								base.$item_wrapper.append('<div class="ui_item"></div>');
								base.$item = base.$item_wrapper.find('.ui_item');
								
								// 전체 정보 load
								if (base.opt.load_view === 'all') {
									base.$item.eq(i).data('load', true).append( base.opt.load_success(data, i) )
								} 
								// 일부 정보 load
								else {
									(i === n) ? base.$item.eq(n).data('load', true).append( base.opt.load_success(data, n) ) : '';
								}
							}
							base.set(data.items.length);
						} 
						// 추후 정보를 가져올때 사용
						else {
							base.$item.eq(n).data('load', true).append( base.opt.load_success(data, n) );
							base.set_load(data.items.length);
						}
						
						// callback 있다면 실행
						(!!callback) ? callback() : '';
					}
				});
			},
			set : function (loadsum) {
				var base = this;
					
				// 현재아이템 설정
				base.current 		= (!base.opt.load_start) ? base.opt.current - 1 : base.opt.load_start;
				base.tabCurrent = (!base.opt.load_start) ? base.opt.tab_current - 1 : base.opt.load_start;
				
				// item 정보
				base.info 		= {};
				base.info.tit	= base.$elem.find('.ui_slide_tit').text();
				base.info.sum 	= (!!loadsum) ? loadsum : base.$item.length;
				base.info.w 	= base.$item.outerWidth();
				base.info.h 	= base.$item.eq(base.current).outerHeight();
				base.info.rem 	= base.info.sum % base.opt.view
				base.firstwidth = base.info.w;
				
				base.cIdx;
				
				//아이템 안에 uiSlideAnchor 클래스를 같는 앵커가 있는 경우, 탭과 같이 탭 클릭시 아래의 컨텐츠의 show, hide 기능을 갖는 경우 사용
				if(base.opt.cntLinks){ //cntLinks 옵션이 true 인 경우
					base.$itemTabLinks  = base.$item.find('.uiSlideAnchor');
				}
				
				if(base.opt.cntLinks){
					base.current = base.cIdx;
//					console.log('set : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
				}
				if(base.opt.cntLinks){ //cntLinks 옵션이 true 인 경우
					base.tabLinks();
				}
				
				base.$elem.addClass('slide_ready').css('min-height', base.info.h);
				base.$item_wrapper.css('height', base.info.h);
				
				base.$item.attr('role', 'tabpanel').removeClass('slide_on');
				
				if(base.opt.cntLinks){
					base.$item.attr('role', 'tabpanel').removeClass('slide_on');
					base.$item.attr('role', 'tabpanel').eq(base.cIdx).addClass('slide_on');
					base.$itemTabLinks.removeClass('active');
					base.$itemTabLinks.eq(base.cIdx).addClass('active');
				} else {
					base.$item.attr('role', 'tabpanel').eq(base.current).addClass('slide_on');
				}
				
				
				
				// multi
				if (base.opt.view > 1) {

//					base.$elem.css('width', base.info.w * base.opt.view);
					base.$elem.css('width', '100%');
					
//					base.$item_wrapper.css('width', base.info.w * base.opt.view);
					base.$item_wrapper.css('width', '100%');
					
					base.$item.addClass('slide_multi').wrapAll('<div class="ui_item_group" />');
					base.$item_group = base.$item_wrapper.find('.ui_item_group');
					
//					base.$item_group.addClass('ui_multi').css('width', base.info.w * base.info.sum);
					base.$item_group.addClass('ui_multi').css('width', '100%');
					
					base.group_w = base.$item_group.outerWidth();

					// dot 연결 
					for (var i = 0; i < base.info.sum; i++) {
						base.$item.eq(i).data('n', i).addClass('ui_n_' + i);
					}
					
					base.opt.type = 'slide';
					base.clone = base.$item.clone(true);

					base.multi_on();
				}

				// 완료 후 다음 이벤트 실행 false
				base.moving_btn = false;
				
				// item이 한개 이상이면 이벤트 실행
				if (base.info.sum > 1 || base.opt.load) {
					base.nav_dot();
					base.nav_auto();
					base.nav();
				}
				base.set_re();
			},
			multi_on : function(){
				var base =	this,
					n = base.current;

				if(base.opt.cntLinks){ //cntLinks 옵션이 true 인 경우
					if(base.cIdx === undefined) base.cIdx = 0;
					n = base.cIdx;
				}

				if(base.opt.cntLinks){
//					console.log('multi_on : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx + ' / ' + n);
				}
				
				for (var i = 0; i < base.opt.view; i++) {
					if(n == i){
						base.$itemTabLinks.eq(i).addClass('active');
					} else {
						base.$itemTabLinks.eq(i).removeClass('active');
					}
					base.$elem.find('.ui_item').eq(i).addClass('slide_on');
				}
			},
			multi_on_dot : function(){
				var base =	this,
					n = base.current;
				
				base.$elem.find('.dot_wrapper button').removeClass('on');
				
				var $slideOn = base.$elem.find('.slide_on'),
					slideLen = $slideOn.length;

				base.$elem.find('.dot_wrapper .dot_div button').eq(Math.ceil(base.$elem.find('.ui_item').eq(n).data('n') / base.opt.view)).addClass('on');
				

				if(base.opt.cntLinks){
					console.log('multi_on_dot - ' + base.current +' / '+ base.cIdx + ' / ' + n);
				}
				/*for (var i = 0; i < slideLen; i++) {
					var dot_idx = $slideOn.eq(i).data('n');
					base.$elem.find('.dot_wrapper .dot_div button').eq(dot_idx).addClass('on');
				}*/
			},
			set_re : function () {
				var base = this;
				
				$(win).resize(resizer).resize();
				
				function resizer(){	
					var win_w = $(win).outerWidth();

					if (base.opt.responsive) {
						if (base.opt.view_wide[0] < win_w ) {
							base.$elem.data('reset-d', false);
							base.$elem.data('reset-t', false);
							base.$elem.data('reset-m', false);
							if (!base.$elem.data('reset-w')) {
								base.$elem.data('reset-w', true);
								
								base.opt.view = base.opt.view_wide[1];
								reset();
							}
						} else if (base.opt.view_desktop[0] < win_w ) {
							base.$elem.data('reset-w', false);
							base.$elem.data('reset-t', false);
							base.$elem.data('reset-m', false);
							if (!base.$elem.data('reset-d')) {
								base.$elem.data('reset-d', true);
								base.opt.view = base.opt.view_desktop[1];
								reset();
							}
							
						} else if (base.opt.view_tablet[0] < win_w ) {
							base.$elem.data('reset-w', false);
							base.$elem.data('reset-d', false);
							base.$elem.data('reset-m', false);
							if (!base.$elem.data('reset-t')) {
								base.$elem.data('reset-t', true);
								base.opt.view = base.opt.view_tablet[1];
								reset();
							}
							
						} else if (base.opt.view_mobile[0] < win_w ) {
							base.$elem.data('reset-w', false);
							base.$elem.data('reset-d', false);
							base.$elem.data('reset-t', false);
							if (!base.$elem.data('reset-m')) {
								base.$elem.data('reset-m', true);
								base.opt.view = base.opt.view_mobile[1];
								reset();
							}
						}
						
						function reset(){
							//base.$item.removeClass().addClass('ui_item').unwrap('.ui_item_group');
							base.$elem.find('.ui_item_group').remove();
							base.$elem.find('.ui_item_wrapper').removeAttr('style').append(base.clone);
							base.$item = base.$elem.find('.ui_item');
							base.$elem.find('.dot_wrapper').remove();
							base.$elem.find('.nav_wrapper').remove();
							base.$elem.removeClass('slide_ready').removeAttr('style');

							if (base.opt.view === 1) {
								base.$elem.removeClass('multi_slide');
								base.$item.removeClass('slide_multi');
							} else {
								base.$elem.addClass('multi_slide');
							}
							
							if(base.opt.cntLinks){
								var lifeOn = $('.lifeStageCont.on');
								if (!lifeOn.length) { 
									$('.lifeStageCont').eq(0).addClass('on');
									
								}
								
//								console.log('reset : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
							}
							base.set();
						}
						
					}
					
					
					//if (win_w)
					
					// item width값 %일 경우
					if (base.firstwidth !== base.$item.outerWidth()) {
						base.info.sum = base.$item.length;
						base.info.w = base.$item.outerWidth();
						base.info.h = base.$item.eq(base.current).outerHeight();
						base.firstwidth = base.info.w;
						base.$item_wrapper.css('height', base.info.h);
						base.$elem.css('min-height', base.info.h);
						
						
						
						base.gestures();
					}
				}
			},
			set_load : function (sum) {
				var base = this;
				
				base.$item_wrapper 	= base.$elem.find('.ui_item_wrapper');
				base.$item_group 	= base.$item_wrapper.find('.ui_item_group');
				base.$item 			= base.$item_wrapper.find('.ui_item');
				
				//base.$item.attr('role', 'tabpanel').attr('tabindex', 0);
				base.$dot_wrapper 	= base.$elem.find('.dot_wrapper');
				base.$dot_div 		= base.$dot_wrapper.find('.dot_div');
				base.$dot_button 	= base.$dot_div.find('button');

				base.info.sum = sum;
				base.info.w = base.$item.outerWidth();
				base.info.h = base.$item.eq(base.current).outerHeight();
				base.firstwidth = base.info.w;
				
				base.$item_wrapper.css('height', base.info.h);
				base.$elem.css('min-height', base.info.h);
				
				base.nav_dot();
			},
			nav_auto : function(){
				var base = this;
				
				// autoplay
				if (base.opt.autoplay) {
					
					if (base.opt.dot) {
//						base.$dot_wrapper.before('<button type="button" class="btn_auto"><span>' + base.info.tit + ' <em>정지</em></span></button>');
						base.$dot_wrapper.prepend('<button type="button" class="btn_auto"><span>' + base.info.tit + ' <em>정지</em></span></button>');
					} else {
						//base.$item_wrapper.before('<button type="button" class="btn_auto type_b"><span>' + base.info.tit + ' <em>정지</em></span></button>');
					}
				
					base.$btn_auto = base.$elem.find('.btn_auto');
					
					// 상태확인에 따른 설정
					(base.opt.autoplay_state === 'play') ? base.move_play() : base.move_stop();
				}
			},
			nav_dot : function(){
				var base = this,
					dot_sum = base.info.sum,
					tit_n, tit_p, dot_button;
							
				// dot nav
				if (base.opt.dot) {
					// dot html생성
					if (!base.$elem.find('.dot_wrapper').length){
						base.$item_wrapper.before('<div class="dot_wrapper" role="tablist"><span class="dot_div"></span></div>');
						
						base.$dot_wrapper 	= base.$elem.find('.dot_wrapper');
						base.$dot_div 		= base.$dot_wrapper.find('.dot_div');
						
						var j = 0;
						for (var i = 0; i < dot_sum; i++) {
							
							if (i === j) {
								j = j + base.opt.view;
								tit_n = base.$item.eq(i).find('.ui_item_tit').text();
								dot_button = '<button type="button" role="tab" data-n="' + i + '">' + tit_n + '</button>';
								base.$dot_div.append(dot_button);
							}
							
							
								
							
						}
					}
					
					base.$dot_button = base.$dot_div.find('button');
					base.$dot_button.attr('aria-selected',false);
					base.$dot_button.eq(base.current).addClass('on').attr('aria-selected',true);
					
					if (base.opt.view > 1) {
						base.multi_on_dot();
					}
				}
			},
			nav : function () {
				var base = this,
					tit_p, tit_n;
				
				// button nav
				if (base.opt.nav) {
					if (!base.$elem.find('.nav_wrapper').length){
						base.$item_wrapper.after('<div class="nav_wrapper"></div>');
						base.$nav_wrapper = base.$elem.find('.nav_wrapper');
		
						tit_p = base.$item.eq(base.current - 1).find('.ui_item_tit').text();
						tit_n = base.$item.eq(base.current + 1).find('.ui_item_tit').text();
						
						if (base.opt.view > 1) {
							base.$nav_wrapper.append('<button type="button" class="prev">이전 - ' + base.info.tit + '</button>');
							base.$nav_wrapper.append('<button type="button" class="next">다음 -' + base.info.tit + '</button>');
						} else {
							base.$nav_wrapper.append('<button type="button" class="prev">이전 - ' + tit_p + '</button>');
							base.$nav_wrapper.append('<button type="button" class="next">다음 -' + tit_n + '</button>');
						}
						
						base.$prev = base.$nav_wrapper.find('.prev');
						base.$next = base.$nav_wrapper.find('.next');
					}
					if (base.opt.rolling === false) {
						if (base.current === base.info.sum - 1) {
							base.$next.addClass('nav_end').text('마지막입니다.').attr('disabled','disabled');
						} else if (base.current === 0) {
							base.$prev.addClass('nav_end').text('마지막입니다.').attr('disabled','disabled');
						} 
					}
				}
				base.evt();
				base.evt_type();
				base.gestures();
			},
			
			nav_re : function (n){
				var base = this,
					t_n, t_p;
				
				// auto height
				var current_height = base.$item.eq(base.current).outerHeight();
				base.$item_wrapper.stop().animate({
					height : current_height
				}, 300);
				base.$elem.stop().animate({
					minHeight : current_height
				}, 300);
				
				//base.moving_btn = false;
				(n >= base.info.sum - 1) ? n = -1 : '';
				
				// dot nav reset
				if (base.opt.dot && base.opt.view === 1) {
					base.$dot_button.removeClass('on').attr('aria-selected', false);
					base.$dot_button.eq(base.current).addClass('on').attr('aria-selected',true);
				} else if (base.opt.view > 1){
					base.multi_on_dot();
				}
				// button nav reset
				if (base.opt.nav) {
					t_p = '이전 - ' + base.$item.eq(n - 1).find('.ui_item_tit').text();
					t_n = '다음 - ' + base.$item.eq(n + 1).find('.ui_item_tit').text();
					
					if (base.opt.view > 1) {
						base.$prev.text('이전 - ' + base.info.tit).removeClass('nav_end').removeAttr('disabled');
						base.$next.text('다음 - ' + base.info.tit).removeClass('nav_end').removeAttr('disabled');
					} else {
						base.$prev.text(t_p).removeClass('nav_end').removeAttr('disabled');
						base.$next.text(t_n).removeClass('nav_end').removeAttr('disabled');
					}

					if (base.opt.rolling === false) {
						if (n < 0) {
							base.$next.addClass('nav_end').text('마지막입니다.').attr('disabled','disabled');
						} else if (n === 0) {
							base.$prev.addClass('nav_end').text('마지막입니다.').attr('disabled','disabled');
						}
					}
				}
			},
			
			evt_type : function () {
				var base = this,
					types = ['as', 'ever', 'jo'];
				
				base.ev_types = {};
				
				if (base.opt.mouseDrag === true && base.opt.touchDrag === true) {
					types = [
						'touchstart.jo mousedown.jo',
						'touchmove.jo mousemove.jo',
						'touchend.jo touchcancel.jo mouseup.jo' 
					];
				}
				else if (base.opt.mouseDrag === false && base.opt.touchDrag === true) {
					types = [
						'touchstart.jo',
						'touchmove.jo',
						'touchend.jo touchcancel.jo' 
					];
				}
				else if (base.opt.mouseDrag === true && base.opt.touchDrag === false) {
					types = [
						'mousedown.jo',
						'mousemove.jo',
						'mouseup.jo' 
					];
				}
				
				base.ev_types.start = types[0];
				base.ev_types.move = types[1];
				base.ev_types.end = types[2]; 
			},
			
			gestures:function () {
				var base = this,
					sum = base.info.sum,
					w = base.info.w,
					n = base.current,
					
					nn = 0,
					nnn = 0,
					locals,
					left_s;
				
				base.$object = (base.opt.view > 1) ? base.$elem.find('.ui_item_group') : base.$item;
				base.moving = false;
				base.movFix = false;
				
				locals = {
					offsetX : 0,
					offsetY : 0,
					movX : 0,
					movY : 0,
					movX2 : 0,
					movY2 : 0,
					minSwap : w / 10,
					maxSwap : w
				};
				
				function getTouches(event) {
					//터치 이벤트가 undefined 가 아니라면
					if (event.touches !== undefined) {
						return {
							x : event.touches[0].pageX,
							y : event.touches[0].pageY
						};
					}
					if (event.touches === undefined) {
						if (event.pageX !== undefined) {
							return {
								x : event.pageX,
								y : event.pageY
							};
						}
						//ie
						if (event.pageX === undefined) {
							return {
								x : event.clientX,
								y : event.clientY
							};
						}
					}
				}
				
				function swapEvent(type) {
					if (type === 'on') {
						$(doc).off(base.ev_types.move).on(base.ev_types.move, dragMove);
						$(doc).off(base.ev_types.end).on(base.ev_types.end, dragEnd);
					}
					if (type === 'off') {
						$(doc).off(base.ev_types.move);
						$(doc).off(base.ev_types.end);
					}
				}
				
				function dragMove(event) {
					var ev = event.originalEvent || event || win.event,
						ps;
					
					n = base.current;
					base.moving = true; // 움직임중일때 새로운 터치 이벤트 취소
					base.move_stop(); // 자동진행 취소

					// 시작한 위치값 - 현재 위치값 = 이동거리
					locals.movX = parseInt(locals.offsetX - getTouches(ev).x, 10) * -1;
					locals.movY = parseInt(locals.offsetY - getTouches(ev).y, 10) * -1;
					
					// 움직임시 스크롤이벤트 취소
					(Math.abs(locals.movX) > 10) ? ev.preventDefault() : '';
					
					// 최대 드래그 값 설정
					if (Math.abs(locals.movX) > base.info.w * (base.opt.view * 1.2)) {
						return;
					}
					
					// 움직임감도 설정
					locals.movX = Math.round(locals.movX / 1.5);
					locals.movY = Math.round(locals.movY / 1.5);				
					
					// 좌우 슬라이드 
					if (Math.abs(locals.movX) > Math.abs(locals.movY)) {
						(!support.touch) ? event.preventDefault() : ''; // touch 지원 안할때
						base.movFix = true;
						
						// base & multi select
						if (base.opt.view > 1) {
							// multi
							if (base.$elem.find('.ui_n_' + nn).data('n') !== base.$elem.find('.ui_n_' + nn).index()) {
								var idx_i = base.$elem.find('.slide_on').eq(0).data('n');
								
								for (var i = base.info.sum; i--;) {
									var $target = base.$elem.find('.ui_item').eq(-1),
										first = $target.data('n'),
										cut = $target.detach();
									
									base.$item_group.prepend(cut);
									if (first === 0) {
										base.$item_group.stop().css('left', base.info.w * idx_i * -1);
										n = idx_i;
										nn = (locals.movX < 0) ? base.opt.view : 0;
										base.current = n;
										break;
									}
								}
							}
							
							if (locals.movX < 0) {
								//next
								if (nn >= base.info.sum - base.opt.view) {
									locals.movX = (w * n * -1) + Math.round(locals.movX / (base.opt.view - base.info.rem));
									locals.movY = (w * n * -1) + Math.round(locals.movY / (base.opt.view - base.info.rem));			
								} else {
									nn = n + base.opt.view;
									locals.movX = (w * n * -1) + locals.movX;
									locals.movX2 = (w * n * -1) + locals.movX ;
								}
							}
							if (locals.movX > 0) {
								//prev
								if (n === 0) {
									// 정순서, 젤 앞
									locals.movX = Math.round(locals.movX / 10);
									locals.movY = Math.round(locals.movY / 10);				
								} else if (n <= base.info.rem && 0 !== base.info.rem) {
									// 정순서, 나머지보다 같거나 작은수가 남았다면
									nn = 0;
									locals.movX = ((base.info.rem* base.info.w) - Math.round(locals.movX / (base.opt.view - base.info.rem))) * -1;
								} else if (n === (base.info.rem + base.opt.view) && 0 !== base.info.rem) {
									nn = base.info.rem;
									locals.movX = (((base.info.rem + base.opt.view) * base.info.w) - locals.movX) * -1;
								} else {
									nn = n - base.opt.view;
									/*nn = (nn === base.info.rem) ? base.info.rem : n - base.opt.view;*/
									locals.movX =  (((nn + base.opt.view) * base.info.w) - locals.movX) * -1;
								}
							} 
							
						} else {
							//base
							if (locals.movX > 0) {
								nn = n - 1;
								locals.movX2 = (w * -1) + locals.movX;
								// 초기화
								base.$object.eq(n + 1).css({ 
									left : w,
									display : 'none'
								});
							} 
							if (locals.movX < 0) {
								nn = n + 1;
								locals.movX2 = w + locals.movX;
								// 초기화
								base.$object.eq(n - 1).css({ 
									left : w * -1,
									display : 'none'
								});
							}
						}
						
						(nn < 0 ) ? nn = sum - 1 : '';
						(nn >= sum) ? nn = 0 : '';
						//console.log(nn)
						
						base.swapMove(locals.movX, locals.movX2, n, nn);
					}
					// 상하스크롤
					if (Math.abs(locals.movY) > Math.abs(locals.movX) && !base.movFix) {					
						$(doc).off("touchmove.jo");
						base.moving = false;
					}
					if (Math.abs(locals.movX) > Math.abs(locals.movY) && base.movFix) {					
						//$(doc).off("touchmove.jo");
						base.moving = true;
					}
				}
				function dragEnd(event) {
					var ev = event.originalEvent || event || win.event;

					// click 움직임 없을 때 item 안의 이벤트 실행..
					if (locals.movX === 0 && locals.movY === 0) {
						base.$object.find('a').off('click.inner_evt').on('click.inner_evt', function (e){
							//alert('ok ' + $(this).attr('href'));
						});
						base.moving = false;
						swapEvent('off');
					}
					// (locals.movX !== 0 ) 
					else { 
						// 좌우 움직임일때만 실행
						if (base.movFix) {
							// 좌우 최소 움직임에 대한 설정 안에 들어간다면 취소 움직임
							if (locals.movX < locals.minSwap && locals.movX > 0) {
								base.swapMove_cancel('prev', n, nn);
							}
							else if (Math.abs(locals.movX) < locals.minSwap && locals.movX < 0) {
								base.swapMove_cancel('next', n, nn);
							}
							// 좌우 움직임이 맞다면 완료 움직임.
							else {
								base.swapMove_ok(locals.movX, n, nn);
							}
							swapEvent('off');
						}
					}
					
					// 움직임 완료 후 초기화
					locals.movX = 0;
					base.movFix = false;
				}
				function dragStart(event) {
					var ev = event.originalEvent || event || win.event;
					
					n = base.current;
					
					if (base.opt.load) {
						base.load_item( (n - 1 < 0) ? base.info.sum - 1 : n - 1, 'prev' )
						base.load_item( (n + 1 > base.info.sum - 1) ? 0 : n + 1, 'next' );
					}
					
					if (base.opt.view > 1) {
						left_s = base.$object.position().left;
					}
					
					// 마우스오른쪽버튼 클릭 취소 & 동작중 터치 이벤트 취소, item 전체갯수가 보여주는 갯수보다 작거나 같으면 취소
					if (ev.which === 3 || base.moving === true || base.info.sum <= base.opt.view) {
						return false;
					}
					
					// item 안의 이벤트 취소.. input,button 요소도 추가필요
					/*(base.$object.find('a').off('click.inner_evt').on('click.inner_evt', function (e){
						alert(e);
						e.preventDefault();
					});
					*/
					
					// item 안의 input,button 선택시
					base.$object.find('input, button, select, label').on('click', function (e){
						swapEvent('off');
					});
					
					// 시작 위치값
					locals.offsetX = getTouches(ev).x;
					locals.offsetY = getTouches(ev).y;
					
					// drag,end 이벤트 시작
					swapEvent('on');
				}
				
				// 터치스타트 이벤트
				base.$object.on(base.ev_types.start, dragStart);	
			},
			
			// drag move 시 움직임
			swapMove : function (value, value2, n, nn) {
				var base = this;
				
				if (base.opt.view > 1) {
					// multi
					base.$object.css('left', value);
					
				} else {
					// base
					base.$item.eq(n).css({
						'left' : (base.opt.type === 'cover') ? 0 : value,
						'z-index': 0
					});
					base.$item.eq(nn).css({ 
						left : value2,
						zIndex: 1,
						display : 'block'
					});
				}
			},
			// drag move 취소 움직임
			swapMove_cancel : function (value, n ,nn) {
				var base = this,
					value2 = base.info.w;
			
				(value === 'prev') ? value2 = value2 * -1 : '';
				
				if (base.opt.view > 1) {
					// multi
					base.$object.stop().animate({ 
						left :  0 
					}, base.opt.speed_drag, 'linear', function () {
						base.moving = false;
					});
					
				} else {
					// base
					base.$item.eq(n).stop().animate({ 
						left :  0 
					}, base.opt.speed_drag, 'linear');
					base.$item.eq(nn).stop().animate({ 
						left : value2
					}, base.opt.speed_drag, 'linear', function () {
						base.$item.eq(nn).css({
							display: 'none'
						});
						base.moving = false;
					});
				}
				
			},
			// drag move 완료 움직임
			swapMove_ok : function (value, n, nn) {
				var base = this,
					w = base.info.w;
				
				(value > 0) ? w = w * 1 : ''; 
				(value < 0) ? w = w * -1 : '';
				
				$(doc).off(base.ev_types.start);
				
				if (base.opt.view > 1) {
					//multi
					
					if (nn >= base.info.sum - base.opt.view) {
						base.$object.stop().animate({
							left : w * (base.info.sum - base.opt.view) 
						}, base.opt.speed_drag, 'linear', function (){
							base.current = base.info.sum - base.opt.view;
							base.nav_re(base.info.sum - base.opt.view);
							base.moving = false;
							base.moving_btn = false;
						
							
						});
					} else {
						base.$object.stop().animate({
							left : (w * nn > base.info.w) ? w * nn * -1 :  w * nn
						}, base.opt.speed_drag, 'linear', function (){
							base.current = nn;
							base.nav_re(nn);
							base.moving = false;
							base.moving_btn = false;
						
						});
					}
					base.multi_on();
				} else {
					// base
					if (base.opt.item_eff) {
						base.$item.eq(n).addClass('eff_n');
						base.$item.eq(nn).addClass('eff_nn');
					}
					(base.opt.type === 'cover') ? base.$nav_wrapper.data('ing', true) : '';

					base.$item.eq(n).css('z-index', 0).stop().animate({
						left : (base.opt.type === 'cover') ? 0 : w
					}, base.opt.speed, base.opt.easing, function (){
						base.$nav_wrapper.data('ing', false);
						base.$item.eq(n).removeClass('slide_on eff_n eff_nn').removeAttr('style').removeAttr('tabindex').hide();
					});
					base.$item.eq(nn).stop().animate({
						left : 0
					}, base.opt.speed, base.opt.easing, function (){
						base.moving = false;
						base.moving_btn = false;
					}).addClass('slide_on').attr('tabindex', 0);
					
					base.current = nn;
					base.nav_re(nn);

					if(base.opt.cntLinks){
						base.cIdx = base.current;
						base.$itemTabLinks.removeClass('active');
						base.$itemTabLinks.eq(base.cIdx).addClass('active');						
						$('.lifeStageCont').removeClass('on');
						$('#lifeConts'+base.cIdx+'').addClass('on');
						
//						console.log('swapMove_ok : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
					}
				}
			},

			// button click event
			evt : function () {
				var base = this,
					direction;
				
				// dot event
				if (base.opt.dot) {
					base.$dot_div.find('button').off('click.uiSlide').on('click.uiSlide', function(){
						var idx = $(this).data('n');
						
						if (base.opt.load && !base.$item.eq(idx).data('load')) {
							base.load_item(idx, 'next', eventAct('', idx));
						} else {
							eventAct('', idx);
						}
					});
					base.$dot_div.find('button').off('focus.uiSlide').on('focus.uiSlide', function() {
						base.move_stop();
					});
				}
				// nav button event
				if (base.opt.nav) {
					base.$prev.off('click.uiSlide').on('click.uiSlide', function(){
												
						if (!base.$nav_wrapper.data('ing')) {
							if (base.opt.load && !base.$item.eq(base.current - 1).data('load')) {
								(base.current - 1 < 0) ? base.current = base.info.sum : '';
								base.load_item(base.current - 1, 'prev', eventAct('prev'));
							} else {
								eventAct('prev')
							}

						if(base.opt.cntLinks){
							base.cIdx = base.current;
							base.$itemTabLinks.removeClass('active');
							base.$itemTabLinks.eq(base.cIdx).addClass('active');
							$('.lifeStageCont').removeClass('on');
							$('#lifeConts'+base.cIdx+'').addClass('on');
							
//							console.log('evt : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
						}
							
						} else {
							return false;
						}
						
					});
					base.$next.off('click.uiSlide').on('click.uiSlide', function(){
						if (!base.$nav_wrapper.data('ing')) {
							if (base.opt.load) {
								if (!base.$item.eq(base.current + 1).length) {
									base.load_item(0, 'next', eventAct('next'));
								} else {
									if (!base.$item.eq(base.current + 1).data('load')) {
										base.load_item(base.current + 1, 'next', eventAct('next'));
									} else {
										eventAct('next');
									}
								}
							} else {
								eventAct('next');
							}
							
						if(base.opt.cntLinks){
							base.cIdx = base.current;
							base.$itemTabLinks.removeClass('active');
							base.$itemTabLinks.eq(base.cIdx).addClass('active');							
							$('.lifeStageCont').removeClass('on');
							$('#lifeConts'+base.cIdx+'').addClass('on');
							
//							console.log('evt : base.current - ' + base.current +' / base.cIdx - '+ base.cIdx);
						}
												
							
						} else {
							return false;
						}
					});
					base.$nav_wrapper.find('button').off('focus.uiSlide').on('focus.uiSlide', function() {
						base.move_stop();
					});
				}
				// item event
				base.$item.off('focus.uiSlide').on('focus.uiSlide', function() {
					base.move_stop();
				});
				base.$item.find('a, input, button, select').off('focus.uiSlide').on('focus.uiSlide', function() {
					base.move_stop();
				});
				
				//autoplay
				if (base.opt.autoplay) {
					base.$btn_auto.on('click.uiSlide', function () {
						(!!$(this).data('playing')) ? base.move_stop() : base.move_play();
					});
				}

				function eventAct(dir, idx) {
					base.moving_btn = true;
					direction = dir;
					base.move(direction, !!idx ? idx : ''  );
					base.move_stop();
				}
			},
			
			// autoplay move
			move_auto : function (){
				var base = this;

				base.autoPlayInterval = win.setInterval(function () {
					base.move('next');
	            }, base.opt.autoplay_time);
			},
			move_stop : function (){
				var base = this;
				
				if (base.opt.autoplay) {
					base.$btn_auto.data('playing', false).removeClass('ico_stop').addClass('ico_play').find('em').text('진행');
					win.clearInterval(base.autoPlayInterval);
				}
			},
			move_play : function (){
				var base = this;

				base.$btn_auto.data('playing', true).removeClass('ico_play').addClass('ico_stop').find('em').text('정지');
				base.move_auto();
			},
			
			// button move
			move : function (direction, idx) {
				var base = this,
					n = base.current,
					tn = base.tabCurrent,
					nn, dir;
					
				if (base.opt.view > 1) {
					//sum = Math.ceil(base.info.sum / base.opt.view);
					base.info.rem = base.info.sum % base.opt.view
				}
				
				// nav button 
				if (!!direction) {
					if (direction === 'next') {
						dir = '-1';
						nn = n + base.opt.view;
						//console.log(tn + ' 현재 탭 숫자');
					}
					if (direction === 'prev') {
						dir = '1';
						nn = n - base.opt.view;
					} 
				} 
				
				// dot button
				if (!direction) {
					(!idx) ? idx = 0 : '';
					(n === idx) ? dir = '1' : (n > idx) ? dir = '1' : (n < idx) ? dir = '-1' : '';
					nn = idx;
					tn == idx;
					
					
					
				}

				base.act(dir, n, nn, tn, direction);
			},
			
			itemCut : function (direction, ord, len) {
				var base = this,
					ord = ord,
					len = len;
				
				for (var i = 0; i < len; i++) {
					var cut = base.$elem.find('.ui_item').eq(ord).detach();
					(direction === 'next' || direction === '') ? base.$item_group.append(cut): '';
					(direction === 'prev') ? base.$item_group.prepend(cut): '';
				}
			},
			groupMove : function (nn, type, value) {
				var base = this,
					left_value,
					nn = nn,
					type = type,
					value = value;
				
				switch (type) {
					case 'a' : left_value = base.info.w * nn * -1;
						break;
					case 'b' : left_value = base.info.w * (base.info.sum - base.opt.view) * -1;
						break;
					case 'c' : left_value = (base.info.w * base.info.rem) * -1;
						break;
					case 'd' : left_value = 0;	
						break;
					case 'e' : left_value = (base.info.w * (base.info.sum - (base.opt.view + base.info.rem))) * -1;
						break;
					case 'f' : left_value = base.info.w * value * -1;
						break;
					default : left_value = base.info.w * nn * -1;
						break;
				}
				
				base.$item_group.stop().animate({
					left : left_value
				}, base.opt.speed, base.opt.easing);
			},
			// button move action
			act : function (dir, n, nn, tn, direction) {
				var base = this,
					idx_rem;

				// type slide
				if (base.opt.type === 'slide' || base.opt.type === 'cover') {
					base.moving_btn = true;
					// multi
					// dot button 연관성 필요... 터치까지....
					(nn > base.info.sum) ? nn = base.info.sum : '';
					
					if (base.opt.view > 1) {
						if (direction === 'next') {
							// 나머지가 없는 경우
							if (base.info.rem === 0) {
								if (nn === base.info.sum) {
									// 나머지가 없는 경우 마지막
									base.itemCut(direction, 0, base.opt.view);
									nn = base.info.sum - base.opt.view;
									base.$item_group.stop().css('left', (base.info.w * (base.info.sum - (base.opt.view * 2))) * -1);
									base.groupMove(nn, 'a');
								} else {
									// 기본 다음 가기
									base.groupMove(nn, 'a');
								}
							}
							
							// 나머지가 있는 경우
							if (base.info.rem > 0) {
								if (base.info.sum < base.opt.view * 2) {
									// 전체갯수가 (보여주는 갯수 * 2) 보다 작다면 
									if (n === 0) {
										nn = base.info.sum - base.opt.view;
										base.groupMove(nn, 'b');
										
									} else {
										base.itemCut(direction, 0, base.info.rem);
										base.$item_group.stop().css('left',  0);
										nn = base.info.sum - base.opt.view;
										base.groupMove(nn, 'c');
									}
								} else {
									if (base.info.sum - (base.opt.view + base.info.rem) === base.$elem.find('.ui_item').eq(n).data('n') || 
										base.info.sum - (base.opt.view + base.info.rem) === base.$elem.find('.ui_item').eq(n).index()) {
										
										idx_rem = base.$elem.find('.ui_item').eq(n).index();
										if (!!base.$elem.find('.ui_item').eq(n + base.opt.view).length) {
											// 나머지부분이 다음위치에 존재한다면
											nn = nn - (base.opt.view - base.info.rem);
											base.groupMove(nn, 'f', idx_rem + base.info.rem);
											
										} else {
											// 나머지부분이 다음위치에 없다면 앞에서 나머지 값만큼 뒤로 이동 
											base.itemCut(direction, 0, base.info.rem);
											base.$item_group.stop().css('left', base.info.w * (base.info.sum - (base.opt.view + base.info.rem)) * -1);
											nn = base.info.sum - base.opt.view;
											base.groupMove(nn, 'f', idx_rem);
										}
									} else {
										if (nn > base.info.sum - base.opt.view) {
											base.itemCut(direction, 0, base.opt.view);
											nn = base.info.sum - base.opt.view;
											base.$item_group.stop().css('left', (base.info.w * (base.info.sum - (base.opt.view * 2))) * -1);
											base.groupMove(nn, 'a');
										} else {
											base.groupMove(nn, 'a');
										}
									}
								}
							}
						}
						
						if (direction === 'prev') {
							// 나머지가 없는 경우
							if (base.info.rem === 0){
								if (nn < 0){
									// nn < 0 인 경우. base.opt.view 값 만큼 뒤에서 앞으로 아이템 이동 후 현재아이템의 위치값은 nn = 0으로 설정.
									base.itemCut(direction, -1, base.opt.view);
									nn = 0;
									base.$item_group.stop().css('left', base.info.w * base.opt.view * -1);
									base.groupMove(nn, 'a');
								} else {
									base.groupMove(nn, 'a');
								}
							}
		
							// 나머지가 있는 경우
							if (base.info.rem > 0) {
								if (base.info.sum < base.opt.view * 2) {
									// 전체갯수가 (보여주는 갯수 * 2) 보다 작다면 
									if (nn > base.opt.view * -1) {
										//base.itemCut(direction, -1, base.opt.view - (base.info.sum - base.opt.view));
										//base.$item_group.stop().css('left',  base.info.w * (base.opt.view - (base.info.sum - base.opt.view)) * -1);
										nn = 0;
										base.groupMove(nn, 'd');
									} else {
										base.itemCut(direction, -1, base.info.rem);
										base.$item_group.stop().css('left',  base.info.w * base.info.rem * -1);
										nn = 0;
										base.groupMove(nn, 'd');
									}
								} 
								else {
									idx_rem = base.$elem.find('.ui_item').eq(n).index();
									if (idx_rem < 1) {
										if (base.$elem.find('.ui_item').eq(n).data('n') === base.info.sum - base.opt.view) {
											// 현재 n이 data값이 (전체수 - 보여주는 갯수) 일때 나머지 수만큼만 이동
											base.itemCut(direction, -1, base.info.rem);
											base.$item_group.stop().css('left', base.info.w * base.info.rem * -1);
											nn = 0;
											base.groupMove(nn, 'd');
										} else {
											// base.opt.view 값 만큼 뒤에서 앞으로 아이템 이동 후 현재아이템의 위치값은 nn = 0으로 설정.
											base.itemCut(direction, -1, base.opt.view);
											base.$item_group.stop().css('left', base.info.w * base.opt.view * -1);
											nn = 0;
											base.groupMove(nn, 'd');
										}
									} else {
										if (base.info.rem === base.$elem.find('.ui_item').eq(n).data('n') || 
											base.info.rem === base.$elem.find('.ui_item').eq(n).index()) {
											// 현재 n이 data값이 전체수 - (보여주는 갯수 + 나머지) 일때 나머지 수만큼만 이동
											nn = idx_rem - base.info.rem;
											base.groupMove(nn, 'f', idx_rem - base.info.rem);
										} else {
											base.groupMove(nn, 'a');
										}
									}
								}
							}
						} 
						
						if (!direction) {
							var nn = base.$elem.find('.ui_n_' + nn).data('n'),
								idx_dot = base.$elem.find('.ui_n_' + nn).index();

							if (nn !== idx_dot) {
								// 기본복사된 순서로 변경.. 문제는 만약 컨텐츠안데 폼요소가 있을 경우 초기화될수 있음.. 
								/*base.$elem.find('.ui_item').detach();
								base.$elem.find('.ui_item_group').append(base.clone);
								base.$item = base.$elem.find('.ui_item');*/

								for (var i = base.info.sum; i--;) {
									var $target = base.$elem.find('.ui_item').eq(-1),
										first = $target.data('n'),
										cut = $target.detach();
									
									base.$item_group.prepend(cut);
									if (first === 0) {
										break;
									}
								}
							} 

							if (nn > base.info.sum - base.opt.view) {
								nn = base.info.sum - base.opt.view;
								idx_dot = base.info.sum - base.opt.view;
								base.$item_group.data('two',true);
								
								base.$item_group.stop().animate({
									left : base.info.w * nn * -1
								}, base.opt.speed, base.opt.easing);
								
							} else {
								base.$item_group.stop().animate({
									left : base.info.w * nn * -1
								}, base.opt.speed, base.opt.easing);
							}
							
						}
					} 
					// base
					else {
						infLoop();
						itemEff();

						if (base.opt.type === 'cover') {
							//cover
							base.$nav_wrapper.data('ing', true);
							
							base.$item.eq(n).css('z-index',(dir < 0) ? 0 : 1).stop().animate({
								left : (dir < 0) ? 0 : base.info.w * dir
							}, base.opt.speed, (dir < 0) ? base.opt.easing :  base.opt.easing_re, function (){
								base.$nav_wrapper.data('ing', false);
								base.$item.eq(n).removeClass('slide_on eff_n eff_nn').removeAttr('style').removeAttr('tabindex');
								
							});
							base.$item.eq(nn).css({
								zIndex : (dir > 0) ? 0 : 1,
								display: 'block',
								left : (dir > 0) ? 0 : base.info.w * (dir * -1)
							}).addClass('slide_on').attr('tabindex', 0).stop().animate({
								left : 0
							}, base.opt.speed, (dir < 0) ? base.opt.easing :  base.opt.easing_re);
		
							base.$item.eq(nn).removeClass('eff_n eff_nn');
						
						} else {
							//slide
							base.$item.eq(n).css('z-index',0).stop().animate({
								left : base.info.w * dir
							}, base.opt.speed, base.opt.easing, function (){
								base.$nav_wrapper.data('ing', false);
								base.$item.eq(n).removeClass('slide_on eff_n eff_nn').removeAttr('style').removeAttr('tabindex');
							});
							base.$item.eq(nn).css({
								zIndex : 1,
								display: 'block',
								left : base.info.w * (dir * -1)
							}).addClass('slide_on').attr('tabindex', 0).stop().animate({
								left : 0
							}, base.opt.speed, base.opt.easing);
						}
					}
				}
				// type fade
				if (base.opt.type === 'fade') {
					infLoop();
					itemEff();
					
					base.moving_btn = false;
					base.$item.eq(n).stop().animate({
						left : 0,
						opacity : 0
					}, base.opt.speed, base.opt.easing, function (){
						base.$item.eq(n).removeClass('slide_on eff_n eff_nn').removeAttr('style').removeAttr('tabindex');
					});
					base.$item.eq(nn).css({
						display: 'block',
						left : 0,
						opacity : 0
					}).addClass('slide_on').attr('tabindex', 0).stop().animate({
						opacity : 1
					}, base.opt.speed, base.opt.easing);
					
					base.current = nn;
				}
				function itemEff() {
					if (base.opt.item_eff) {
							
						base.$item.eq((dir < 0) ? n : nn).addClass('eff_n');
						base.$item.eq((dir < 0) ? nn : n).addClass('eff_nn');
					}
				}
				function infLoop() {
					(direction === 'next') ? 
							(nn >= base.info.sum) ? nn = 0 : '' : 
					(direction === 'prev') ? 
							(nn < 0 ) ? nn = base.info.sum - 1 : '' : '';
				}

				base.current = nn;
				if (base.opt.view > 1) {
					base.multi_on();
				}
				base.nav_re(nn);
			}

		};
		$.fn.uiSlide = function (options) {
			return this.each(function (){
				if (!!$(this).data('overlap')) {
					return false;
				}
				$(this).data('overlap', true);
				
				var slide = Object.create(UiSlide);
				
				slide.init(options, this);
				$.data(this, "uiSlide", slide);
			});
		};
		$.fn.uiSlide.options = {
			view : 1,			// 노출 갯수
			item_eff : false,
			responsive : false,
			view_mobile 	: [0, 1],
			view_tablet 	: [767, 2],
			view_desktop 	: [1024, 4],
			view_wide 		: [1400, 4],
			
			current : 1, 		// 1부터 시작
			cIdx : 0, 		// 현재 활성화된 인덱스
			type : 'slide',		// 'slide' or 'fade'
			easing : 'easeOutQuart',
			easing_re : 'easeInOutQuart',
			/*
			 * linear
			 * easeInQuad, 		easeOutQuad, 		easeInOutQuad, 		easeOutInQuad,
			 * easeInCubic,	 	easeOutCubic, 		easeInOutCubic, 	easeOutInCubic,
			 * easeInQuart,	 	easeOutQuart, 		easeInOutQuart, 	easeOutInQuart, 
			 * easeInQuint, 	easeOutQuint, 		easeInOutQuint, 	easeOutInQuint, 
			 * easeInSine, 		easeOutSine, 		easeInOutSine, 		easeOutInSine, 
			 * easeInExpo, 		easeOutExpo, 		easeInOutExpo, 		easeOutInExpo, 
			 * easeInCirc, 		easeOutCirc, 		easeInOutCirc, 		easeOutInCirc, 
			 * easeInElastic, 	easeOutElastic, 	easeInOutElastic, 	easeOutInElastic, 
			 * easeInBack, 		easeOutBack, 		easeInOutBack, 		easeOutInBack, 
			 * easeInBounce, 	easeOutBounce, 		easeInOutBounce, 	easeOutInBounce
			 * 
			 */
			
			speed : 500,			// animation 속도
			
			rolling : true,
			autoplay : true,
			autoplay_state : 'play', // 'play' or 'stop'
			autoplay_time : 1000,
			
			load : false,			// 파일 로드
			load_url : null,		// 파일 주소
			load_type : null,		// 파일 타입, 'json', 'html' 등
			load_success : null,	// 파일 불러들일 함수
			load_view : 1,			// 몇개씩 불러올건지
			load_start : 0,			// 처음 보여줄 시작 아이템
			
			dot : true,
			nav : true,
			
			mouseDrag : true,
			touchDrag : true,
			speed_drag : 200,		// drag 속도
			cntLinks : false,       //lifeSlide 에서 컨텐츠와 연계하기 위한 옵션으로 사용, 디폴트는 false;
		};

	 

	 

	
	
	
})(jQuery, window, document);

$.fn.extend({
	   uiSliderRange : function(opt) {
		    var defaults = {
		            min : 0,
		            max : 100,
		            value : 0,
		            step : 1,
		            type : 1,
		         },
		         opt = $.extend(defaults, opt);
	         
	      return this.each(function () {	    	
	    	  var $base     = $(this),
	    	  	$rangeBox   = $(this).closest('.rangeBox'),
	            range_id    = $base.attr('data-rangeid'),
	            $range      = $('#' + range_id),
	            data_id    = $base.attr('data-id'),
	            //$ui_range   = $range.closest('.ui_slider_range'),
	            //$inp         = $base.find('.ui_amount'),
	            //$inpTxt      = $base.find('.iptTxt'),
	            $guide      = $base.find('.ui_guide'),
	            $handle     = $range.find('.ui-slider-handle'),		            
	            r_min       = opt.min,
	            r_max       = opt.max,
	            r_step      = opt.step,
	            r_value     = opt.value,
	            r_type      = opt.type,
	            addRanNum   = '<span class="rangeTxtBox"><span class="rangeTxt"></span></span>',
	            addBtn 	= '<span class="btns"><input type="button" class="btnSlideP" title="감소"><span class="hide">감소</span></input><input type="button" class="btnSlideM" title="증가"><span class="hide">증가</span></input></span>',
	            addRanMinTxt = '<span class="rTxtMin"></span>',
	            addRanMaxTxt = '<span class="rTxtMax"></span>',
	            $rangeTxt, r_type_txt, r_val;	    	  
	    	
	         var app = {
     		 init : function() {
     	            
                 // $inp.val(r_value);
     			 var commaExp = /(\d)(?=(?:\d{3})+(?!\d))/g;
                  if (r_type === 1) {
                 	 r_type_txt = "세";
                  } else if (r_type === 2) {
                 	 r_type_txt = "만원";
                 	 //개발 20170209추가 [s]
                 	 var d_value= String(r_value).replace(commaExp,'$1,');
                     var d_min= String(r_min).replace(commaExp,'$1,');
                     var d_max= String(r_max).replace(commaExp,'$1,');
                     //개발 20170209추가 [s]
                  } else if (r_type === 3) {
                 	 r_type_txt = "년후";
                  } else if (r_type === 4) {
                 	 r_type_txt = "년";
                  }
                  
                  $range.append(addRanMinTxt);
                  $range.append(addRanMaxTxt);
                  
                
                  
                  if ($rangeBox.hasClass('rangeTabBox')) {               	  
                	  $base.closest('.rTabCont').find('span.btns').remove();
                	  $base.closest('.rTabCont').append(addBtn); 
                  } else { 
                	  $rangeBox.append(addBtn); 
                  }
              
                  
                 var $rangeValTxt = $range.find('.rangeTxt');
                 var $rangeMinTxt = $range.find('.rTxtMin');
                 var $rangeMaxTxt = $range.find('.rTxtMax');
                 //app.flag();
                 //개발 20170209 r_value -> d_value 변경
                 $rangeValTxt.text(d_value + r_type_txt);
                 $rangeMinTxt.text(d_min + r_type_txt);
                 $rangeMaxTxt.text(d_max + r_type_txt);
                  
                 $range.slider({
                     range    : "max",                        
                     min      : r_min,
                     max      : r_max,
                     step     : r_step,
                     value    : r_value,                           
                     create   : function() {
                        $handle = $range.find('.ui-slider-handle');
                        $handle.append(addRanNum);
                        var sliderValue = $(this).slider('value');
                        //console.log(r_value);
                        
                        //개발 추가 20170124 [S]
                        if(typeof(data_id)!='undefined'){
                    		$("#"+data_id).val(sliderValue);
                    	}
                        //개발 추가 20170124 [E]
                        //화폐단위 comma 추가 
                        if (r_type === 2) {
                             sliderValue = String(sliderValue).replace(commaExp,'$1,');
                             r_min =  String(r_min).replace(commaExp,'$1,');
                             r_max = String(r_max).replace(commaExp,'$1,');
                        }
                        $handle.find('.rangeTxt').text(sliderValue + r_type_txt);                      
                        //console.log(rangeTxtW);
                       // $inpTxt.text(r_type_txt);
                        
                        $range.find('.rTxtMin').text(r_min + r_type_txt);
                        $range.find('.rTxtMax').text(r_max + r_type_txt);                       
                        //app.flag();
                     },
                     slide    : function(event,ui) {
                    	var uiValue = ui.value;
                    	//개발 추가 20170124 [S]
                    	if(typeof(data_id)!='undefined'){
                    		$("#"+data_id).val(uiValue);
                    	}
                        //개발 추가 20170124 [E]
                        $base.find('.ui_guide').hide();
                        if (r_type === 2) {
                        	uiValue = String(uiValue).replace(commaExp,'$1,');
                       }
                       $handle.find('.rangeTxt').text(uiValue + r_type_txt);           
                     }        
                  });
                 
                 var $slideUp = $rangeBox.find('.btnSlideP'),
      	 			 $slideDown = $rangeBox.find('.btnSlideM');
      	 			
                 
                 	$slideDown.click(function() {
                 		$range.slider("up");
                 		var v = $range.slider('value'),
             		 		btnValue = String(v).replace(commaExp,'$1,');
                 		$range.find('.rangeTxt').text(btnValue +  r_type_txt);
                 		
                 		if(typeof(data_id)!='undefined'){
                    		$("#"+data_id).val(btnValue);
                    	}
                 		
                	});

                 	$slideUp.click(function() {
                 		$range.slider("down");  
                 		var v = $range.slider('value'),
                 		 	btnValue = String(v).replace(commaExp,'$1,');
                 		
                 		$range.find('.rangeTxt').text(btnValue +  r_type_txt);
                 		
                 		if(typeof(data_id)!='undefined'){
                    		$("#"+data_id).val(btnValue);
                    	}

                	});
                 
     		 	}
                 
	         }
	         app.init(); 
	      });
	   }
	  
	});


$.extend($.ui.slider.prototype, {

  up: function() {

    this.value(this.value() + this.options.step);

  },

  down: function() {

    this.value(this.value() - this.options.step);

  }

});

