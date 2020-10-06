sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("demo.ZMasterDetailApp.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailApp.view.Detail
		 */
		onInit: function () {

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detail").attachPatternMatched(this.onEditMatched, this);

			var oModel = this.getOwnerComponent().getModel("DemoData");
			this.getView().setModel(oModel);

		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters(); // get parameter 
			var oModelData = this.getOwnerComponent().getModel("DemoData"); //get the data from model 
			this.getView().setModel(oModelData); //set the data to model
			var oModel = this.getView().getModel();
			
		
			var ReqNo = this.getView().byId("TxtReqno");
			var PlantName = this.getView().byId("Txtplantname");
			var Workcenter = this.getView().byId("Txtwrkcntr1");
			var Priority = this.getView().byId("Txtpriority1");
			var Date = this.getView().byId("Txtdate1");
			var ReqRsn = this.getView().byId("Txtreqrsn1");
			var AssTo = this.getView().byId("Txtassignto1");
			var WrkcNm = this.getView().byId("Txtwrkcentr1");
			var MachineName = this.getView().byId("Txtmachinename1");

			if (oParameters.arguments.RequestNo !== "" || oParameters.arguments.RequestNo !== null) {
				this.RequestNo = oParameters.arguments.RequestNo;
				if (oModel.getData().DemoList.length > 0) {
					for (var i = 0; i < oModel.getData().DemoList.length; i++) {
						if (oModel.getData().DemoList[i].RequestNo.toString() === this.RequestNo) {
							ReqNo.setText(this.RequestNo);
							PlantName.setText(oModel.getData().DemoList[i].PlantName);
							Workcenter.setText(oModel.getData().DemoList[i].Workcenter);
							Priority.setText(oModel.getData().DemoList[i].Priority);
							Date.setText(oModel.getData().DemoList[i].Date);
							ReqRsn.setText(oModel.getData().DemoList[i].RequestReason);
							AssTo.setText(oModel.getData().DemoList[i].AssignTo);
							WrkcNm.setText(oModel.getData().DemoList[i].Workcenter);
							MachineName.setText(oModel.getData().DemoList[i].MachineName);
							return false;
						}
					}
				}

			} else {
				MessageBox.error("Data Not available");
			}
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnEdit: function (oEvent) {
			//	var obj = oEvent.getSource().getBindingContext().getObject();
				var ReqNo = this.getView().byId("TxtReqno").getText();
				//Get the Model. 
				this.getRouter().navTo("detaildetail", {
					RequestNo: ReqNo
				});
			}
			/*_onDetailMatched: function (oEvent) {

	var oModel = new sap.ui.model.odata.v2.oDataModel("/V2/Northwind/Northwind.svc/V2/Northwind/Northwind.svc/",true);
			var custID = oEvent.getParameter.arguments.custID;

			oModel.read("/Customers(" + custID + ")");

		}*/


	
	

	});

});