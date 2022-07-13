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

        return Controller.extend("sap.sync.ui5test.controller.View3", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                
                var oViewThreeModel = new JSONModel({
                    Questions : [
                        { Q : "당신은 외향적인가요? 내향적인가요?", Text1: "내향적", Text2: "외향적", Answer: -1 },
                        { Q : "당신은 직관적인가요? 감각적인가요?", Text1: "직관적", Text2: "감각적", Answer: -1 },
                        { Q : "당신은 감정적인가요? 현실적인가요?", Text1: "감정적", Text2: "현실적", Answer: -1 },
                        { Q : "당신은 즉흥적인가요? 계획적인가요?", Text1: "즉흥적", Text2: "계획적", Answer: -1 }
                    ],
                    Results : [
                        { answer: "INFP", code: "0000" },
                        { answer: "INFJ", code: "0001" },
                        { answer: "INTP", code: "0010" },
                        { answer: "INTJ", code: "0011" },
                        { answer: "ISFP", code: "0100" },
                        { answer: "ISFJ", code: "0101" },
                        { answer: "ISTP", code: "0110" },
                        { answer: "ISTJ", code: "0111" },
                        { answer: "ENFP", code: "1000" },
                        { answer: "ENFJ", code: "1001" },
                        { answer: "ENTP", code: "1010" },
                        { answer: "ENTJ", code: "1011" },
                        { answer: "ESFP", code: "1100" },
                        { answer: "ESFJ", code: "1101" },
                        { answer: "ESTP", code: "1110" },
                        { answer: "ESTJ", code: "1111" }
                    ],
                    bQ1Visible : false,
                    bQ2Visible : false,
                    bQ3Visible : false,
                    bQ4Visible : false,
                    // Option - setTimeout 으로 질문이 뜨고 5초간 입력을 못하도록 editable="false" 값을 초기값으로 가지는 프로퍼티
                    bQ1DelaySelect : false,
                    bQ2DelaySelect : false,
                    bQ2DelaySelect : false,
                    bQ2DelaySelect : false
                })
                this.getView().setModel(oViewThreeModel, "ViewThreeModel");

                this.getOwnerComponent().getRouter().getRoute("View3").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "3");
            },

            /**
             * 처음 검사 시작버튼 이벤트
             */
            onPressStart: function() {
                this.getView().getModel("ViewThreeModel").setProperty("/bQ1Visible", true);
                var oGroup = this.getView().byId("groupA");
                this._answerTimer(oGroup);
            },

            onSelected: function(oEvent, qNum) {
                var qBoxPath;
                var oButton = this.getView().byId("buttonResult");
                var oGroup;

                switch (qNum) {
                    case '1':
                        qBoxPath = "/bQ2Visible"
                        this.getView().getModel("ViewThreeModel").setProperty(qBoxPath, true);
                        oGroup = this.getView().byId("groupB");
                        break;
                    case '2':
                        qBoxPath = "/bQ3Visible"
                        this.getView().getModel("ViewThreeModel").setProperty(qBoxPath, true);
                        oGroup = this.getView().byId("groupC");
                        break;
                    case '3':
                        qBoxPath = "/bQ4Visible"
                        this.getView().getModel("ViewThreeModel").setProperty(qBoxPath, true);
                        oGroup = this.getView().byId("groupD");
                        break;
                    case '4': // 결과 버튼을 위한 처리
                        if ( !oButton.getEnabled() ){
                            oButton.setEnabled(true);
                            oButton.setType("Emphasized");
                        }
                        break;
                    default:
                        break;
                }
                
                this._answerTimer(oGroup);
            },

            _answerTimer: function(oGroup) {
                setTimeout(function(){
                    oGroup.setEditable(true);
                }, 2000);
            },

            onResult: function() {
                var sResult = "";
                var sOutput = "";
                var oModel = this.getView().getModel("ViewThreeModel");
                var aQuestions = oModel.getProperty("/Questions");
                var aResults = oModel.getProperty("/Results");
                
                // 4자리 코드로 결과 추출
                for( var i=0; i<aQuestions.length; i++) {
                    sResult = sResult + aQuestions[i]["Answer"];
                }

                switch (sResult) {
                    case aResults[0].code:
                        sOutput = aResults[0].answer;
                        break;
                    case aResults[1].code:
                        sOutput = aResults[1].answer;
                        break;
                    case aResults[2].code:
                        sOutput = aResults[2].answer;
                        break;
                    case aResults[3].code:
                        sOutput = aResults[3].answer;
                        break;
                    case aResults[4].code:
                        sOutput = aResults[4].answer;
                        break;
                    case aResults[5].code:
                        sOutput = aResults[5].answer;
                        break;
                    case aResults[6].code:
                        sOutput = aResults[6].answer;
                        break;
                    case aResults[7].code:
                        sOutput = aResults[7].answer;
                        break;
                    case aResults[8].code:
                        sOutput = aResults[8].answer;
                        break;
                    case aResults[9].code:
                        sOutput = aResults[9].answer;
                        break;
                    case aResults[10].code:
                        sOutput = aResults[10].answer;
                        break;
                    case aResults[11].code:
                        sOutput = aResults[11].answer;
                        break;
                    case aResults[12].code:
                        sOutput = aResults[12].answer;
                        break;
                    case aResults[13].code:
                        sOutput = aResults[13].answer;
                        break;
                    case aResults[14].code:
                        sOutput = aResults[14].answer;
                        break;
                    case aResults[15].code:
                        sOutput = aResults[15].answer;
                        break;
                
                    default:
                        break;
                }
                MessageBox.confirm(sOutput);
            }
        });
    });
