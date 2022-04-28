/* 숫자 정규식체크  function */
function fnc_isNumber(field,arg){
	var result = true;
	var regExp = /^[0-9]+$/;
	if(!regExp.test(arg)){
		alert(field+"는 숫자만 입력하세요.");
		result = false;
	}
	return result;
}

/* 날짜 정규식체크  function */
function fnc_isDate(field, arg){
	var result = true;
	var regExp = /^(19[7-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
	if(!regExp.test(arg)){
		alert(field+"의 날짜형식이 잘못되었습니다.");
		result = false;
	}
	return result;
}

/* 날짜 정규식체크  function */
function fnc_chkDate(field, arg){
	var result = true;
	var regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
	if(!regExp.test(arg)){
		alert(field+"의 날짜형식이 잘못되었습니다.");
		result = false;
	}
	return result;
}

/* 매월 마지막 날짜 확인하기 */
function fnc_lastDateChk(arg){
	var yy = parseInt(arg.substring(0, 4));
	var mm = parseInt(arg.substring(4, 6));
	var dd = parseInt(arg.substring(6, 8));
	switch(mm){
		case 2: //2월의 경우
			if(dd > 29) return false;
			if(dd == 29){
				//2월29일의 경우 당해가 윤년인지를 확인
				if((yy % 4 != 0) || (yy % 100 == 0) && (yy % 400 != 0)){
				return false;
				}
			}
			//break;
		case 4: //작은 달의 경우
		case 6:
		case 9:
		case 11:
			if(dd > 30) return false;
		//큰달의 경우
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			if(dd > 31) return false;
		return true;
	}
}

/* email 유효성 체크 */
function fnc_isEmail(arg){
	var result = true;
	var reg1str = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
	var reg2str = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";
	var reg1 = new RegExp (reg1str);
	var reg2 = new RegExp (reg2str);
	if (reg1.test(arg) || !reg2.test(arg)){
		alert("E-Mail 형식이 올바르지 않습니다.");
		result = false;
	}
	return result;
}

/* isEmpty function */
function isEmpty(str){
	var result = true;
	if(str == null || str == ''){
		result = false;
	}
	return result;
}

/* nullToEmpty function*/
function nullToEmpty(str){
	var result ="";
	if(str == null || str == ''){
		result = "";
	}else{
		result = str;
	}
	return result;
}

/* 문자열 길이 체크 funcion */
function fncByteschk($obj, max, str) {
	var tmpStr = $obj.val();
	var rbyte = 0;
	var rlen = 0;
	var one_char = "";
	var str2 = "";
	for (var i = 0; i < tmpStr.length; i++) {
		one_char = tmpStr.charAt(i);
		if (escape(one_char).length > 4) {
			rbyte += 3; //한글3Byte
		} else {
			rbyte++; //영문 등 나머지 1Byte
		}
		if (rbyte <= max) {
			rlen = i + 1; //return할 문자열 갯수
		}
	}
	if (rbyte > max) {
		alert(str + " " + max + " btye 까지 입력가능 합니다.(한글은 글자당 3byte)");
		// 문자열 자르기를 하면 한번 alert 띄우고 다시 저장 누르면 잘린 값으로 저장 진행됨...
		//str2 = tmpStr.substr(0, rlen); //문자열 자르기
		//$obj.val(str2);
		return false;
	}
	return true;
}

function isKorean(ch) {
 var numUnicode =ch.charCodeAt(0); 
 if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;            
return false;
}
/*****************************************************************************
 * String 영문,숫자만 engNumberOnly='true'
 * author	: No Name
 *****************************************************************************/
$(document).on("keyup", "input:text[engNumberOnly]", function() {
	var pattern =/[^0-9\!-z]/gi;
	if(pattern.test($(this).val())){
		alert("영문 또는 숫자만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[^0-9\!-z]/gi,"") );
	});
$(document).on("blur", "input:text[engNumberOnly]", function() {$(this).val( $(this).val().replace(/[^0-9\!-z]/gi,"") );});

/*****************************************************************************
 * String 숫자만 numberOnly='true'
 * author	: No Name
 *****************************************************************************/
$(document).on("keyup", "input:text[numberOnly]", function() {
	var pattern =/[^0-9]/gi;
	if(pattern.test($(this).val())){
		alert("숫자만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
});
$(document).on("blur", "input:text[numberOnly]", function() { $(this).val( $(this).val().replace(/[^0-9]/gi,"") );});

$(document).on("keyup", "input:password[numberOnly]", function() {
	var pattern =/[^0-9]/gi;
	if(pattern.test($(this).val())){
		alert("숫자만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
});
$(document).on("blur", "input:password[numberOnly]", function() { $(this).val( $(this).val().replace(/[^0-9]/gi,"") );});

/*****************************************************************************
 * String 영문만 engOnly='true'
 * author	: No Name
 *****************************************************************************/
$(document).on("keyup", "input:text[engOnly]", function() {
	var pattern =/[0-9]|[^\!-z]/gi;
	if(pattern.test($(this).val())){
		alert("영문만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[0-9]|[^\!-z]/gi,"") );
});
$(document).on("blur", "input:text[engOnly]", function() {$(this).val( $(this).val().replace(/[0-9]|[^\!-z]/gi,"") );});

/*****************************************************************************
 * String 영문 + 띄어쓰기 engOnly2='true'
 * author	: No Name
 *****************************************************************************/
$(document).on("keyup", "input:text[engOnly2]", function() {
	var pattern =/[0-9]|[^\!-z\s]/gi;
	if(pattern.test($(this).val())){
		alert("영문 또는 띄어쓰기만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[0-9]|[^\!-z\s]/gi,"") );
});
$(document).on("blur", "input:text[engOnly2]", function() {$(this).val( $(this).val().replace(/[0-9]|[^\!-z\s]/gi,"") );});

/*****************************************************************************
 * String 영문 + 띄어쓰기 engOnlyUpper='true' and toUpperCase()
 * author	: No Name
 *****************************************************************************/
$(document).on("keyup", "input:text[engOnlyUpper]", function() {$(this).val( $(this).val().replace(/[^0-9\!-z\s]/gi,"").toUpperCase() );});
$(document).on("blur", "input:text[engOnlyUpper]", function() {$(this).val( $(this).val().replace(/[^0-9\!-z\s]/gi,"").toUpperCase() );});


/*****************************************************************************
 * String 한글만 korOnly='true' --테스트결과 IE에서 안먹을 때가 종종있음.
 *****************************************************************************/
$(document).on("keyup", "input:text[korOnly]", function() {
	var pattern =/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g;
	if(pattern.test($(this).val())){
		alert("한글만 입력 가능합니다.");
	}
	$(this).val( $(this).val().replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"\\]/g,"") );
});


/* 날짜차이계산 function */
function  getDateDiff(date1,date2){
	var arrDate1=new Array();
	var arrDate2=new Array();
	if(date1.length==8){
		arrDate1[0]=date1.substring(0,4);
		arrDate1[1]=date1.substring(4,6);
		arrDate1[2]=date1.substring(6,8);
	}else{
		arrDate1=date1.split("-");
	}
	if(date2.length==8){
		arrDate2[0]=date2.substring(0,4);
		arrDate2[1]=date2.substring(4,6);
		arrDate2[2]=date2.substring(6,8);
	}else{
		arrDate2=date2.split("-");
	}
	//var arrDate1 = date1.split("-");
	var getDate1 = new Date(parseInt(arrDate1[0],10),parseInt(arrDate1[1],10)-1,parseInt(arrDate1[2],10));
	//var arrDate2 = date2.split("-");
	var getDate2 = new Date(parseInt(arrDate2[0],10),parseInt(arrDate2[1],10)-1,parseInt(arrDate2[2],10));
	
	var getDiffTime = getDate1.getTime() - getDate2.getTime();
	
	return Math.floor(getDiffTime / (1000*60*60*24));
}

/* 휴대폰 유효성검사 function */
function chkphone(value,type){
	var chkcelnum=/^01\d{8,9}$/;
	var chktelnum=/^0\d{8,10}$/;
	if(type=="h"){//휴대폰
		return chkcelnum.test(value);
	}else{ //일반전화
		return chktelnum.test(value);
	}
}

/* form reset function */
function fnc_resetForm(formName){
	$("#"+formName).each(function(){
		this.reset();
	});
}

function xssReplace(data){
	data = data+"";
	var rtnData = data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/\"/g, "&quot;").replace(/\t/g, "&#9;").replace(/\r/g, "&#13;").replace(/\n/g, "&#10;");
	return rtnData;
}