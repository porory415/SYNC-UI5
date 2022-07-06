sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    // "sap/ui/core/mvc/Controller",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/sync/ui5training/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"../model/formatter", // ../ <- 상위폴더
    
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Fragment, MessageToast, History, UIComponent) {
        "use strict";

        return BaseController.extend("sap.sync.ui5training.controller.View3", {
            formatter: formatter,
            onInit: function () {
                var oViewData= {
                    htmlContent: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Oxjmb9rAsn8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                };
                var oViewModel = new JSONModel(oViewData);
                this.getView().setModel(oViewModel);

                var oRouter = this.getRouter();
                oRouter.getRoute("View3").attachPatternMatched(this._onRouteMatched, this);
     
            },
            _onRouteMatched: function(oEvent) {
                // console.log("Matched!")  //화면에 올 때마다 처리되는 기능
                console.log(oEvent.getParameter("arguments"));
                var oArg = oEvent.getParameter("arguments");
                var sName = oArg.name;

                this.getView().byId("displayParam").setText(sName);  //직전화면에서 전달한 파라미터를 읽어옴

            },

            getRouter: function() {
                return UIComponent.getRouterFor(this);
            },

            // onNavBack: function () {
            //     var oHistory, sPreviousHash;
    
            //     oHistory = History.getInstance();
            //     sPreviousHash = oHistory.getPreviousHash();     //내가 첫 화면인지 체크하려고
    
            //     if (sPreviousHash !== undefined) {
            //         window.history.go(-1);
            //     } else {  //내가 첫화면일 경우, 새로고침, url직접입력
            //         this.getRouter().navTo("RouteView1", {name:"LEE"}, true /*no history*/);
            //     }
            // }
                
          
        });
    
    });
                
