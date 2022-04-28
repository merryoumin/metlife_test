/**
 * --------------------------------------------------
 * PROJ : DEO Project
 * NAME : CBSPD70M03.js
 * DESC : CBSPD70M03 Javascript 파일
 * AUTH : 조현근 최초 작성
 * VER  : v1.0
 * Copyright (C) by MetLife All right reserved.
 * --------------------------------------------------
 * 변 경 사 항
 * --------------------------------------------------
 * DATE       AUTHOR   DESCRIPTION
 * ---------- -------- ------------------------------
 * 2016.12.14 조현근   최초 프로그램 작성
 * 2021.09.09 박지영   ITSM-27608 홈페이지 가입상담 문의 개인정보의 제공에 관한 문구 삭제 및  추가
 * --------------------------------------------------
 */
$(document).ready(function () {
  //	//전문가 선택 여부 화면 제어
  //	$(":radio[name=trstxTypSlcYn]").on("click",function(){
  //		var trstxTypSlcYnVal = this.value;
  //		if("Y" == trstxTypSlcYnVal){
  //			$("#profDiv").show();
  //
  //			//화면 높이 재조정해서 사이드 스크롤 발생 방지
  //			rsize();
  //		} else {
  //			$("#profDiv").hide();
  //			$("#profDiv :checkbox").prop("checked",false);
  //			$("#profDiv label").removeClass("checked");
  //		}
  //	});
});

/* 가입상담등록 function */
function fnc_reg() {
  if (!isEmpty($("#qstpNm").val())) {
    alert("성명을 정확하게 입력해 주세요.");
    $("#qstpNm").focus();
    return;
  }
  if (!isNamePattern($("#qstpNm").val())) {
    alert("성명은 숫자 & 특수문자 없이 입력해 주세요.");
    $("#qstpNm").focus();
    return;
  }
  if ($("#qstpNm").val().lenght > 15) {
    alert("성명은 15자 이하로 작성해 주세요.");
    $("#qstpNm").focus();
    return;
  }

  if ($("#qstpCpn").val() == "") {
    alert("휴대폰번호를 정확하게 입력해 주세요.");
    $("#qstpCpn").focus();
    return;
  }

  if (!chkphone($("#qstpCpn").val(), "h")) {
    alert("휴대폰번호를 정확하게 입력해 주세요.");
    $("#qstpCpn").focus();
    return;
  }

  if ($(":radio[name=custTpcd]:checked").length == 0) {
    alert("메트라이프 고객여부를 선택하시기 바랍니다.");
    $(":radio[name=custTpcd][value=Y]").focus();
    return;
  }

  if (
    $("#brnBascAddr").val() == "" &&
    ($("#brnDtlAddr").val() == "" || $("#brnDtlAddr").val() == null)
  ) {
    alert("지역을 선택하시기 바랍니다.");
    $("#brnBascAddr").focus();
    return;
  }

  //	if($(":radio[name=trstxTypSlcYn]:checked").length == 0){
  //		alert("선호 전문가 유형 여부를 선택하시기 바랍니다.");
  //		$(":radio[name=trstxTypSlcYn][value=Y]").focus();
  //		return;
  //	}

  //	if($(":radio[name=trstxTypSlcYn]:checked").val() == "Y"){
  //
  //		if($(":radio[name=sexGbn]:checked").length == 0){
  //			alert("선호 전문가 성별을 선택하시기 바랍니다.");
  //			$(":radio[name=sexGbn][value=1]").focus();
  //			return;
  //		}
  //		if($(":radio[name=ageGbn]:checked").length == 0){
  //			alert("선호 전문가 연령을 선택하시기 바랍니다.");
  //			$(":radio[name=ageGbn][value=1]").focus();
  //			return;
  //		}
  //		if($(":radio[name=majorGbn]:checked").length == 0){
  //			alert("선호 전문가 전문분야를 선택하시기 바랍니다.");
  //			$(":radio[name=majorGbn][value=1]").focus();
  //			return;
  //		}
  //
  //	}

  if ($(":radio[name=agr1]:checked").val() != "Y") {
    alert(
      "개인정보의 수집 · 이용에 관한 사항에 동의 하셔야 가입상담문의 가능합니다."
    );
    $("#agr1").focus();
    return;
  }

  /* ITSM-27608 홈페이지 가입상담 문의 개인정보의 제공에 관한 문구 삭제 및 추가
	if($(":radio[name=agr2]:checked").val() != 'Y'){
		alert("개인(신용)정보의 제공에 관한 사항에 동의 하셔야 가입상담문의 가능합니다.");
		$("#agr2").focus();
		return;

	}
	*/

  var infwPcd = $("#infwPcd").val();
  $("#detailForm").attr(
    "action",
    _contextPath +
      "/pd/prodItrd" +
      infwPcd +
      "/registerNtryCnslQustInfoChannel.do"
  );
  $("#detailForm").submit();
  return false;
}

//시도 변경 시 시군데이터 변경
function searchHnglGg(elemnt) {
  var sidoVal = elemnt.value;

  $("#hnglSidoNm").val(sidoVal);

  sendAjax(
    "#sidoFrm",
    _contextPath + "/pd/prodItrd/retrieveSubAddrAjax.do",
    "",
    sucessCallback
  );
}

function sucessCallback(data) {
  var resultList = data.result.hnglSidoNmList;

  //기존 옵션 clear
  $("#brnDtlAddr option").remove();

  for (var i = 0; i < resultList.length; i++) {
    var hnglGgnm = resultList[i].hnglGgnm;

    if (i == 0)
      $("#brnDtlAddr").append('<option value="">선택 또는 기타</option>');

    $("#brnDtlAddr").append(
      "<option value='" + hnglGgnm + "' >" + hnglGgnm + "</option>"
    );
  }
}

function isNamePattern(nameVal) {
  var patternNum = /[0-9]/;
  var patternSpc = /[~!@#$%^&*()_+|<>?:{}|-]/;
  if (patternNum.test(nameVal) || patternSpc.test(nameVal)) return false;

  return true;
}
