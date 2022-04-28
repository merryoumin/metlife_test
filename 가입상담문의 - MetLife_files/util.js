
/**
 * 용  도 : 팝업
 * 사용예제:  popOpenWin(팝업창URL, PC일때팝업옵션, 팝업열때 새창여부) 
 * 			-->  popOpenWin("/sample/test.do", "status=no,toolbar=no,menubar=no,location=no,scrollbars=yes","Y");
 * 			
 *         -->  windw.open("/sample/test.do", "status=no,toolbar=no,menubar=no,location=no,scrollbars=yes")
 */	
function popOpenWin(popUrl, popOpt, target){
	if(target == "" || target == null || target == "undefined"){
		window.open(popUrl, popOpt);
	}else{
		window.open(popUrl, popOpt, target);
	}
}	


/**
 * 용  도 : 팝업 close
 */	
function popCloseWin(){
	window.close();
}


/**
* 인자로 받은 테이블 아이디의 전체 Row 를 삭제 한다.
* @param obj ElementById
* 예제 deleteTableRow("#bascList");
*/
function deleteTableRow( obj ) {

	var $oldRow = $(obj + " tr");
	var rowCnt = $oldRow.length;

	$oldRow.remove();

}

function fnChar(str,defaultstr,resultstr) {
	return isNull(str)?defaultstr:resultstr;
}

 /**
	 * 용  도 : jqueryString ==> json변환
	 * @param    String
	 * @return    obj
	 */
	jQuery.fn.serializeObject = function(){
		var obj = null;
		try{
			if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM"){
				var arr = this.serializeArray();
				if(arr){
					obj = {};
					jQuery.each(arr, function(){
						obj[this.name] = this.value;
					});
				}
			}
		}catch(e){
			console.log(e.message);
		}
		return obj;
	}
	/**
	 * 용  도 : Ajax호출을 간단하게 호출하기 위한 function
	 * 사용예제:  sendAjax("#listForm","/pc/fndChg/test.do");//Ajax데이터 조회후 callback(data){} 함수만들어서 사용하면 됨.
	 * callbackErrFun - 에러콜백, callbackFun - callback 파라미터 추가
	 * @param    String
	 * @return    String
	 */	
	function sendAjax(formId, url, callbackErrFun, callbackFun){
		var params = JSON.stringify($(formId).serializeObject());

		$.ajax({
			type 		: 'post',
			url 		:  url ,
			data 	    : params ,
			dataType: 'json',
			contentType:'application/json; charset=utf-8',
			beforeSend	: function(){
				$("#loading").show();
				$(".loadBox").show();
			},
			complete	: function(){
				$("#loading").hide();
				$(".loadBox").hide();
			},			
			error 		: function(data) {
				if( typeof( callbackErrFun ) == "undefined"  || callbackErrFun == ""){
					alert("처리 실패하였습니다.");
				}else{
					callbackErrFun(data);
				}
			},
			success 	: function (data) {
				if( typeof( callbackFun ) == "undefined" || callbackFun == ""){
					callback(data);
				}else{
					callbackFun(data);
				}
			}
		});		
	};
	

	/**
	 * 용  도 : Ajax호출 Form없이 parameter 로 던지기
	 * 사용예제:  sendAjaxParams(params,"/pc/fndChg/test.do");
	 * var params = {
				actno : $("#actno").val(),
				bkcd : $("#bkcd").val()
	        };	
	 * @param    String
	 * @return    String
	 */	
	function sendAjaxParams(params, url, callbackErrFun, callbackFun){
		
		var paramsStr = JSON.stringify(params);
		
		$.ajax({
			type 		: 'post',
			url 		:  url ,
			data 	    : paramsStr ,
			dataType: 'json',
			contentType:'application/json; charset=utf-8',
			beforeSend	: function(){
				$("#loading").show();
				$(".loadBox").show();
			},
			complete	: function(){
				$("#loading").hide();
				$(".loadBox").hide();
			},			
			error 		: function(data) {
				if( typeof( callbackErrFun ) == "undefined"  || callbackErrFun == ""){
					alert("처리 실패하였습니다.");
				}else{
					callbackErrFun(data);
				}
			},
			success 	: function (data) {
				if( typeof( callbackFun ) == "undefined" || callbackFun == ""){
					callback(data);
				}else{
					callbackFun(data);
				}
			}
		});		
	};
	
	
// 연체구분
function getYCCDVALUE(value){
	var str = getSTATVALUE(STATE.L03, value);
	if(str == "") str = "없음";
	return str;
}

/**
 * 용  도 : 숫자만 입력가능하게 체크, 숫자 입력할때 포커스 이동시 ###,### 형태로 바꿔준다.
 * @param    String
 * @return    String
 */
function fnc_refdPrcpCheck(obj){
	var checkVal = obj.value.split(",").join("");
	if(checkVal == "" )return;
	var regExp = /^[0-9]+$/;
	if(!regExp.test(checkVal)){
		alert("숫자만 입력하세요.");
		obj.value = "";
		obj.focus();
		return;
	}
	obj.value = formatCommaStr(checkVal);
}

/**
 * 용  도 : 숫자만 입력가능하게 체크.
 * @param    String
 * @return    String
 */
function fnc_refdCheck(obj){
	var checkVal = obj.value.split(",").join("");
	if(checkVal == "" )return;
	var regExp = /^[0-9]+$/;
	if(!regExp.test(checkVal)){
		alert("숫자만 입력하세요.");
		obj.value = "";
		obj.focus();
		return;
	}
}

/**
 * 용  도 : 숫자 입력할때 포커스 이동시 ###,### 형태로 바꿔준다.
 * @param    String
 * @return    String
 */
function formatCommaStr( str ) {
    if( typeof( str ) == "string" ) str = String( Number( str ) );
	else if( typeof( str ) == "number" ) str = String( str );
	else return str;
	var money = str.replace(/,/gi,"");
	var txtNumber = '' + money ;
	if( ( money.indexOf(',') == -1 ) && ( money != '' ) ) {
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var arrNumber = txtNumber.split('.');
		arrNumber[0] += '.';
		do {
		    arrNumber[0] = arrNumber[0].replace( rxSplit, '$1,$2' );
		} while( rxSplit.test( arrNumber[0] ) );
		
		if( arrNumber.length > 1 ) {
			return (str = arrNumber.join(''));
		}else{
			return (str = arrNumber[0].split('.')[0]);
		}
    }
}

/**
* 용 도 : 가격을 USD 구분에 따라 반환해 준다. 콤마 까지 변환하여 반환한다.
* @param price  변환될가격
* @param USD  구분 Y or N
*/
function toPriceCvt( price ,  USD ) {
    if( USD == "Y" ) {
    if( typeof( price ) != "undefined" && price != "" ) {
        price = price.replaceAll( "," , "" );
        if( typeof( price ) != "number" ) {
            price = Number( price );
        }
        if( price > 100 ) {
            price = String( price );
            return formatCommaStr( price.substring( 0 , price.length - 2  ) ) + "." + price.substring( price.length - 2 );
        }else if ( price < 0 ) {
            if( price < -99 ) {
                price = String( price );
                return formatCommaStr( price.substring( 0 , price.length - 2  ) ) + "." + price.substring( price.length - 2 );
            }else {
                price = String( price ).replace( "-" , "" );
                return "-0." + ( price.length == 2 ? price : "0" + price );
            }
        }else {
            price = String( price );
            return "0." + ( price.length == 2 ? price : "0" + price );
        }
        /**
        price = String( parseFloat( price ) / 100 );
        var index = price.indexOf( "." );
        if( index != -1 ) {
            var temp = formatCommaStr( price.substring( 0 , index ) );
            return temp + price.substring( index );
        }else {
            return     formatCommaStr( price ) + ".00";
        }
        */
    }else {
        return "";
    }
}else {
    if( typeof( price ) != "undefined" && price != "" ) {
        return formatCommaStr( ( typeof( price ) == "number" ? String( price ) : price.replaceAll( "," , "" ) ) );
    }else {
        return "";
        }
    }
}

