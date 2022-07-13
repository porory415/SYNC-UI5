sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View2", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                
                var oViewTwoModel = new JSONModel({
                    OperationLog : [
                        { menuId: "0001", createdBy : "이사람", modifiedBy : "이사람", deletedBy: "", status: "Created" },
                        { menuId: "0002", createdBy : "김사람", modifiedBy : "이사람", deletedBy: "이사람", status: "Deleted" },
                        { menuId: "0004", createdBy : "최사람", modifiedBy : "최사람", deletedBy: "", status: "Draft" },
                        { menuId: "0005", createdBy : "박사람", modifiedBy : "박사람", deletedBy: "박사람", status: "Deleted" },
                        { menuId: "0008", createdBy : "김사람", modifiedBy : "최사람", deletedBy: "", status: "Modified" }]
                })
                this.getView().setModel(oViewTwoModel, "ViewTwoModel");
                
                this.getOwnerComponent().getRouter().getRoute("View2").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "2");
            },

            onChangeText: function() {
                /**
                 * string.prototype.slice substring 등 의 string 프로토타입 메소드를 사용하여 이름의 맨 앞자리 글자만 추출 후 ** 두개만 붙여주기
                 * 이름이 [박 아무개] 같이 3자리의 이름을 입력해도 ** 두개로 변경
                 */

                var oInput = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var sValue = oInput.getValue();
                var sFormatted = "";
                sFormatted = sValue.slice(0,1) + "**";
                
                oInput2.setValue(sFormatted);
            },

            onChangeAllNames : function() {
                /**
                 * OperationLog 배열 내부의 객체의 프로퍼티들을 읽고 이름이라고 판단되면 이름 부분만 마스킹처리
                 * 이름을 판단하는 기준은 3글자의 문자열 (한글인지 영어인지 구분까지는 필요없음)
                 */
                
                var oViewTwoModel = this.getView().getModel("ViewTwoModel");
                var aLog = oViewTwoModel.getProperty("/OperationLog");
                var iLength = aLog.length;

                for (var i=0; i<iLength; i++) {
                    var oRow = aLog[i];
                    for (var key in oRow){
                        // key oRow 안에 있는 프로퍼티 키 이름이 순서대로 들어옴
                        // oRow["menuId"] oRow.menuId
                        var sValue = oRow[key];
                        if (sValue.length === 3){
                            var sFormatted = "";
                            var sPath = "/OperationLog/"+ i + "/" + key;

                            sFormatted = sValue.slice(0,1) + "**";
                            oViewTwoModel.setProperty(sPath, sFormatted); // 해당 주소에 반영
                        }
                    }
                   
                }
            }
        });
    });
