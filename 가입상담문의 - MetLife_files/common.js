;(function($, win, doc, undefined) {
	win.N = {	
		
		initialize : function(){
			var base = this;
			
			//root		
			base.root_body = $('body');
			base.root_header = $('.header');

			// desktop = true
			base.browser = !!$('html.win').length;
			base.s1 = !!$('html.s1').length; // ~ 768
			base.s2 = !!$('html.s2').length; // 768 ~ 1024 - tablet
			base.s3 = !!$('html.s3').length; // 1024 ~ 1400
			base.s4 = !!$('html.s4').length; // 1400 ~
			base.s12 = !!$('html.s12').length;
			base.s34 = !!$('html.s34').length;
			base.sNo = !!$('html.sNo').length;
			base.ios = !!$('html.ios').length;
			base.resW = !!$('body.resWrap').length;
			
			base.prevSize = (base.s1) ? 1 : '' || (base.s2) ? 2 : '' || (base.s3) ? 3 : '' || (base.s4) ? 4 : '';
			base.deviceSize = base.prevSize;
			base.worksSum = 7;
						
			N.mainNav();
			
			N.resizeClass();	
			//N.header();	
			N.reHeader();
			N.mainSlide();
			N.lifeSlide();
			
			
			if ($('.formTable').length) {
				N.formLabel();
			}
			
			if ($('input[type=radio]').length) { 
				$('input[type=radio]').uiRadioCheck();
			}
			if ($('input[type=checkbox]').length) { 
				$('input[type=checkbox]').uiRadioCheck();
			}
			
			$('.deTab').uiDropdowns();
			$('.subNav .uiDrop').uiDropdowns();
			$('.logTab').uiDropdowns({ logTab : true }); // 회사소개 - 금융그룹소개
			$('.uiCountry').uiDropdowns({ resize : true }); // 푸터 - 나라선택
			$('.fmenu').uiDropdowns();
			
			$('.srvTabWrap').mainSrvTab();
//			$('.shareBox').shareBox();

		},	
		
		mainNav : function() {
			var timer,
				$links = $('.ui_mainNav').find('a'),
				linksNum = $('.ui_mainNav').find('a').length,
				$lastLink = $links.eq(linksNum-1);			
				
			$('.ui_mainNav .depth1 > li > a, .ui_mainNav .depth2').on('mouseover focus', function(){
				$('.ui_mainNav .depth1 > li').removeClass('on');
				$(this).closest('li').addClass('on').closest('.ui_mainNav').addClass('active');
				clearTimeout(timer);
			}).on('mouseleave', function(){
				hide(this);
			});
			
			$('.ui_mainNav .depth1 > li > a').on('click', function(e){
				e.preventDefault();	
				var url = $links.attr('href');
				$('.ui_mainNav .depth1 > li').removeClass('on');
				$(this).closest('li').addClass('on').closest('.ui_mainNav').addClass('active');
				hide(this);
				$(location).attr('href',url);			
				
			});
			
			$lastLink.on('blur', function(){
				hide(this);
			});
			
			
			
			function hide(target){
				var target = target;
				timer = setTimeout(function(target){
					$('.ui_mainNav .depth1 > li').removeClass('on').closest('.ui_mainNav').removeClass('active');
				},1000);
			}
		},
		resizeClass : function() {
			var base = this,
				$body =	$('body'),
				$html = $('html');
				
			
			$(win).resize(function(){
				var old_scrT = $(win).scrollTop(),
					width = $(doc).outerWidth(),
					devsize = [1440, 1024, 767],
					sizeMode = width > devsize[0] ? 3 : width > devsize[1] ? 3 : width > devsize[2] ? 2 : 1,
					sizeClass = (' s'+ sizeMode +' s'+ (2 > sizeMode ? 12 : 34) + (360 > width ? ' s0' : ''));				
					
				$html.removeClass('notransition transform backgroundsize rgba svg pointerevents opacity');
				$html.removeClass('s0 s1 s2 s3 s4 s12 s34').addClass(sizeClass);
				
				var macB = false;
				if ($('.mac .popWrap').length && $('.ios').length == 0) {
					macB = true;
				}
				
				if($('.win .popWrap').length || macB) {
					$html.removeClass('s0 s1 s2 s3 s4 s12 s34').addClass("s34");
				} else if($('body.noResWrap').length) {					
					$html.addClass("sNo");
				}
				
				base.s12 = (!!$('html.s12').length);
				base.s34 = (!!$('html.s34').length);
				base.win = (!!$('html.win').length);
				base.sNo = (!!$('html.sNo').length);
				base.transition = (!!$('html.transition').length); 
				
				if (old_scrT !== 0) {
					$body.addClass('header_minized');
					base.header_scaleDown()
				} else {
					$body.removeClass('header_minized');
					base.header_scaleUp()
				}
				
			}).resize();
		},
		reHeader : function() {
			var base = this,
				$body =	$('body'),
				$head = $('header'),
				$schBox = $('.searchBoxWrap'),
				$allMn = $('.menuWrap'),
				$allMnCloseBtn = $allMn.find('.ui_close'),
				$dep1lnk = $('.menuWrap nav > ul > li > a'),
				$dep2 = $dep1lnk.next(),
				$exeSrch = $('.exeSearch'),
				old_scrT = $(win).scrollTop(),
				$contact = null,
				backdrop = false;
			
			var app = {
					resizeBase : null,
					resizeChg : null,
					resizeFlag : null,
					evt : function() {
						$(win).resize(function(){
							app.resizeEvt();		
							app.resizeStyle();
						});
						
						old_scrT !== 0 ? $body.addClass('header_minized') : $body.removeClass('header_minized');
						
						$(win).scroll(scaleTransform);
								
						app.addEvt();
												
						function scaleTransform(e) {
							var current_scrT = $(this).scrollTop();
							
							(current_scrT !== 0) ? base.header_scaleDown() : base.header_scaleUp();
						}
					},
					resizeEvt : function () {
						var $body =	$('body'),
						$html = $('html');						
						
						app.resizeChg = $('html').hasClass('s1') ? 'mobile' : $('html').hasClass('s2') ? 'tablet' : $('html').hasClass('s3') ? 'pc' : '';
					},
					addEvt : function () {
						app.resizeBase = $('html').hasClass('s1') ? 'mobile' : $('html').hasClass('s2') ? 'tablet' : $('html').hasClass('s3') ? 'pc' : '';
						
						$('.exe_menu').on('click.menu', function(e){					
							e.preventDefault();		
							sc_t = $(win).scrollTop();
							app.act();					
						});	
						
						$dep1lnk.off('click', app.subDep);
						$dep1lnk.on('click', app.subDep);	
						
					}, 
					resizeStyle : function () {
						//console.log(app.resizeFlag);
						
						if (app.resizeChg == 'mobile') {
							$dep1lnk.off('click', app.subDep);
							$dep1lnk.on('click', app.subDep);	
							
						} else {
							$dep1lnk.off('click', app.subDep);
							$dep2.removeAttr('style');
							$dep1lnk.removeClass('active');
						}
					},
					act : function() {
						var base_menu = $('.exe_menu'),
						id = $(base_menu).attr('href'),
						$close = $(id).find('.ui_close'),
						$body = $('body'),
						old_scrT = $(win).scrollTop();
					
						app.resizeFlag = $('.menuWrap').hasClass('active');
						
						// menu open & close toggle
						(!$(base_menu).data('open')) ? menuOpen() : menuClose();
				
						// close button click event
						$close.on('click.menu', function(e) {
							e.preventDefault();
							menuClose();
							$(base_menu).focus();
						});
						// menu close fn
						function menuOpen() {
											
							base.root_body.addClass('menuOpen');
							$(base_menu).data('open', true).addClass('on').text('').append('닫힘');
						
							base.header_scaleUp();
							$(id).attr('tabindex', 0).focus();
							$._uiHold.hold(id);		
							$allMn.addClass('active');
							
						}
						// menu close fn
						function menuClose() {
												
							base.root_body.removeClass('menuOpen');					
							$(base_menu).data('open', false).removeClass('on').text('').append('메뉴<span class="hide">닫힘</span>');					
							(sc_t > 0) ? base.header_scaleDown() : '';	
							$allMn.removeClass('active');
						
						}
					},
					subDep : function (e, $keythis) {
							
						if(e.type != 'focus' && base.s12) {
							e.preventDefault();
						}				
						var $this = (e.type != "keydown") ? $(this) : $keythis;
						var $thisDep2 = $this.next();
						
						if($this.hasClass('active')) {
							$thisDep2.slideUp();
							$this.removeClass('active');
						}  else {
							$dep1lnk.each(function () {
								var $this = $(this),
									$thisDep2 = $(this).next();
								
								if ($this.hasClass('active')) {
									$thisDep2.slideUp();
									$this.removeClass('active');
								}
							});
							
							$this.addClass('active');
							$thisDep2.slideDown();
						}
						$oldDep = $this;
					}			
			} 
			app.evt();
		},
		header_scaleUp : function() {
			var base = this,
				$body = $('body'),
				$header = $('.header'),
				$groupA = $('.header .groupL'),
				$groupB = $('.header .groupR');
				$allMnClose = $('.menuWrap .ui_close');
				$header.data('scale', false);
				$body.removeClass('header_minized');	
				
				scaleUp();		
				
				$(win).resize(function(){
					scaleUp();							
				});
				
				function scaleUp() {
					
					if (!base.s12) {
						$header.data('scale', false);
						$body.removeClass('header_minized');
						
						$header.stop().animate({
							height : 70
						});
						$header.find('.logo').stop().animate({
							width : 168,
							paddingTop : 15,
							marginLeft : -84
						});
						$groupA.stop().animate({
							paddingTop : 26
						});
						$allMnClose.stop().animate({
							paddingTop : 26
						});
						$groupB.find('a').stop().animate({
							height : 70,
							paddingTop : 26
						});
					}
					else {
						$header.stop().animate({
							height : 50
						});	
						$header.find('.logo').stop().animate({
							width : 120,
							paddingTop : 11,
							marginLeft : -60
						});
						$groupA.stop().animate({
							paddingTop : 15
						});
						$allMnClose.stop().animate({
							paddingTop : 15
						});
						$groupB.find('a').stop().animate({
							height : 50,
							paddingTop : 18
						});
					}
				}
				
				
			
		},
		header_scaleDown : function() {
			var base = this,
				$body = $('body'),
				$header = $('.header'),
				$groupA = $('.header .groupL'),
				$groupB = $('.header .groupR'),
				$allMnClose = $('.menuWrap .ui_close');
			
			
			
			if (!$header.data('scale')) {
				$header.data('scale', true);
				$body.addClass('header_minized');
				
				$header.stop().animate({
					height : 50
				});
				$header.find('.logo').stop().animate({
					width : 120,
					paddingTop : 11,
					marginLeft : -60
				});
				$groupA.stop().animate({
					paddingTop : 15
				});
				
				$allMnClose.stop().animate({
					paddingTop : 15
				});
				$groupB.find('a').stop().animate({
					height : 50,
					paddingTop : 18
				});

			}
		},
		mainSlide : function() {			
			$('.mainSlide').uiSlide({ 
				dot : true,
				nav : true,
				rolling : true,
				style : 'slide',
				speed : 1000,
				
				autoplay : true,
				autoplay_state : 'play',
				autoplay_time : 5000 
				
			});
		},
		lifeSlide : function (){
			$('.lifeStageSlide').uiSlide({ 
				view : 4,
				responsive : true,
				/*view_mobile 	: [0, 1],*/
				view_tablet 	: [767, 4],
				/*view_desktop : [1024, 4],*/
				
				current : 1,
				tab : true,
				tab_current : 1,
				dot : false,
				nav : true,
				rolling : true,
				type : 'slide',
				speed : 700,
				autoplay_state : 'stop',
				autoplay_time : 2000,
				cntLinks : true, //lifeSlide 에서 컨텐츠와 연계하기 위한 옵션으로 사용, 디폴트는 false;

				
			});
			$('.lifeStageWrap > .inner').show();
		},
		
		tab : function() {			
			$('.exe_tab').uiTab();
			$('.exe_acco').uiAccordion();
			$('.exe_drop').uiDropdowns();
		},
		header : function() {
			var base = this,
				$body =	$('body'),
				$head = $('header'),
				$schBox = $('.searchBoxWrap'),
				$allMn = $('.menuWrap'),
				$allMnCloseBtn = $allMn.find('.ui_close'),
				$dep1lnk = $('.menuWrap nav > ul > li > a'),
				$dep2 = $dep1lnk.next(),
				$exeSrch = $('.exeSearch'),
				old_scrT = $(win).scrollTop(),
				$contact = null,
				backdrop = false;
				
			
			old_scrT !== 0 ? $body.addClass('heder_minized') : $body.removeClass('heder_minized');
			
			$(win).scroll(scaleTransform);
					
			addEvent();
						
			function addEvent () {
				$('.exe_menu').on('click.menu', function(e){					
					e.preventDefault();		
					sc_t = $(win).scrollTop();
					app.act();					
				});	
				$(win).resize(function(){
					 resizeSet();
				}).resize();
				
			}
			
			function resizeSet() {
				allMnEvent(); /* 전체메뉴 */				
				function allMnEvent (){					
					if(base.s12) {
						$dep1lnk.off('click', subOpen);
						$dep1lnk.on('click', subOpen);				
					} else {
						$dep1lnk.off('click', subOpen);
						$dep2.removeAttr('style');
						$dep1lnk.removeClass('active');
					}
				}
			}
			
			function subOpen(e, $keythis){
				
				if(e.type != 'focus' && base.s12) {
					e.preventDefault();
				}				
				var $this = (e.type != "keydown") ? $(this) : $keythis;
				var $thisDep2 = $this.next();
				
				if($this.hasClass('active')) {
					$thisDep2.slideUp();
					$this.removeClass('active');
				}  else {
					$dep1lnk.each(function () {
						var $this = $(this),
							$thisDep2 = $(this).next();
						
						if ($this.hasClass('active')) {
							$thisDep2.slideUp();
							$this.removeClass('active');
						}
					});
					
					$this.addClass('active');
					$thisDep2.slideDown();
				}
				$oldDep = $this;
				
			}
			
			// menu event
			function menuAct() {
				var base_menu = $('.exe_menu'),
					id = $(base_menu).attr('href'),
					$close = $(id).find('.ui_close'),
					$body = $('body'),
					old_scrT = $(win).scrollTop();
				
					
				// menu open & close toggle
				(!$(base_menu).data('open')) ? menuOpen() : menuClose();
		
				// close button click event
				$close.on('click.menu', function(e) {
					e.preventDefault();
					menuClose();
					$(base_menu).focus();
				});
				// menu close fn
				function menuOpen() {
					base.root_body.addClass('menuOpen');				
					$(base_menu).data('open', true).addClass('on').text('').append('닫힘');
					base.header_scaleUp();
					$(id).attr('tabindex', 0).focus();
					$._uiHold.hold(id);						
					
					
					
				}
				// menu close fn
				function menuClose() {
					base.root_body.removeClass('menuOpen');					
					$(base_menu).data('open', false).removeClass('on').text('').append('메뉴<span class="hide">닫힘</span>');					
					(sc_t > 0) ? base.header_scaleDown() : '';	
					$allMn.removeClass('active');
				}
				
			}
			
			// header scale fn
			function scaleTransform(e) {
				var current_scrT = $(this).scrollTop();
				
				(current_scrT !== 0) ? base.header_scaleDown() : base.header_scaleUp();
				//current_scrT !== 0 ? $body.addClass('heder_minized') : $body.removeClass('heder_minized');
			}

			function subDepthOpen(){				
								
				var $btn = $('.menuWrap nav > ul > li > a');
				$btn.on('click', function(e) {
					e.preventDefault();
					
					if ($('.menuWrap nav > ul > li').hasClass('on')) {
						if($(this).parent().hasClass('on')){
							$(this).parent().removeClass('on');
							$(this).next('ul').slideUp();
						}
						else {
							$('.menuWrap nav > ul > li').removeClass('on');
							$('.menuWrap nav > ul ul').slideUp();
							$(this).parent().addClass('on');
							$(this).next('ul').slideDown();
						}
					}
					else {
						$(this).parent().addClass('on');
						$(this).next('ul').slideDown();
					}
					
				});
			}			
			
			
		},
		
		popup : function(){
		
			// window popup
			$('.exe_daum').uiPopup({
				name: 'new popup', 
                width: 500,
                height: 400,
                align: 'center',
                top : 0,
                left : 0,
                toolbar : 'no',
                location : 'no',
                menubar : 'no',
                status : 'no',
                resizable: 'yes',
                scrollbars: 'no'
			});
			$('.exe_naver').uiPopup({
				link : 'http://naver.com'
			});
			
			// dialog popup
			$('.ui_layerpop').uiDialog();
			$('#dialog1').uiDialog({ auto : true });
			
			$('.ui_layerpop_add').on('click', function () {
				var add = '<button type="button" class="ui_layerpop" data-dialogid="dialog_add">추가 레이어팝업</button>' +
				'<section role="dialog" aria-labelledby="dialog_add_label" aria-describedby="dialog_add_desc" class="layerpop" id="dialog_add">' +
				'<h1 id="ddialog_add_label">추가</h1>' +
				'<p id="dialog_add_desc">추가된 레이어 팝업</p>' +
				'<button type="button" class="ui_close">닫기</button>' +
				'</section>';
				$(this).after(add);
				$('.ui_layerpop').uiDialog();
			});
			
			// toolip
			$('.ui_tooltip').uiTooltip();

			$('.ui_tooltip_add').on('click', function () {
				var add = '<button type="button" class="ui_tooltip" data-tooltipid="tooltip2">tooltip 추가</button>' +
				'<div id="tooltip2" class="ui_tooltip_cont" role="tooltip">' +
					'<span class="arrow"></span>' +
					'<h1>동적으로 추가된 툴팁</h1>' +
					'<p>추가된 툴팁입니다.</p>;' +
				'</strong>'; 						
				$(this).after(add);
				$('.ui_tooltip').uiTooltip();
			});
			
		},
		carousel : function(){
			var base = this;
			$('body').removeClass().addClass('carousel').data('smoothwheelstop', false);
			$('.exe_slide_event1').uiSlide({ 
				dot : true,
				nav : true,
				rolling : true,
				type : 'slide',
				speed : 700,
				autoplay_state : 'stop',
				autoplay_time : 5000 
			});
			$('.exe_slide_event2').uiSlide({ 
				view : 2,
				dot : true,
				nav : true,
				rolling : true,
				type : 'slide',
				speed : 700,
				autoplay_state : 'stop',
				autoplay_time : 5000 
			});
			
		},
		form : function(){
			var base = this;
			
			$('.ui_select').uiSelect();
			$('input[type="radio"], input[type="checkbox"]').uiRadioCheck();
			$('input[type="text"], input[type="password"]').uiPlaceholder();
			
			// 테스트용
			$('#sel_add').on('click', function(){
				$('.exe_select[data-select-id="sel_2"]').append('<option value="5">새로 추가된 셀렉트입니다.</option>');
				$('.exe_select[data-select-id="sel_2"]').uiSelect({ 
					id : 'sel_2',
					reset : true 
				});
			});
			
		},
	

		formLabel : function() {			
			var hideLabel = $('.formTable .exHideLb');
			$(hideLabel).on('keyup focus ',function(){			
				$(this).prev('label').hide();
			}).on('focusout',function(){
				var txtVal = $(this).val();
				if(txtVal == ''){
					$(this).prev('label').show();
				}
			});
		}
	};


	$(win).load(function() {
		setTimeout(function() {
			N.initialize();
		}, 0);
	});
	
	$.fn.extend({
//		dynamicTbl : function(opt){
//			var defaults = {
//					scTdNum : 8,
//					tbThW : 200,
//					TbTdW1 : 100,
//					TbTdW2 : 80
//				},
//				opt = $.extend(defaults, opt);
//			return this.each(function () {
//				var $base = $(this),					
//					dmTbl = $base.find('table'),		
//					dmTblTr = $(dmTbl).find('tbody tr'),
//					dmTblTd = $(dmTblTr).eq(0).find('td').length,
//					dmTblTh = $(dmTblTr).eq(0).find('th').length,
//					dmTblTrNUM = dmTblTd + dmTblTh,
//					dmTblTdNum = opt.scTdNum,
//					tBodyThW = opt.tbThW,
//					tBodyTdW1 = opt.TbTdW1,
//					tBodyTdW2 = opt.TbTdW2,
//					tdW = 0, thW = 0, trW, colSum, colBox, colGr, tColGr, tCol;
//					
//				var app = {
//					evt : function () {
//						if (dmTblTd > dmTblTdNum ) {
//							app.tbodyW();
//							app.colCreate();
//						} 
//						$(dmTbl).show();
//					}, 
//					tbodyW : function () {						
//						$(dmTblTr).eq(0).find('th').css('width',tBodyThW);
//						$(dmTblTr).eq(0).find('td:even').css('width',tBodyTdW2);
//						$(dmTblTr).eq(0).find('td:odd').css('width',tBodyTdW1);
//						
//						thW = $(dmTblTr).eq(0).find('th').eq(0).width();
//						
//						$(dmTblTr).eq(0).find('td').each(function (i){								
//							tdW += eval($(dmTblTr).eq(0).find('td').eq(i).width());	
//						});		
//						
//						trW = tdW + thW;							
//						$(dmTbl).css('width',trW);						
//					},
//					colCreate : function () {						
//						
//						$(dmTbl).prepend('<colgroup>');
//						
//						tColGr = $(dmTbl).find('colgroup');
//						
//						
//						for (var i = 0; i < dmTblTrNUM; i++) {
//							colBox += '<col>';							
//						}	
//						tColGr.append(colBox);
//						
//						tCol = $(tColGr).find('col');					
//						
//						$(tColGr).find('col:even').css('width',tBodyTdW2);
//						$(tColGr).find('col:odd').css('width',tBodyTdW1);
//						tCol.eq(0).css('width',tBodyThW); 
//					
//					}
//					
//				}
//				app.evt();
//			});
//		},
		mainSrvTab : function () {
			var base = this,
			$base = $(base),
			$tab = $base.find('.srvTab'),
			$btn = $tab.find('>a ');
			

			var app = {
				show : function (current) {
					$base = $(current);
					
					$tab.removeClass('active').attr('aria-expanded', false);
					$base.closest('.srvTab').addClass('active').attr('aria-expanded', true);					
					
				},
				evt : function () {
					
					$tab.eq(0).addClass('active').attr('aria-expanded', true);					
					$btn.off('click.srv').on('click.srv',act); 	
					
					function act(e){
						var current = this;
						e.preventDefault();							
						app.show(this);
					}	
					
				}
			}
			app.evt();
			
		},
		
		shareBox : function () {
			var defaults = {
					callback : null
				},
				opt = $.extend(defaults, opt);
			
			var base = this,
				$base = $(base),
				$btn = $base.find('.btnCont'),
				$cont = $base.find('.snsList'),
				callback = opt.callback, timer;
		
			
			var app = {
				show : function (current) {
					$base = $(current);
					
					$base.closest('.shareBox').addClass('on');					
					$base.data('open', true).attr('aria-expanded', true);
					$base.closest('.shareBox').find('.snsList').show();
					$base.closest('.shareBox').find('.snsList').stop().animate({
							left : -72
						},400);
					
					callback !== null ? callback(current) : '';
					
				},
				hide : function () {
					$btn.closest('.shareBox').removeClass('on');
					$base.closest('.shareBox').find('.snsList').stop().animate({
						left : 20
					},400);
					clearTimeout(timer);					
						
					var target = $base.closest('.shareBox').find('.snsList');
					timer = setTimeout(function(target){
						$base.closest('.shareBox').find('.snsList').hide();
					},300);
					
					$btn.data('open', false).attr('aria-expanded', false);
					
				},
				evt : function () {
															
					resize_set();	
					
					function resize_set(){
						$(win).resize(function(){
							resizeEvt();		
						}).resize();	
					}
					
					function resizeEvt(){
						resizeWin();
						
						if(base.s12) { 	
							$cont.removeAttr('style');
							$btn.data('open', false).attr('aria-expanded', false);
							
							
						} else if(base.s34){						
							
							$btn.off('click.share').on('click.share',act); 				
							
						}							
					}
					
					function act(e){
						var current = this;
						e.preventDefault();							
						(!$(this).data('open')) ? app.show(this) : app.hide();
					}	
					
					function resizeWin() {
						var $body =	$('body'),
						$html = $('html');
						
						base.s12 = (!!$('html.s12').length);
						base.s34 = (!!$('html.s34').length);
					}
					
					
				}
				
			}
			app.evt();
			
		},
		lifeStep : function () {
			var base = this,
				lifeClass = $(base).attr('class'),
				stepTxt = lifeClass.split('step'),
				stepNum = stepTxt[1],
				$lifeLi = $(base).find('li');
			
			for (var i = 0; i < stepNum; i++) {
				$lifeLi.eq(i).addClass('passed');
			}
		}
	});
})(jQuery, window, document);