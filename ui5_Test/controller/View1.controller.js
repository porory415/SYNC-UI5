sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View1", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                
                var oViewOneModel = new JSONModel({
                    q1property : null,
                    q2property : null,
                    a1property : null,
                    selectedKey : null,
                    operator : [
                        { keyValue: "ADD", textValue: "+"},
                        { keyValue: "MINUS", textValue: "-"},
                        { keyValue: "MULTIPLY", textValue: "x"},
                        { keyValue: "DIVIDE", textValue: "/"},
                        { keyValue: "GUGUDAN", textValue: "구구단"}
                    ]
                })
                this.getView().setModel(oViewOneModel, "ViewOneModel");

                this.getOwnerComponent().getRouter().getRoute("RouteView1").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "1");
            },

            onCalc: function() {
                // 키를 읽어올 방법 1. Select -> selectedKey 프로퍼티바인딩 된 모델의 값을 읽어오기
                // 2. Select 객체에 접근해서 메소드 호출(getSelectedKey())
                var oViewOneModel = this.getView().getModel("ViewOneModel");
                var sSeletedKey = oViewOneModel.getProperty("/selectedKey");
                var iNum1 = oViewOneModel.getProperty("/q1property");
                var sNum2 = oViewOneModel.getProperty("/q2property");
                var iNum2 = parseInt(sNum2);
                var iResult = 0;
                var sGugudan = ""; // 변수 선언시 속성 부여
                var aOperator = oViewOneModel.getProperty("/operator");

                switch (sSeletedKey) {
                    case aOperator[0].keyValue : // "+"
                        iResult = iNum1 + iNum2;
                        break;
                    case aOperator[1].keyValue : // "-"
                        iResult = iNum1 - iNum2;
                        break;
                    case aOperator[2].keyValue : // "x"
                        iResult = iNum1 * iNum2;
                        break;
                    case aOperator[3].keyValue : // "/"
                        iResult = iNum1 / iNum2;
                        break;
                    case aOperator[4].keyValue : // "구구단"
                        for( var i=1; i<=9; i++ ){
                            // i for문 안에서만 유효한 지역변수
                            var iGuguResult = iNum1 * i;
                            if(i === 1){ // == 조건 비교시 타입에 상관 없이 비교 1 "1", === 1 1
                                sGugudan = ( iNum1 + " x " + i + " = " + iGuguResult );
                            }else {
                                sGugudan = sGugudan +"\n"+ ( iNum1 + " x " + i + " = " + iGuguResult );
                            }
                        }
                        break;
                    default: // case에 해당 안되는 조건을 실행
                        //  
                        break;
                }

                if( sSeletedKey === aOperator[4].keyValue ) { // 구구단일 때만 다른 결과를 텍스트 프로퍼티에 반영
                    this.getView().getModel("ViewOneModel").setProperty("/a1property", sGugudan);
                } else {
                    this.getView().getModel("ViewOneModel").setProperty("/a1property", iResult);
                }
            },

            onSelect: function() {
                var oViewOneModel = this.getView().getModel("ViewOneModel");
                var sSeletedKey = oViewOneModel.getProperty("/selectedKey");
                var aOperator = oViewOneModel.getProperty("/operator");
                var sNum2 = oViewOneModel.getProperty("/q2property");
                var iNum2 = parseInt(sNum2);
                var oInput2 = this.getView().byId("input2")

                if( sSeletedKey === aOperator[3].keyValue && iNum2 === 0 ) { // 나누기를 선택했을때 && 두번째 인풋창 숫자가 0
                    // 인풋객체.setValue() - 1
                    oViewOneModel.setProperty("/q2property", ""); // - 2 바인딩 되어있는 프로퍼티값 자체를 수정
                }

                if( sSeletedKey === aOperator[4].keyValue ) { // 구구단 선택시
                    oInput2.setEditable(false);
                } else {
                    oInput2.setEditable(true);
                }
            },

            onLiveChange: function(oEvent) {
                var sInputValue = oEvent.getParameter("value");
                var oInput = oEvent.getSource();

                if( sInputValue == "0" ){ // 0 의 정확한 타입을 모르는데 상관없이 조건을 걸고 싶으면 ==
                    MessageBox.error("0으로 나눌 수 없습니다!");
                    oInput.setValue();
                }
            },
        });
    });