/**
 * 용   도 : 수납가능한 은행인지 확인한다.
 * 사용예 : CheckAccptBank( bkcd )
 * @param bkcd 은행코드
 */
 function CheckAccptBank(bkcd) {
     //수납가능한 은행인지 아닌지 체크한다.
 //유효은행 맵핑한다.
 /*if ("006" == (bkcd)) bkcd = "004"; // 국민(한국주택)   ->  국민
 if ("009" == (bkcd)) bkcd = "004"; // 국민(장기신용)   ->  국민
 if ("010" == (bkcd)) bkcd = "011"; // 농협             ->  농협
 if ("013" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
 if ("014" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
 if ("015" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
 if ("016" == (bkcd)) bkcd = "012"; // 농협중앙회       ->  단위농협
 if ("017" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
 if ("019" == (bkcd)) bkcd = "004"; // 국민(대동)       ->  국민
 if ("021" == (bkcd)) bkcd = "088"; // 신한(조흥)       ->  신한
 if ("022" == (bkcd)) bkcd = "020"; // 우리(상업)       ->  우리
 if ("024" == (bkcd)) bkcd = "020"; // 우리(한일)       ->  우리
 if ("025" == (bkcd)) bkcd = "081"; // 하나(서울)       ->  하나
 if ("026" == (bkcd)) bkcd = "088"; // 신한(구)         ->  신한
 if ("028" == (bkcd)) bkcd = "088"; // 신한(동화)       ->  신한
 if ("029" == (bkcd)) bkcd = "004"; // 국민(동남)       ->  국민
 if ("030" == (bkcd)) bkcd = "004"; // 국민(대동)       ->  국민
 if ("033" == (bkcd)) bkcd = "081"; // 하나(충청)       ->  하나
 if ("036" == (bkcd)) bkcd = "027"; // 한국씨티(경기)   ->  한국씨티
 if ("038" == (bkcd)) bkcd = "088"; // 신한(강원)       ->  신한
 if ("040" == (bkcd)) bkcd = "088"; // 신한(충북)       ->  신한
 if ("072" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
 if ("073" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
 if ("074" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
 if ("075" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
 if ("082" == (bkcd)) bkcd = "081"; // 하나(보람)       ->  하나
 if ("083" == (bkcd)) bkcd = "020"; // 우리(평화)       ->  우리
 if ("084" == (bkcd)) bkcd = "020"; // 우리             ->  우리
 if ("012" == (bkcd)) bkcd = "011"; // 단위농협         ->  농협
 if ("053" == (bkcd)) bkcd = "027"; // 씨티은행         ->  씨티은행
 */

 bkcd = ConvertBankCD(bkcd); //은행코드 변환
 var CHKBANK = "003,004,005,006,009,011,012,016,019,020,021,022,023,024,025,026,027,028,029,030,031,032,033,034,036,037,038,039,040,053,071,081,082,083,084,088,045";

     if(CHKBANK.indexOf(bkcd) > -1) return true;
     else return false;
 }
 
 function removeComma(obj){
	 return obj.split(",").join("")
 }

 function ConvertBankCD(bkcd) {
        //수납가능한 은행인지 아닌지 체크한다.
    //유효은행 맵핑한다.
    if ("006" == (bkcd)) bkcd = "004"; // 국민(한국주택)   ->  국민
    if ("009" == (bkcd)) bkcd = "004"; // 국민(장기신용)   ->  국민
    if ("010" == (bkcd)) bkcd = "011"; // 농협             ->  농협
    if ("013" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
    if ("014" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
    if ("015" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
    if ("016" == (bkcd)) bkcd = "012"; // 농협중앙회       ->  단위농협
    if ("017" == (bkcd)) bkcd = "012"; // 단위농협         ->  단위농협
    if ("019" == (bkcd)) bkcd = "004"; // 국민(대동)       ->  국민
    if ("021" == (bkcd)) bkcd = "088"; // 신한(조흥)       ->  신한
    if ("022" == (bkcd)) bkcd = "020"; // 우리(상업)       ->  우리
    if ("024" == (bkcd)) bkcd = "020"; // 우리(한일)       ->  우리
    if ("025" == (bkcd)) bkcd = "081"; // 하나(서울)       ->  하나
    if ("026" == (bkcd)) bkcd = "088"; // 신한(구)         ->  신한
    if ("028" == (bkcd)) bkcd = "088"; // 신한(동화)       ->  신한
    if ("029" == (bkcd)) bkcd = "004"; // 국민(동남)       ->  국민
    if ("030" == (bkcd)) bkcd = "004"; // 국민(대동)       ->  국민
    if ("033" == (bkcd)) bkcd = "081"; // 하나(충청)       ->  하나
    if ("036" == (bkcd)) bkcd = "027"; // 한국씨티(경기)   ->  한국씨티
    if ("038" == (bkcd)) bkcd = "088"; // 신한(강원)       ->  신한
    if ("040" == (bkcd)) bkcd = "088"; // 신한(충북)       ->  신한
    if ("072" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
    if ("073" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
    if ("074" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
    if ("075" == (bkcd)) bkcd = "071"; // 우체국           ->  우체국
    if ("082" == (bkcd)) bkcd = "081"; // 하나(보람)       ->  하나
    if ("083" == (bkcd)) bkcd = "020"; // 우리(평화)       ->  우리
    if ("084" == (bkcd)) bkcd = "020"; // 우리             ->  우리
   // if ("012" == (bkcd)) bkcd = "011"; // 단위농협         ->  농협
   // if ("053" == (bkcd)) bkcd = "027"; // 씨티은행         ->  씨티은행
    return bkcd;
}		  
 
 /**
  * 용   도 : 주민번호 입력시 구분자를 자동으로 생성시킴
  * 사용예 : onKeyup="formatJumin( this )"
  * @param obj(text field)
  * @param div(구분자)
  */
  function formatJumin( obj , div ){
      var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
      div = ( div == null || div == "" ) ? "-" : div;
      var s = ( obj.value ).replace( /-|\//g , "" );
      var l = s.length;
      if( l > 13 ) s = s.substr( 0 , 13 );
      if( l < 6 ) {
          return false;
      }
      if( l == 6 ) {
          if( ! ( keyCode ==8 || keyCode==46 ) ) {
              s = s + div;
          }
          obj.value = s;
          return true;
      }else if( l >= 7 ) {
          s = s.substr( 0 , 6 ) + div + s.substr( 6 , l-1 );
          obj.value = s;
          return true;
      }else return false;
  }


  function ConvertBankNM(bkcd, bknm) {
      //수납가능한 은행인지 아닌지 체크한다.
  //유효은행 맵핑한다.

  if ("006" == (bkcd)) bknm= "국민은행"; // 국민(한국주택)   ->  국민
  if ("009" == (bkcd)) bknm= "국민은행"; // 국민(장기신용)   ->  국민
  if ("010" == (bkcd)) bknm= "농협"; // 농협             ->  농협
  if ("013" == (bkcd)) bknm= "단위농협"; // 단위농협         ->  단위농협
  if ("014" == (bkcd)) bknm= "단위농협"; // 단위농협         ->  단위농협
  if ("015" == (bkcd)) bknm= "단위농협"; // 단위농협         ->  단위농협
  if ("016" == (bkcd)) bknm= "단위농협"; // 농협중앙회       ->  단위농협
  if ("017" == (bkcd)) bknm= "단위농협"; // 단위농협         ->  단위농협
  if ("019" == (bkcd)) bknm= "국민은행"; // 국민(대동)       ->  국민
  if ("021" == (bkcd)) bknm= "신한은행"; // 신한(조흥)       ->  신한
  if ("022" == (bkcd)) bknm= "우리은행"; // 우리(상업)       ->  우리
  if ("024" == (bkcd)) bknm= "우리은행"; // 우리(한일)       ->  우리
  if ("025" == (bkcd)) bknm= "하나은행"; // 하나(서울)       ->  하나
  if ("026" == (bkcd)) bknm= "신한은행"; // 신한(구)         ->  신한
  if ("028" == (bkcd)) bknm= "신한은행"; // 신한(동화)       ->  신한
  if ("029" == (bkcd)) bknm= "국민은행"; // 국민(동남)       ->  국민
  if ("030" == (bkcd)) bknm= "국민은행"; // 국민(대동)       ->  국민
  if ("033" == (bkcd)) bknm= "하나은행"; // 하나(충청)       ->  하나
  if ("036" == (bkcd)) bknm= "한국씨티"; // 한국씨티(경기)   ->  한국씨티
  if ("038" == (bkcd)) bknm= "신한은행"; // 신한(강원)       ->  신한
  if ("040" == (bkcd)) bknm= "신한은행"; // 신한(충북)       ->  신한
  if ("072" == (bkcd)) bknm= "우체국"; // 우체국           ->  우체국
  if ("073" == (bkcd)) bknm= "우체국"; // 우체국           ->  우체국
  if ("074" == (bkcd)) bknm= "우체국"; // 우체국           ->  우체국
  if ("075" == (bkcd)) bknm= "우체국"; // 우체국           ->  우체국
  if ("082" == (bkcd)) bknm= "하나은행"; // 하나(보람)       ->  하나
  if ("083" == (bkcd)) bknm= "우리은행"; // 우리(평화)       ->  우리
  if ("084" == (bkcd)) bknm= "우리은행"; // 우리             ->  우리
  //if ("012" == (bkcd)) bknm= "단위농협"; // 단위농협         ->  농협
  //if ("053" == (bkcd)) bknm= "씨티은행"; // 씨티은행         ->  씨티은행
      return bknm;
  }

  /**
  * 용   도 : BYTE로 문자길이를 자른다.
  * 사용예 : strByte( str, 10 )
  * @param str 원본
  * @param len 자를 길이
  */
  function strByte(str,len) {

	  var l = 0;
	  for (var i=0; i < str.length; i++) {
	      l += (str.charCodeAt(i) > 128) ? 2 : 1;
	          if (l > len) return str.substring(0,i) + ".." ;
	  }

	  return str;
  }


  function onblurJumin( obj ) {
      var s = ( obj.value ).replace( /-|\//g , "" );
  if( s == "" ) return;
  if(s.length == 13 ) {
      if( !isJuminNo( s.substring(0,6) , s.substring(6,13) ) ) {
          alert("주민번호가 유효 하지 않습니다.\n확인후 다시 입력해주세요.");
          obj.focus();
          return;
      }
  }else {
      alert("주민번호가 유효 하지 않습니다.\n확인후 다시 입력해주세요.");
          obj.focus();
          return;
      }
  }

  /**
  * 용   도 : 날짜 입력시 구분자를 자동으로 생성시킴
  * 사용예 : onKeyup="formatDate( this )"
  * @param obj(text field)
  * @param div(구분자)
  */
  function formatDate( obj , div ){
      var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
      div = ( div == null || div == "" ) ? "-" : div;
      var s = ( obj.value ).replace( /-|\//g , "" );
      var l = s.length;
      if( l > 8 ) s = s.substr( 0 , 8 );
      if( l < 4 ) {
          return false;
      }
      if( l == 4 ) {
          if( ! ( keyCode ==8 || keyCode==46 ) ) {
              s = s + div ;
          }
          obj.value = s;
          return true;
      }else if( l >= 5 && l < 6 ) {
          s = s.substr(0,4) + div + s.substr( 4 , l-1 );
          obj.value = s;
          return true;
      }else if( l >= 7 ) {
          s = s.substr( 0 , 4 ) + div + s.substr( 4 , 2 ) + div + s.substr( 6 , l-1 );
          obj.value = s;
          return true;
      }else return false;
  }

  /**
  * 용   도 : ########형 타입의 스트링을 구분자로 파싱한다.
  * 사용예 : ####/##/## 형태로 반환.
  * @param str
  * @param div(구분자)
  */
  function formatDateStr( str , div ){
      if( typeof( str ) != "undefined" && str != "" ) {
      if(
          "00000000" == str ||
          "000000" == str ||
          "99999999" == str ||
          "999999" == str
      ) {
          return "";
      }
      div = ( div == null || div == "" ) ? "-" : div;
      var s = str.replace( /-|\//g , "" );
      var l = s.length;
      if( l < 6 ) return str;
      if( l > 8 ) s = s.substr( 0 , 8 );
      if( l == 6 ) {
          s = s.substr( 0 , 4 ) + ( div == "KO" ? "년 " : div ) + ( div == "KO" ? Number( s.substr( 4 , 2 ) ) + "월" : s.substr( 4 , 2 ) );
      }else {
          s = s.substr( 0 , 4 ) + ( div == "KO" ? "년 " : div ) + ( div == "KO" ? Number( s.substr( 4 , 2 ) ) : s.substr( 4 , 2 ) ) + ( div == "KO" ? "월 " : div ) + ( div == "KO" ? Number( s.substr( 6 , 2 ) ) + "일" : s.substr( 6 , 2 ) );
      }
      return s;
  }else {
      return "";
      }
  }

  /**
  * 용   도 : 날짜 입력후 포커스 이동시 날짜 유효성 검사
  * 사용예 : onblur="onblurDate( this )"
  * @param obj(text field)
  */
  function onblurDate( obj ) {
      var s = ( obj.value ).replace( /-|\//g , "" );
  if( s == "" ) return;
  if(s.length == 8 ) {
      if( !_isDay( s.substring(0,4) , s.substring(4,6) , s.substring(6,8) ) ) {
          alert("날짜가 유효 하지 않습니다.\n확인후 다시 입력해주세요.");
          obj.value = "";
          obj.focus();
          return;
      }
  }else {
      alert("날짜 형식이 유효 하지 않습니다.\n확인후 다시 입력해주세요.");
      	  obj.value = "";
          obj.focus();
          return;
      }
  }
  /**
	 * 용   도 : 유효한(존재하는) 일(日)인지 체크
	 * @param yyyy 연
	 * @param mm 월
	 * @param dd 일
	 * @return boolean
	 */
	function _isDay( yyyy , mm , dd ) {
	    var m 	= parseInt( mm , 10 ) - 1;
	    var d 	= parseInt( dd , 10 );
	    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	    if ( ( yyyy % 4 == 0 && yyyy % 100 != 0 ) || yyyy % 400 == 0 ) {
	        end[1] = 29;
	    }
	    return ( d >= 1 && d <= end[m] );
	}
  /**
  * 용  도 : 숫자 입력할때 ###,### 형태로 바꿔준다.
  * @param    object
  * @return
  */
  function formatComma( obj ) {
      var money = obj.value.replace(/,/gi,"");
  var txtNumber = '' + money ;
  if( ( money.indexOf(',') == -1 ) && ( money != '' ) ) {
      var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
      var arrNumber = txtNumber.split('.');
      arrNumber[0] += '.';
      do {
          arrNumber[0] = arrNumber[0].replace( rxSplit, '$1,$2' );
      } while( rxSplit.test( arrNumber[0] ) );
      if( arrNumber.length > 1 ) obj.value = arrNumber.join('');
      else obj.value = arrNumber[0].split('.')[0];
      }
  }

 function toSpacetrim( str ) {
      if( str == null && str == "" ) return str;
      str = str.trim();
      var temp = "";
      for( var i = 0 ; i < str.length ; i++ ) {
    	  if( str.charAt( i ).trim() != "" ) {
              temp += str.charAt( i );
          }
      }
      return temp;
  }

  /**
  * 용   도 : 허용된 글자수 입력 후 자동으로 다음 필드로 이동한다.
  * 사용예 : onKeyup="moveTab( this , 8 , self.$('next') )"
  * @param f_jmin 현재필드
  * @param leng 허용글자수
  * @param dest(이동될 필드)
  * @param div(구분자)
  */
  function moveTab( f_jmin , leng ,  dest ) {
      var obj = f_jmin.value;
      var len = leng;
      var destination = dest;
      var l = f_jmin.value.length;
      if( eval(l) == len ) {
          destination.focus();
      }
  }

  /**
  * 용   도 : 입력받은 값이 null 인지 체크한다.
  * @param obj
  * @return boolean
  */
  function isNull( obj ) {
      if(obj == null || obj == "") {
          return true;
      }
      return false;
  }
  
  /**
   * obj가 Null 일때 '0' 으로 치환 
   * @param obj
   * @returns {obj}
   */
  function nullToZero(obj){
  	if(obj == null || obj == "") {
      return "0";
      }
      return obj;
  }
  
  /**
   * 값이 없는 전문을 받았을 때 
   * 테이블 디자인이 깨지는 것을 방지하기 위해서
   * &nbsp를 넣어준다.
   * @param obj
   * @returns {Boolean}
   */
  function putNbsp(obj){
  	if(obj == null || obj == "") {
      return "&nbsp;";
      }
      return obj;
  }
  
  function putNothing(obj){
  	if(obj == null || obj == "") {
      return "해당사항 없음";
      }
      return obj;
  }
  
  /**
  * 용   도 : 입력받은 값에 공백이 존재할경우 공백을 제거한다.
  * @param obj
  * @return
  */
  /**
  function trim( obj ) {
      if( isNull( obj ) ) {
          return "";
      }
      var str = "";
      for(var i = 0 ; i < obj.length ; i ++) {
          ch = obj.charAt(i);
          if(ch != " ")
              str = str + ch;
      }
      return str;
  }
  */

  /**
  * 용   도 : 입력받은 값의 길이를 리턴한다.
  *              한글 2Byte 한글이외 1Byte
  * @param obj
  * @return
  */
  function getByteLength( obj ) {
      var byteLength = 0;
      for( var inx = 0 ; inx < obj.length ; inx++ ) {
          var oneChar = escape( obj.charAt( inx ) );
          if( oneChar.length == 1 ) {
              byteLength ++;
          }else if( oneChar.indexOf("%u") != -1 ) {
          byteLength += 2;
      }else if( oneChar.indexOf( "%" ) != -1 ) {
              byteLength += oneChar.length/3;
          }
      }
      return byteLength;
  }

  /**
  * 용   도 : 입력받은 값이 숫자인지 체크한다.
  * @param obj
  * @return boolean
  */
  function isNumber(obj) {
      var reg = new RegExp("[0-9]");
      for( var i = 0 ; i < obj.length ; i++ ) {
          if( !reg.test( obj.charAt( i ) ) ) {
              return false;
          }
      }
      return true;
  }

  /**
  * 용   도 : 입력받은 값이 영문인지 체크한다.
  * @param obj
  * @return boolean
  */
  function isAlpha(obj) {
      var reg = new RegExp("[A-Za-z]");
      alert(obj.value.length);
      for( var i = 0 ; i < obj.length ; i++ ) {
    	  alert(obj.length);
          if( !reg.test( obj.charAt( i ) ) ) {
              return false;
          }
      }
      return true;
  }

  /**
  * 용   도 : 입력받은 값이 대문자인지 체크한다.
  * @param obj
  * @return boolean
  */
  function isUpperCase(obj) {
      var reg = new RegExp("[A-Z]");
      for( var i = 0 ; i < obj.length ; i++ ) {
          if( !reg.test( obj.charAt( i ) ) ) {
              return false;
          }
      }
      return true;
  }

  /**
  * 용   도 : 입력받은 값이 소문자인지 체크한다.
  * @param obj
  * @return boolean
  */
  function isLowerCase(obj) {
      var reg = new RegExp("[a-z]");
      for( var i = 0 ; i < obj.length ; i++ ) {
          if( !reg.test( obj.charAt( i ) ) ) {
              return false;
          }
      }
      return true;
  }

/**
  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lower = "abcdefghijklmnopqrstuvwxyz";
*/
  /**
  * 용   도 : 입력받은 값을 대문자로 치환한다.
  * @param obj
  * @return
  */
/**
  function toUpperCase( obj ) {
      var retValue = "";
      for(var i = 0 ; i < obj.length ; i++) {
          char = obj.charAt(i);
          index = lower.indexOf(char);
          if(index != -1) {
              retValue = retValue + upper.substring(index , index+1);
          }else {
              retValue = retValue + char;
          }
      }
      return retValue;
  }
*/
  /**
  * 용   도 : 입력받은 값을 소문자로 치환한다.
  * @param obj
  * @return
  */
/**
  function toLowerCase(obj) {
      var retValue = "";
      for(var i = 0 ; i < obj.length ; i++) {
          char = obj.charAt(i);
          index = upper.indexOf(char);
          if(index != -1) {
              retValue = retValue + lower.substring(index , index+1);
          }else {
              retValue = retValue + char;
          }
      }
      return retValue;
  }
*/
  
/*
  //document.onkeypress = chkConstraint;
  function chkConstraint( filter ) {
      if (document.all) {
          var src = window.event.srcElement;
          var key = String.fromCharCode (event.keyCode);
          if (src.getAttribute ("FILTER")) {
              var filter = src.getAttribute ("FILTER").toUpperCase();
              var pattern;
              switch (filter) {
                  case "INT" :
                      pattern = "[0-9]";
                      break;
                  case "FLOAT" :
                      pattern = "[0-9.]";
                      break;
                  case "ALPHA" :
                      pattern = "[A-Za-z]";
                      break;
                  case "ALPHANUM" :
                      pattern = "[A-Za-z0-9]";
                      break;
              }
              var reg = new RegExp (pattern);
              if (key != "\r" && !reg.test (key)) event.returnValue = false;
          }
      }
  }
*/

  function chkConstraint( filter ) {
      if (document.all) {
          var key = String.fromCharCode (event.keyCode);
          var filter = filter.toUpperCase();
          var pattern;
          switch (filter) {
              case "INT" :
              pattern = "[0-9]";
              break;
          case "FLOAT" :
              pattern = "[0-9.]";
              break;
          case "ALPHA" :
              pattern = "[A-Za-z]";
              break;
          case "ALPHANUM" :
              pattern = "[A-Za-z0-9]";
              break;
      }
      var reg = new RegExp (pattern);
      if (key != "\r" && !reg.test (key)) event.returnValue = false;
      }
  }

  /**
  * 용 도 : 숫자 입력 필드에 첫자리 '0'을 입력하지 못하게 한다.
  * 사용예 : onKeyup="startZero( this )"
  * @param obj 필드오브젝트
  */
  function startZero( obj ) {
      if( obj.value.charAt( 0 ) == "0" || obj.value.charAt( 0 ) == ","  ) {
      obj.value = "";
      }else {
          obj.value = obj.value;
      }
  }

  var customerWindow = null;
  var zipCodeWindow = null;
  var infoChangeWindow = null;

  /**
  * 용   도 : 팝업창을 윈조우 중앙에 오픈한다.
  * @param vURL 팝업창 url
  * @param winName 팝업창이름
  * @param Width 팝업창 가로사이즈
  * @param Height 팝업창 세로사이즈
  * @param scroll 스크롤 yes or no
  */
  function openWin( vURL , winName , Width , Height , scroll ) {
	  if(scroll == "") {
	      scroll = "yes";
	  }
	  var iMyWidth = (window.screen.width/2)-(Width/2 + 10);
	  var iMyHeight = (window.screen.height/2)- (Height/2 + 50);
	  
	  /*
	  if( winName == "CustomerChange" ) {
	      customerWindow = window.open(vURL, winName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight );
	      customerWindow.focus();
	  }else if( winName == "zipCodeCheck" ) {
	      zipCodeWindow = window.open(vURL, winName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight );
	      zipCodeWindow.focus();
	  }else if( winName == "infoChange" ) {
	      infoChangeWindow = window.open(vURL, winName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight );
	      infoChangeWindow.focus();
	  }else if(winName == "POPUP_NOTICE"){
	  	popNoticeWindow = window.open(vURL, winName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + 0 + ",top=" + 0 );
	  	popNoticeWindow.focus();    
	  }else {
	      winObj = window.open(vURL, winName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight );
          winObj.focus();
      }
      */
	  
	  var url = vURL;
	  var optionVal = "toolbar=no,location=no,directories=no,status=no,menubar=no";

	  if( winName == "CustomerChange" ) {
		  optionVal += ",scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight;
	  }else if( winName == "zipCodeCheck" ) {
		  optionVal += ",scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight;
	  }else if( winName == "infoChange" ) {
		  optionVal += ",scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight;
	  }else if(winName == "POPUP_NOTICE"){
		  optionVal += ",scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + 0 + ",top=" + 0;
	  }else {
		  optionVal += ",scrollbars=" + scroll + ",resizable=no,width=" + Width + ",height=" + Height+ ", left=" + iMyWidth + ",top=" + iMyHeight;
      }
	  
	  //popOpenWin( url, optionVal, "Y", "" );
	  popOpenWin( url, optionVal, "Y");
  }

  /**
  * 용   도 : 모달아이얼로그를 오픈한다.
  * @param vURL 팝업창 url
  * @param Width 팝업창 가로사이즈
  * @param Height 팝업창 세로사이즈
  * @param scroll 스크롤 yes or no
  */
  function showModal(vURL , Width , Height , scroll) {
      if(scroll == "") {
      scroll = "yes";
  }
  window.showModalDialog(vURL, "", "dialogWidth:" + Width + "px;dialogHeight:" + Height + "px;status=no;resizable=no;scroll=" + scroll + ";center:yes;help=no");
  }

  String.prototype.trim = function(){
      return this.replace(/(^\s*)|(\s*$)/gi, "");
  }

  String.prototype.replaceAll = function(str1, str2) {
      var temp_str = "";
  if (this.trim() != "" && str1 != str2) {
          temp_str = this.trim();
          while (temp_str.indexOf(str1) > -1){
              temp_str = temp_str.replace(str1, str2);
          }
      }
      return temp_str;
  }

  /**
  * 용도 : 입력받은 시간 동안  수행을 정지 한다.
  * 사용법 : pause(1000);
  */
  function pause(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
              return;
      }
  }

  /**
   * 용   도 : 이메일 유효성 체크를 한다.
   * @param obj
   * @return boolean
   */
   function isEmail( obj ) {
       if( obj == "" ) {
        alert("메일주소를 입력해주세요.");
        return false;
 	  }
       

      var reg1str = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
  	 var reg2str = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";
  	 var reg3 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  	 var reg1 = new RegExp (reg1str);
  	 var reg2 = new RegExp (reg2str);
  	 if (reg1.test(obj) || !reg2.test(obj)|| !obj.match(reg3)){
  		alert("잘못된 이메일 형식입니다!");
  		return false;
  	 }
      	 
      	 
 	  if( obj.indexOf( "@" ) < 1 ){
 	      alert( "잘못된 이메일 형식입니다!");
 	      return false;
 	  }
 	
 	  for( var j = 0 ; j < obj.length ; j++ ) {
 	      if ( obj.charCodeAt( j ) > 127 ) {
 	          alert( "잘못된 이메일 형식입니다!");
 	          return false;
 	      }
 	  }
 	
 	  var checkdomain = obj.substr(obj.indexOf("@") + 1);
 	
 	  if ( checkdomain =="netian.com" || checkdomain =="sayclub.com" || checkdomain =="sayclub.com"){
 	      alert("네띠앙/세이클럽/오르지오메일은  더 이상 사용하실 수 없습니다.");
 	      return false;
 	  }
 	
 	
 	  if(
 	      ( obj.indexOf( ".com" ) < 5 ) &&
 	      ( obj.indexOf( ".org" ) < 5 ) &&
 	      ( obj.indexOf( ".gov" ) < 5 ) &&
 	      ( obj.indexOf( ".net" ) < 5 ) &&
 	      ( obj.indexOf( ".mil" ) < 5 ) &&
 	      ( obj.indexOf( ".edu" ) < 5 ) &&
 	      ( obj.indexOf( ".kr" ) < 4 ) &&
 	      ( obj.indexOf( ".st" ) < 4 ) &&
 	      ( obj.indexOf( ".tv" ) < 4 ) &&
 	      ( obj.indexOf( ".ro" ) < 4 ) &&
 	      ( obj.indexOf( ".arpa" ) < 6 ) &&
 	      ( obj.indexOf( ".biz" ) < 5 ) &&
 	      ( obj.indexOf( ".aero" ) < 6 ) &&
 	      ( obj.indexOf( ".name" ) < 6 ) &&
 	      ( obj.indexOf( ".coop" ) < 6 ) &&
 	      ( obj.indexOf( ".info" ) < 6 ) &&
 	      ( obj.indexOf( ".pro" ) < 5 ) &&
 	      ( obj.indexOf( ".museum" ) < 7 )
 	  ) {
       alert( "잘못된 이메일 형식입니다!");
           return false;
       }
       return true;
   }

  /**
  * 용   도 : 만나이구하기
  * @param    ssn    주민번호
  * @return         만나이
  */
  function getCurrAge( ssn ) {
      var today = new Date();
      var YY = today.getYear();
      var MM = today.getMonth()+1;
      var DD = today.getDate();

      var curryear     = YY;
      if ( ssn.length < 13 ) return "";
  if ( ssn == 0 ) return "";
  var tyear = "";
  ssn = ssn.replace('-','');
  var tmonth = ssn.substring(2,4);
  var tday = ssn.substring(4,6);
  var min = 0;
  if ( parseInt(MM) < parseInt(tmonth) ) { min = 1;
  }else if ( parseInt(MM) == parseInt(tmonth) ){
      if ( parseInt(DD) < parseInt(tday) ){ min = 1; }
  }
  if ( ssn == "0000000000000"  ) return 0;
  if ((ssn.charAt(6) == "3") || (ssn.charAt(6) == "4")){ tyear = 2000;
  }else if ((ssn.charAt(6) == "5") || (ssn.charAt(6) == "6")){ tyear = 1900;
  }else if ((ssn.charAt(6) == "7") || (ssn.charAt(6) == "8")){ tyear = 2000;
  }else if ((ssn.charAt(6) == "9") || (ssn.charAt(6) == "0")){ tyear = 1800;
      }else{ tyear = 1900; }
      var currage = parseInt(curryear - ( tyear + parseInt( ssn.substring(0,2) ) )) - min ;
      return currage;
  }

  /*
  * 용    도 : 문자 필드 지정 포맷에 따라 -:/()를 넣어준다.
  * 사 용 예 : onBlur="stringFormat(this,'###-###');"
  * @param 해당 input box
  * @param format
  */
  function stringFormat(form,format) {

      var dash             = new Array();        // '-'
  var slash         = new Array();        // '/'
  var dot             = new Array();        // ':'
  var Rbrackets     = new Array();      // '('
  var Lbrackets     = new Array();      // ')'

  var k = 0;
  var values = form.value;
  var sign = '';

  if( values.charAt(0) == '-' || values.charAt(0) == '+' ){
      sign = values.charAt(0);
      values = values.substring(1);
  }
  for( var i = 0 ; i < format.length ; i++ ) {
      switch(format.charAt(i)){
          case  '-':
              dash[k] = i;
              break;
          case '/':
              slash[k] = i;
              break;
          case ':':
              dot[k] = i;
              break;
          case '(':
              Rbrackets[k] = i;
              break;
          case ')':
              Lbrackets[k] = i;
              break;
      }
      k++;
  }
  k = 0;
  var rxSplit = new RegExp('([\(\),/:-])');
  if( values != '' && !rxSplit.test( values ) ) {
      for( var i = 0 ; i < form.value.length ; i++) {
          switch(i){
              case dash[k]:
                  values =  values.substring(0,i)+'-'+values.substring(i);
                  break;
              case slash[k]:
                  values =  values.substring(0,i)+'/'+values.substring(i);
                  break;
              case dot[k]:
                  values =  values.substring(0,i)+':'+values.substring(i);
                  break;
              case Rbrackets[k]:
                  values =  values.substring(0,i)+'('+values.substring(i);
                  break;
              case Lbrackets[k]:
                  values =  values.substring(0,i)+')'+values.substring(i);
                      break;
              }
              k++;
          }
          form.value = sign + values;
      }
  }

  /**
  * 용 도 : 사업자등록번호 체크.
  * @param    xxxYYzzzzz
  * @return     boolean
  */
  function isCompanyNo(vencod) {
      if( vencod.length != 10 ) return false;
      var sum = 0;
      var getlist =new Array(10);
      var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
      for(var i=0; i<10; i++) { getlist[i] = vencod.substring(i, i+1); }
      for(var i=0; i<9; i++) { sum += getlist[i]*chkvalue[i]; }
      sum = sum + parseInt((getlist[8]*5)/10);
      var sidliy = sum % 10;
      var sidchk = 0;
      if(sidliy != 0) { sidchk = 10 - sidliy; }
      else { sidchk = 0; }
      if(sidchk != getlist[9]) { return false; }
      return true;
  }

  /**
   * 사업자번호 유효성 검증
   * @param 
   * @returns {Boolean}
   */
  function isPermitNoVerification( obj1, obj2, obj3 ) {
      
  	if(
          ( obj1.value == "" || obj1.value.length != 3 ) ||
          ( obj2.value == "" || obj2.value.length != 2 ) ||
          ( obj3.value == "" || obj3.value.length != 5 )
      ) {
          alert( "사업자번호를 모두 입력하세요!");
          if( obj1.value == "" || obj1.value.length != 3 ) {
          	obj1.focus();
          }else if( obj2.value == "" || obj2.value.length != 2 ) {
          	obj2.focus();
          }else if( obj3.value == "" || obj3.value.length != 5 ) {
          	obj3.focus();
          }
          return false;
      }
  	
      return true;
  }
  
  /**
  * 용 도 : 주민등록번호 체크.
  * @param    jumin1
  * @param    jumin2
  * @return     boolean
  */
  function isJuminNo(s1, s2) {
      if( s1.length != 6 || s2.length != 7 ) return false;
      var n = 2;
      sum = 0;
      for (var i=0; i<s1.length; i++){
    	  sum += parseInt(s1.substr(i, 1)) * n++;
      }
      for (var i=0; i<s2.length-1; i++) {
      sum += parseInt(s2.substr(i, 1)) * n++;
      if (n == 10) n = 2;
      }
      var c = 11 - sum % 11;
      if (c == 11) c = 1;
      if (c == 10) c = 0;
      if (c != parseInt(s2.substr(6, 1))) return false;
      else return true;
  }

  /**
  * 용 도 : 쿠키를 설정한다.
  * @param    name 쿠키명
  * @param    value 쿠키값
  * @param    expiredays 쿠키 요효일
  */
  function setCookie( name , value , expiredays ) {
      var todayDate = new Date();
      todayDate.setDate( todayDate.getDate() + expiredays );
      document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
  }

  /**
  * 용 도 : 쿠키를 삭제한다.
  * @param    name 쿠키명
  * @param    value 쿠키값
  * @param    expiredays 쿠키 요효일
  */
  function clearCookie( name ) {
      setCookie( name , "" , -1 );
  }

  /**
  * 용 도 : 쿠키를 읽는다
  * @param    name 쿠키명
  * @return         쿠키값
  */
  function getCookie( name ){
      var nameOfCookie = name + "=";
  var x = 0;
  while ( x <= document.cookie.length )    {
      var y = (x+nameOfCookie.length);
      if ( document.cookie.substring( x, y ) == nameOfCookie ) {
    	  var endOfCookie;
          if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
              endOfCookie = document.cookie.length;
          return unescape( document.cookie.substring( y, endOfCookie ) );
      }
      x = document.cookie.indexOf( " ", x ) + 1;
      if ( x == 0 )
          break;
  }
  return "";
  }

  /**
  * 용 도 : get으로 넘어 오는 QueryString 을 Object에 Key 와 Value 로 저장하여 반환한다.
  * @return     Object
  */
  function getQueryArguments() {
      var args = new Object();
      var query = location.search.substring( 1 );
      var pairs = query.split( "&" );
  for( var i = 0 ; i < pairs.length ; i++ )  {
      var pos = pairs[i].indexOf( "=" );
          if ( pos == -1 ) continue;
          var argname = pairs[i].substring( 0 , pos );
          var value = pairs[i].substring( pos + 1 );
          args[argname] = unescape( value );
      }
      return args;
  }



  var METHOD_CLONE = "clone";

  /**
  * Hashtable : tableau associatif
  */
  var Hashtable = function() {

      this.container = new Object();

      /**
  * Rajoute une valeur pour la clef
  */
  this.put = function( key , value ) {
      this.container[ key ] = value;
  }

  /**
  * Retourne la valeur pour la clef
  */
  this.get = function( key ) {
      return this.container[ key ];
  }

  this.remove = function( key ) {
      var temp = new Object();
      for (var slot in this.container) {
          if( slot != key ) {
              temp[ slot ] = this.get( slot );
          }
      }
      this.container = temp;
  }

  /**
  * Retourne la taille de la hashtable
  */
  this.size = function() {
      var i = 0;
      for ( var slot in this.container )
          if ( slot != METHOD_CLONE )
              i++;
      return i;
  }

  this.length = this.size;

  /**
  * Teste la pr?ence d'une clef dans la hashtable
  */
  this.containsKey = function( key ) {
      return this.container.hasOwnProperty( key );
  }

  /**
  * Teste la pr?ence d'une valeur dans la hashtable
  */
  this.containsValue = function( value ) {
      for (var slot in this.container)
          if ( slot != METHOD_CLONE && this.container[ slot ] == value )
              return true;
      return false;
  }

  /**
  * Teste la pr?ence d'un couple clef valeur dans la hashtable
  */
  this.contains = function( key , value ) {
      return this.container[ key ] == value;
  }

  /**
  * Retourne un tableau des clefs
  */
  this.getKeys = function() {
      var keys = new Array();
      for ( var slot in this.container )
          if ( slot != METHOD_CLONE )
              keys.push( slot );
      return keys;
  }

  /**
  * Retourne un tableau des valeurs
  */
  this.getValues = function() {
      var values = new Array();
      for ( var slot in this.container )
          if ( slot != METHOD_CLONE )
              values.push( this.container[ slot ] );
      return values;
  }

  /**
  * Appelle une fonction pour chaque
  * paire de clef/valeur
  */
      this.each = function( functor ) {
          for ( var slot in this.container ) {
              if ( slot != METHOD_CLONE ) {
                  functor( slot , this.container[slot] );
              }
          }
      }


  }

  /**
  * 용도 : Java 의 Vector Class 를 흉내낸 데이터 Object
  */
  var Vector = function() {

      this.elementData = new Array();

      /*
	  * 용도 : 배열 사이즈를 리턴한다.
	  * @return integer 배열사이즈
	  */
	  this.size = function() {
	      return this.elementData.length;
	  }
	
	  /*
	  * 용도 : 배열에 들어 있는 데이터를 정렬한다.
	  */
	  this.sort = function() {
	      this.elementData.sort();
	  }
	
	  /*
	  * 용도 : 데이터를 삽입한다.
	  * @param object
	  */
	  this.add = function( obj ) {
	      this.elementData.push( obj );
	  }
	
	  /*
	  * 용도 : 배열 순서를 거꾸로 한다.
	  */
	  this.reverse = function() {
	      this.elementData.reverse();
	  }
	
	  /*
	  * 용도 : 해당 데이터를 반환한다.
	  * @param integer 배열 인덱스
	  * @return Object
	  */
	  this.elementAt = function( idx ) {
	      return this.elementData[ idx ];
	  }
	
	  /*
	  * 용도 : 배열에 들어 있는 Object 를 삭제한다.
	  */
	  this.removeAt = function( idx ) {
	      var temp;
	      if( this.size() > idx ) {
	          temp = new Array();
	          for( var i = 0  ; i < this.size() ; i++ ) {
	              if( i != idx ) {
	                  temp.push( this.elementAt( i ) );
	              }
	          }
	          this.elementData = temp;
	      }
	  }

	  /*
	  * 용도 : 배열에 삽입된 모든 Object 삭제한다.(초기화)
	  * @return integer 배열사이즈
	  */
      this.clear = function() {
          this.elementData = new Array();
      }

  }

  /**
  * 용 도 : 계약 상태 의 ',' 를 <br> 태그로 바꾸어서 리턴한다.
  * @param value  변환될데이터
  */
  function toStatCvt( value ) {
      if( typeof( value ) != "undefined" && value != "" ) {
	      return value.replaceAll( "," , "<br>" );
	  }else {
	      return "";
	   }
  }

  /**
  * 용 도 : 이율을 적용하여 반환한다.
  * @param str  이율
  * @param point  소수점 자릿수
  */
  function toRateCvt( str , point ) {
      if(
          ( typeof( point ) != "undefined" && point != "" ) &&
	      ( typeof( str ) != "undefined" && str != "" )
	  ) {
	      if( typeof( point ) != "number" ) {
	          point = Number( point );
	      }
	      var temp = "";
	      for( var i = 0 ; i < point ; i++ )
	          temp += "0";
	      temp = Number( "1" + temp );
	      return String( parseFloat( str ) / temp ) + "%";
	  }else {
	      return "";
	      }
  }

  function toPriceSoSuJumCvt( str , point ) {
      if(
          ( typeof( point ) != "undefined" && point != "" ) &&
      ( typeof( str ) != "undefined" && str != "" )
	  ) {
	      if( typeof( point ) != "number" ) {
	          point = Number( point );
	      }
	      var temp = "";
	      for( var i = 0 ; i < point ; i++ )
	          temp += "0";
	      temp = Number( "1" + temp );
	      temp = String( parseFloat( str ) / temp ) ;
	      var index = temp.indexOf( "." );
	      if( index != -1 ) {
	          return formatCommaStr( temp.substring( 0 , index ) ) + temp.substring( index );
	      }else {
	          return formatCommaStr( temp ) ;
	      }
	      return String( parseFloat( str ) / temp ) ;
	  }else {
	      return "";
	      }
  }

  function toPaymentTermCvt( str ) {
      if( typeof( str ) != "undefined" && str != "" ) {
      if( typeof( str ) == "string" ) {
          str = Number( str );
      }
      if( str == 999 ) {
          return "종신";
      }else {
          return String( str ) + "년";
      }
	  }else {
	      return "";
      }
  }




  /**
  * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
  *           전화번호(###-###-####)의 마지막 번호 4자리를 * 처리한다.
  *           전화번호(###-####)의 마지막 번호 4자리를 * 처리한다.
  * @param str  전화번호
  */
  function toPhoneCvt( str ) {
      if( str == "" || typeof( str ) == "undefined" ) return "";
	  if( str.trim() == "--" ) return "";
	  var array = str.split( "-" );
	  var len = array.length;
	  if( len != 3 && len != 2 ) {
	      array = str.split( "." );
	      len = array.length;
	  }
	  if( len == 3 ) {
	      return array[0] + "-" + array[1] + "-" + "****";
	  }else  if( len == 2 ){
	      return array[0] + "-" + "****";
	  }else {
		  if( str.length > 4 ) {
			  return str.substring( 0 , str.length - 4 ) + "****";
          }else {
              return str;
          }
      }
  }
  
  /**
   * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
   *           전화번호(###-###-####)의 가운데 번호를  * 처리한다.
   * @param str  전화번호
   */
   function toPhoneMiddleCvt( str ) {
       if( str == "" || typeof( str ) == "undefined" ) return "";
 	  if( str.trim() == "--" ) return "";
 	  var array = str.split( "-" );
 	  var len = array.length;
 	  if( len != 3 && len != 2 ) {
 	      array = str.split( "." );
 	      len = array.length;
 	  }
 	  if( len == 3 ) {
 	      return array[0] + "-" + "****" + "-" + array[2];
 	  }else  if( len == 2 ){
 	      return "****" + "-" + array[1];
 	  }else {
 		  if( str.length > 4 ) {
 			  if( str.length >= 10 ) {
 				var arry1 = str.substring( 0 , 3 );
 				var arry2 = str.substring( 3 , str.length - 4 );
 				var arry3 = str.substring( str.length - 4 , str.length );
 				
 				 return arry1 + "-" + "****" + "-" +arry3;
 			 }
 			  
           }else {
               return str;
           }
       }
   }
   
  /**
  * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
  *           이메일주소(###@###.###)의 아이디 부분을 일수 * 처리한다.
  * @param str  전화번호
  */
  function toEmailCvt( str ) {

      if( str == "" ) return "";
	  var array = str.split( "@" );
	  if( array.length != 2 ) {
	      return str;
	  }else {
      var temp = "";
      var len = array[0].length;
      switch( len ) {
          case 1 :
              temp = array[0];
              break;
          case 2 :
              temp = array[0].substring( 0 , 1 ) + "*";
              break;
          case 3 :
              temp = array[0].substring( 0 , 2 ) + "*";
              break;
          default :
              temp = array[0].substring( 0 , 3 );
              for( var i = 0 ; i < len - 3 ; i++ ) {
                  temp += "*"
              }
              break;
      }
      return temp += "@" + array[1];
      }
  }

  /**
  * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
  *           계좌번호 : 앞 세자리를 * 처리한다.
  * @param str  계좌번호
  */
  function toAcountCvt( str ) {
      if( str == "" || typeof( str ) == "undefined" ) return "";
	  var ARR = str.split( "-" );
		  if( ARR.length > 1 ) {
	      var temp = "";
	      for( var i = 0 ; i < ARR.length ; i++ ) {
	          if( i < ARR.length - 1 ) temp += ARR[ i ] + "-";
	          else {
	              for( var j = 0 ; j < ARR[ i ].length ; j++ )
	                  temp += "*";
	          }
	      }
	      return temp;
	  }
	  if( str.length > 8 ) {
	      return "****" + str.substring( 4 , str.length );
	  }else {
	      if( str.length < 4 ) return str;
	      return "***" + str.substring( 3 , str.length );
	      }
  }

  function onBlurAcountCvt( obj1 , obj2 ) {
      var str = obj1.value;
      obj2.value = str;
      if( str == "" ) return;

  var ARR = str.split( "-" );
  if( ARR.length > 1 ) {
      var temp = "";
      for( var i = 0 ; i < ARR.length ; i++ ) {
          if( i < ARR.length - 1 ) temp += ARR[ i ] + "-";
          else {
              for( var j = 0 ; j < ARR[ i ].length ; j++ )
                  temp += "*";
          }
      }
      obj1.value = temp;
  }
  if( str.length > 8 ) {
      obj1.value = str.substring( 0 , str.length - 4 ) + "****";
  }else {
      if( str.length < 4 ) return str;
      obj1.value = str.substring( 0 , str.length - 3 ) + "***";
      }
  }

  function onBlurAcountCvt2( obj1 , obj2 ) {
      var str = obj1.value;
      obj2.value = str;
      if( str == "" ) return;

	  var ARR = str.split( "-" );
	  if( ARR.length > 1 ) {
	      var temp = "";
	      for( var i = 0 ; i < ARR.length ; i++ ) {
	          if( i < ARR.length - 1 ) temp += ARR[ i ] + "-";
	          else {
	              for( var j = 0 ; j < ARR[ i ].length ; j++ )
	                  temp += "*";
	          }
	      }
	      obj1.value = temp;
	  }
	  if( str.length > 8 ) {
	      obj1.value = "****" + str.substring( 0 , str.length - 4 ) ;
	  }else {
      if( str.length < 4 ) return str;
      obj1.value = "***" + str.substring( 0 , str.length - 3 ) ;
      }
  }  
  
  function onFocusAcountCvt( obj1 , obj2 ) {
      obj1.value = obj2.value;
  }

  /**
  * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
  *           주민등록번호 뒤 7자리를 *처리한다.
  * @param jumin  주민등록번호
  */
  function toJuminCvt( jumin ) {
      if( jumin.length == 10 ) return jumin.substring( 0 , 3 ) + "-" + jumin.substring( 3 , 5 ) + "-*****";
  else if  (jumin.length == 13) return jumin.substring( 0 , 6 ) + "-*******";
  else return "";
  }

  /**
  * 용 도 : 보안상 화면에 출력하는 데이터는 * 처리를 해야 한다.
  *           증권번호 앞 6자리를 *처리한다.(총 10자리)
  * @param str  증권번호
  */
  function toPonoCvt( str ) {
      return ( ( str == ""  ) ? "" : "******" + str.substring( 6,10 ) );
  }

  /**
  * 용 도 : Select Box 의 Option 을 생성한다.
  *              반환되는 값은 없다.
  * @param obj  Select Box Object Name
  * @param value Array()객체
  * @param text  Array()객체
  * @param defaultValue Select 될 Value
  */
  function makeSelectOption( obj , value , text , defaultValue ) {
      if(
          ( typeof( obj ) != "undefined" && obj != "" ) &&
      ( typeof( value ) != "undefined" && typeof( value ) == "object" ) &&
      ( typeof( text ) != "undefined" && typeof( text ) == "object" )
  ) {
      if( self.$( obj ) ) {
          var selectCtrl = self.$( obj );
          for ( var i = selectCtrl.length ; i >= 0 ; i--) {
              selectCtrl.options[i] = null;
          }
          for( var i = 0 ; i < value.length ; i++ ) {
              selectCtrl.options[i] = new Option( text[i], value[i] );
              if( typeof( defaultValue ) != "undefined" ) {
                      if( defaultValue == value[i] ) {
                          selectCtrl.value = value[i];
                      }
                  }
              }
          }
      }
  }

  /**
  * 용 도 : Select Box 을 생성하여 출력한다.
  *              반환되는 값은 없다.
  * @param obj  Select Box 가 출력될 element id
  * @param name  Select Box Object Name
  * @param value Array()객체
  * @param text  Array()객체
  * @param event  onChang 이벤트
  * @param defaultValue Select 될 Value
  * @param option Array 객체
  */
  function makeSelect( obj , name , value , text , event , defaultValue , option ) {
      if(
          ( typeof( obj ) != "undefined" && obj != "" ) &&
      ( typeof( name ) != "undefined" && name != "" ) &&
      ( typeof( value ) != "undefined" && typeof( value ) == "object" ) &&
      ( typeof( text ) != "undefined" && typeof( text ) == "object" )
  ) {
      if( self.$( obj ) ) {
          if( typeof( event ) == "undefined" || event == null ) {
              event = "";
          }
          if( typeof( defaultValue ) == "undefined" || defaultValue == null ) {
              defaultValue = "";
          }
          var select = "<select name=\"" + name + "\"" + ( event != "" ? " onChange=\"" + event + "\"" : "" ) + ">\n";
          for( var i = 0 ; i < value.length ; i++ ) {
              var options = "";
              if( typeof( option ) != "undefined" && typeof( option ) == "object" ) {
                  var temp = option[i];
                  for ( var slot in temp ) {
                      if ( slot != METHOD_CLONE )
                          options += " " + slot + "=\"" + temp[ slot ] + "\"";
                  }
              }
              select += "<option value=\"" + value[i] + "\"" + options + ( defaultValue == value[i] ? " selected" : "" ) + ">" + text[i] + "</option>\n"
          }
          select += "</select>\n";
              self.$( obj ).innerHTML = select;
          }
      }
  }

  /**
  * 용 도 : Select Box 을 생성하여 반환한다.
  * @param name  Select Box Object Name
  * @param value Array()객체
  * @param text  Array()객체
  * @param event  onChang 이벤트
  * @param defaultValue Select 될 Value
  * @return Select Box
  * @param option Array 객체
  */
  function makeSelectRet( name , value , text , event , defaultValue , option ) {
      if(
          ( typeof( name ) != "undefined" && name != "" ) &&
      ( typeof( value ) != "undefined" && typeof( value ) == "object" ) &&
      ( typeof( text ) != "undefined" && typeof( text ) == "object" )
  ) {
      if( typeof( event ) == "undefined" || event == null ) {
          event = "";
      }
      if( typeof( defaultValue ) == "undefined" || defaultValue == null ) {
          defaultValue = "";
      }
      var select = "<select name=\"" + name + "\"" + ( event != "" ? " onChange=\"" + event + "\"" : "" ) + ">\n";
      for( var i = 0 ; i < value.length ; i++ ) {
          var options = "";
          if( typeof( option ) != "undefined" && typeof( option ) == "object" ) {
              var temp = option[i];
              for ( var slot in temp ) {
                  if ( slot != METHOD_CLONE )
                      options += " " + slot + "=\"" + temp[ slot ] + "\"";
              }
          }
          select += "<option value=\"" + value[i] + "\"" + options + ( defaultValue == value[i] ? " selected" : "" ) + ">" + text[i] + "</option>\n"
      }
      select += "</select>\n";
      return select;
  }else {
      return "";
      }
  }


  function initFocus( obj ) {
      obj.focus();
  }

  /**
  * 용 도 : 비밀번호 체크 로직
  */
  function isPass( jumin , pass ) {

      var len = pass.length;
      if( len < 6 || len > 10 ) {
          alert( "비밀번호는 영문자와 숫자를 조합한 6~10 자리입니다!" );
      return false;
  }

  if( jumin.indexOf( pass ) != -1 ) {
      alert("비밀번호는 주민등록번호 이외의 것이어야 합니다!");
      return false;
  }

  var temp = pass.charAt(0);
  for( var h = 1 ; h < pass.length ; h++ ) {
      var temp1 = pass.charAt( h );
      if( temp == temp1 ) {
          alert("비밀번호는 반복되는 문자나 숫자이외의 것이어야 합니다.");
          return false;
      }else {
          temp = temp1;
      }
  }

  var l = pass.length;
  var is_num = isNumber( pass );

  if( is_num ) {
      if( l == 10 ) {
          if(
              ( ( eval(pass.charAt(0)) + eval(pass.charAt(9)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(8)) ) ) &&
              ( ( eval(pass.charAt(1)) + eval(pass.charAt(8)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(7)) ) ) &&
              ( ( eval(pass.charAt(2)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(6)) ) ) &&
              ( ( eval(pass.charAt(3)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(4)) + eval(pass.charAt(5)) ) )
          ) {
              alert("비밀번호는 연속되는 숫자이외의 것이어야 합니다.");
              return false;
          }
      }
      if( l == 9 ) {
          if(
              ( ( eval(pass.charAt(0)) + eval(pass.charAt(8)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(7)) ) ) &&
              ( ( eval(pass.charAt(1)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(6)) ) ) &&
              ( ( eval(pass.charAt(2)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(5)) ) ) &&
              ( ( eval(pass.charAt(3)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(4)) * 2 ) )
          ) {
              alert("비밀번호는 연속되는 숫자이외의 것이어야 합니다.");
              return false;
          }
      }
      if( l == 8 ) {
          if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(6)) ) ) &&
              ( ( eval(pass.charAt(1)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(5)) ) ) &&
              ( ( eval(pass.charAt(2)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(4)) ) )  )
              {
              alert("비밀번호는 연속되는 숫자이외의 것이어야 합니다.");
              return false;
          }
      }
      if(l == 7) {
          if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(5)) ) ) &&
              ( ( eval(pass.charAt(1)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(4)) ) ) &&
              ( ( eval(pass.charAt(2)) + eval(pass.charAt(4)) ) == ( eval(pass.charAt(3))*2 ) ) )
              {
              alert("비밀번호는 연속되는 숫자이외의 것이어야 합니다.");
              return false;
          }
      }else {
          if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(4)) ) ) &&
              ( ( eval(pass.charAt(1)) + eval(pass.charAt(4)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(3)) ) )  )
              {
              alert("비밀번호는 연속되는 숫자이외의 것이어야 합니다.");
              return false;
          }
      }
  }

  var cTm;
  for( var i = 0 ; i < pass.length ; i++ ) {
      cTm = pass.charAt(i);
      if( !(cTm >= "0" && cTm <= "9") && !(cTm >= "A" && cTm <="Z") && !(cTm >= "a" && cTm <="z")) {
          alert("비밀번호는 영문, 숫자 조합으로 입력해야 합니다.");
          return false ;
      }
  }

  if( isNumber( pass ) || isAlpha( pass ) ) {
      alert("비밀번호는 영문, 숫자 조합으로 입력해야 합니다.");
          return false ;
      }

      return true;

  }

  /**
  * 용 도 : 비밀번호 체크 로직
  */
  function isPass2( jumin , pass ) {

      var len = pass.length;
      if( len < 6 || len > 10 ) {
          return false;
      }

      if( jumin.indexOf( pass ) != -1 ) {
          return false;
      }

      var temp = pass.charAt(0);
      for( var h = 1 ; h < pass.length ; h++ ) {
          var temp1 = pass.charAt( h );
          if( temp == temp1 ) {
              return false;
          }else {
              temp = temp1;
          }
      }

      var l = pass.length;
      var is_num = isNumber( pass );

      if( is_num ) {
          if( l == 10 ) {
              if(
                  ( ( eval(pass.charAt(0)) + eval(pass.charAt(9)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(8)) ) ) &&
                  ( ( eval(pass.charAt(1)) + eval(pass.charAt(8)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(7)) ) ) &&
                  ( ( eval(pass.charAt(2)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(6)) ) ) &&
                  ( ( eval(pass.charAt(3)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(4)) + eval(pass.charAt(5)) ) )
              ) {
                  return false;
              }
          }
          if( l == 9 ) {
              if(
                  ( ( eval(pass.charAt(0)) + eval(pass.charAt(8)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(7)) ) ) &&
                  ( ( eval(pass.charAt(1)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(6)) ) ) &&
                  ( ( eval(pass.charAt(2)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(5)) ) ) &&
                  ( ( eval(pass.charAt(3)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(4)) * 2 ) )
              ) {
                  return false;
              }
          }
          if( l == 8 ) {
              if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(7)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(6)) ) ) &&
                  ( ( eval(pass.charAt(1)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(5)) ) ) &&
                  ( ( eval(pass.charAt(2)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(3)) + eval(pass.charAt(4)) ) )  )
                  {
                  return false;
              }
          }
          if(l == 7) {
              if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(6)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(5)) ) ) &&
                  ( ( eval(pass.charAt(1)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(4)) ) ) &&
                  ( ( eval(pass.charAt(2)) + eval(pass.charAt(4)) ) == ( eval(pass.charAt(3))*2 ) ) )
                  {
                  return false;
              }
          }else {
              if( ( ( eval(pass.charAt(0)) + eval(pass.charAt(5)) ) == ( eval(pass.charAt(1)) + eval(pass.charAt(4)) ) ) &&
                  ( ( eval(pass.charAt(1)) + eval(pass.charAt(4)) ) == ( eval(pass.charAt(2)) + eval(pass.charAt(3)) ) )  )
                  {
                  return false;
              }
          }
      }

      var cTm;
      for( var i = 0 ; i < pass.length ; i++ ) {
          cTm = pass.charAt(i);
          if( !(cTm >= "0" && cTm <= "9") && !(cTm >= "A" && cTm <="Z") && !(cTm >= "a" && cTm <="z")) {
              return false ;
          }
      }

      if( isNumber( pass ) || isAlpha( pass ) ) {
          return false ;
      }

      return true;

  }

  /**
  * 소수점을 반올림하여 반환한다.
  *@param val 반올림될 숫자
  *@param pos 반올림될 소수점자리수
  *@return 반올림값
  */
  function round( val , pos ) {
      var rtn;
      rtn = Math.round(val * Math.pow(10, Math.abs(pos)-1));
      return rtn / Math.pow(10, Math.abs(pos)-1);
  }

  /**
  * 용  도 : 오른쪽 마우스 버튼 사용여부 설정
  *             사용가능 true , 사용불가 false
  */
  var ON_BODY_CLICK = true ;

  if( !ON_BODY_CLICK ) {
      document.onmousedown = onScreenClick;
  }

  /**
  * 용  도 : 오른족 마우스를 사용하지 못하도록 한다.
  */
  function onScreenClick() {
      if( ( event.button == 2 ) || ( event.button == 3 ) ) {
          alert( "오른쪽 마우스 버튼을 사용하실수 없습니다." );
      }
  }

  /***********************************************************************************
  **** getParameter ******************************************************************
  **** Start *************************************************************************
  ***********************************************************************************/
  function getParameter(paramName) {
      var q = location.search;
      if (q.length>1&&q.indexOf("?")>-1) q = q.substring(1,q.length);
  var param = q.split("&");
  var paramValue = "";
  for (var i=0; i<param.length; i++) {
      if (param[i].indexOf("=")>-1) {
          var pName = param[i].split("=")[0];
          var pValue = param[i].split("=")[1];
              if (pName==paramName) {
                  paramValue = pValue;
                  break;
              }
          }
      }
      return paramValue;
  }
  

  /**
   * 설명 : 문자열을 정해진 길이만큼 왼쪽을 특정 문자로 채운다.
   * @param : str- 문자열
   * @param : len- 총길이
   * @param : ch - 특정문자
   * */
  function lPadString(str, ch, len){

   var strlen = str.length;
   var ret = "";
   var alen = len - strlen;
   var astr = ""; 
   
   
   //부족한 숫자만큼  len 크기로 ch 문자로 채우기
   for (var i=0; i<alen; ++i)
   {
    astr = astr + ch;
   }
   
   ret = astr + str; //앞에서 채우기
   return ret;
  }

  /**
   * 설명 : 문자열을 정해진 길이만큼 오른쪽을 특정 문자로 채운다.
   * @param : str- 문자열
   * @param : len- 총길이
   * @param : ch - 특정문자
   * */
  function rPadString(str, ch, len){

   var strlen = str.length;
   var ret = "";
   var alen = len - strlen;
   var astr = ""; 
   
   //부족한 숫자만큼  len 크기로 ch 문자로 채우기
   for (var i=0; i<alen; ++i)
   {
    astr = astr + ch;
   }
   
   ret = str + astr; //뒤에서 채우기
   return ret;
  }

  /**
   * 용   도 : 날짜 입력시 구분자를 자동으로 생성시킴
   * 사용예 : onKeyup="autoDateFormat( event, this )"
   * @param oThis(text field)
   * */
  function autoDateFormat( oThis, type ){
  	var num_arr = [ 97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
  	               48, 49, 50, 51, 52, 53, 54, 55, 56, 57 ]
  	
  	var key_code = ( event.which ) ? event.which : event.keyCode;
  	if( num_arr.indexOf( Number( key_code ) ) != -1 ){
  		
  		var len = oThis.value.length;
  		if(type == 'yyyymm'){
  			if( len == 4 ) oThis.value += ".";
  		}else{
  			if( len == 4 ) oThis.value += ".";
  			if( len == 7 ) oThis.value += ".";
  		}
  	}
  }

  /**
   * 용   도 : 학점 입력시 구분자를 자동으로 생성시킴
   * 사용예 : onKeyup="autoScor( event )"
   * @param oThis(text field)
   * */
  function autoScor( oThis ){
  	var num_arr = [ 97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
  	               48, 49, 50, 51, 52, 53, 54, 55, 56, 57 ]
  	
  	var key_code = ( event.which ) ? event.which : event.keyCode;
  	if( num_arr.indexOf( Number( key_code ) ) != -1 ){
  		
  		var len = oThis.value.length;
		if( len == 1 ) oThis.value += ".";
  	}
  }

  /**
   * 용   도 : 숫자키, 좌우방향키, Delete키, Backspace키, Tab키, Shift키 외에는 입력이 안되도록 한다.
   * 사용예 : onKeyDown="return showKeyCode(event)"
   * @param 
   * */
  function showKeyCode(event){
	  event = event || window.event;
	  var keyId = (event.which) ? event.which : event.keyCode;
	  if((keyId >= 48 && keyId <= 57) || (keyId >= 96 && keyId <= 105) || keyId == 8 || keyId == 46 || (keyId >= 37 && keyId <= 40) || keyId == 9 || keyId == 16){
		  return;
	  }else{
		  alert("숫자만 입력 가능 합니다.");
		  return false;
	  }
  }

  /**
   * 용   도 : showKeyCode에서 한글이 입력됐을시 삭제(Chrome에서만 발생)
   * 사용예 : onKeyUp="removeChar(event)"
   * @param 
   * */
  function removeChar(event){
	  event = event || window.event;
	  var keyId = (event.which) ? event.which : event.keyCode;
	  if(keyId == 8 || keyId == 46 || (keyId >= 37 && keyId <= 40) ){
		  return;
	  }else{
		  event.target.value = event.target.value.replace(/[^0-9]/g, "");
	  }
  }
  /**
   * 용도 :입력가능 문자길이 체크
  */
  function maxLengthCheck(id,title,maxLength){
	  var obj = $("#"+id);
	  if(maxLength == null){
		  maxLength = obj.attr("maxLength") != null ? obj.attr("maxLength") : 1000;
	  }
	  
	  var othrNtfLen = obj.val().length;
		var limitStr = obj.val();
		if(othrNtfLen > maxLength){
			alert(title +"은(는) "+maxLength+"자이상 입력할수 없습니다.");
			limitStr = limitStr.substring(0,maxLength);
			obj.val(limitStr);
			return false;
		}else{
			return true;
		}  
  }
 