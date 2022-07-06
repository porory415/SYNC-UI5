sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    // "sap/ui/core/mvc/Controller",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/sync/ui5training/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"../model/formatter", // ../ <- 상위폴더
    "../model/daumPost",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, daumPost,Fragment, MessageToast,History, UIComponent,MessageBox) {
        "use strict";

        return BaseController.extend("sap.sync.ui5training.controller.View2", {
            formatter: formatter,
            onInit: function () {

                var ViewData = {
                    students :[
                        {name: "lee", score: "A", score2:'B', result:"", address:""},
                        {name: "kim", score: "C", score2:'B', result:"", address:""},
                        {name: "yoon", score: "A", score2:'A', result:"", address:""},
                        {name: "oh", score: "B", score2:"c", result:"", address:""},
                        {name: "jo", score: "B", score2:'B', result:"", address:""},
                        {name: "jung", score: "C", score2:'F', result:"", address:""}
                    ],
                    searchValue :"",
                    koInput :"",
                    maInput: "",
                    gradeList : [
                        {grade: "A", text: "A"},
                        {grade: "B", text: "B"},
                        {grade: "C", text: "C"},
                        {grade: "F", text: "F"}
                    ],
                    address :"",
                   
                };
                var ViewModel = new JSONModel(ViewData);
                this.getView().setModel(ViewModel);

                var oTable = this.getView().byId("uiTable");
                var oTemplate = oTable.setRowActionTemplate(oTemplate);

                
            },
                
            onCheck: function() {
                var ViewModel = this.getView().getModel();
                var ilength = ViewModel.getProperty("/students").length;

                for(var i = 0; i <ilength ; i++) {
                    var sPath1 = "/students/"+ i + "/score";  // 체크용
                    var sPath2 = "/students/" + i + "/result";
                    var sScore1 = ViewModel.getProperty(sPath1);
                    if (sScore1 === 'A' || sScore1=== 'B') {
                        ViewModel.setProperty(sPath2, "합격");
                    }else {
                        ViewModel.setProperty(sPath2, "불합격");
                    }
                    
                }
            },

            onRegist: function() {
                var oInputNmae = this.getView().byId("nameInput");
                var sName = oInputNmae.getValue();

                var ViewModel = this.getView().getModel();
                var sScore1 = ViewModel.getProperty("/koInput");
                var sScore2 = ViewModel.getProperty("/maInput");
                var aStudents = ViewModel.getProperty("/students");

                var oPage = this.getView().byId("page");        //가져올 대상의 상위 컨텐츠의 아이디만 알 겅유 접근방법
                // var oAddressInput = oPage.getContent()[0].getItems()[3].getItems()[1];
                // var sAddress = oAddressInput.getValue();   //객체에서 메소드로 읽어옴
                var sAddress = ViewModel.getProperty("/address");  //모델의 프로퍼티로 읽어옴
                var oPerson = {name: sName, score: sScore1, score2: sScore2, result: "", address: sAddress};
                var ilength = ViewModel.getProperty("/students").length;

                var oPage = this.getView().byId("page");

                aStudents.push(oPerson);
                ViewModel.setProperty("/students", aStudents);

                var msg = "등록되었습니다.";
                MessageToast.show(msg);   // 처리 결과를 메세지 사용자에게 토스트로 알려줌

               
                this.onCloseDialog();
            },

            onDelete: function() {
                var oTable = this.getView().byId("uiTable");  //id로 테이블 받아옴
                var iIndex = oTable.getSelectedIndices()[0];   //getSelectedIndices 메소드 공식처럼
                var ViewModel = this.getView().getModel();
                var aStudents = ViewModel.getProperty("/students");     //테이블 배열 가져와서

                //배열에서 선택한 인덱스 요소 한개 삭제
                aStudents.splice(iIndex, 1);  //splice(시작인덱스, 삭제요소 갯수)

                ViewModel.setProperty("/students", aStudents);      //처리 결과를 모델에 재반영
                console.log(iIndex);
            },

            onPopupAddress: function(oEvent) {
                var oInput = oEvent.getSource();  //인풋 창
                new daum.Postcode({
                    oncomplete: function(data) {    //컨트롤러에서 onInit을 쓰는 것과 비슷
                        var sAddress = data.address;  //주소 텍스트
                        oInput.setValue(sAddress);   //인풋값에 값 반영
                      
                    }
                }).open();
            },

            onRegistPopup: function() {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment ({
                        name: "sap.sync.ui5training.view.Regist"
                    });
                }
                this.pDialog.then(function(oDialog){
                    oDialog.open();
                    oDialog.setBusy(true);
                    setTimeout(function(){oDialog.setBusy(false)}, 1000)

                })
            },

            onCloseDialog: function() {
                var oDialog = this.getView().byId("helloDialog");
                oDialog.close();
            },

            getRouter : function(){
                return UIComponent.getRouterFor(this);
            },

            onNavToView2: function(){
                console.log("111");
                var oTable = this.getView().byId("uiTable");  //id로 테이블 받아옴
                var iIndex = oTable.getSelectedIndices()[0]; 
                var ViewModel = this.getView().getModel();
                var sPath = "/students/" + iIndex + "/name";   //students/0/name                var sName = ViewModel.getProperty("/");
                var sName = ViewModel.getProperty(sPath);

                if (iIndex === undefined) {
                    console.log("222");
                    this.onWarning2MessageBoxPress();
                }
                console.log("333");
                this.getRouter().navTo("View3", {name: sName});
                // manifest.json - routes의 name
            },

            onWarning2MessageBoxPress: function () {
                var sText = "목록에서 학생 한명을 선택해주세요."
                MessageBox.warning(sText, {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                });
            }
        });
    }
);
                
