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

	return Controller.extend("demo.ZMasterDetailApp.controller.DetailDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailApp.view.DetailDetail
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detaildetail").attachPatternMatched(this.onEditMatched, this);
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnNavBack: function () {
				var that = this;
			that.OnReset();
			this.getRouter().navTo("FirstPage", {}, true);

		},

		OnClose: function () {
				var that = this;
			that.OnReset();
			this.getRouter().navTo("FirstPage", {}, true);

		

		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters(); // get parameter 
			var oModelData = this.getOwnerComponent().getModel("DemoData"); //get the data from model 
			this.getView().setModel(oModelData); //set the data to model
			var oModel = this.getView().getModel();

			var ReqNo = this.getView().byId("txtReqNo");
			var PlantName = this.getView().byId("txtpltnm");
			var Workcenter = this.getView().byId("txtwrkcnt");
			var Priority = this.getView().byId("txtPri");
			var Date = this.getView().byId("DP2");
			var ReqRsn = this.getView().byId("txtReqrsn");
			var AssTo = this.getView().byId("txtAssngto");
			var WrkcNm = this.getView().byId("txtwrkcnt");
			var MachineName = this.getView().byId("txtmchnm");

			if (oParameters.arguments.RequestNo !== "" || oParameters.arguments.RequestNo !== null) {
				this.RequestNo = oParameters.arguments.RequestNo;
				if (oModel.getData().DemoList.length > 0) {
					for (var i = 0; i < oModel.getData().DemoList.length; i++) {
						if (oModel.getData().DemoList[i].RequestNo.toString() === this.RequestNo) {
							ReqNo.setValue(this.RequestNo);
							PlantName.setValue(oModel.getData().DemoList[i].PlantName);
							Workcenter.setValue(oModel.getData().DemoList[i].Workcenter);
							Priority.setValue(oModel.getData().DemoList[i].Priority);
							Date.setValue(oModel.getData().DemoList[i].Date);
							ReqRsn.setValue(oModel.getData().DemoList[i].RequestReason);
							AssTo.setValue(oModel.getData().DemoList[i].AssignTo);
							WrkcNm.setValue(oModel.getData().DemoList[i].Workcenter);
							MachineName.setValue(oModel.getData().DemoList[i].MachineName);
							return false;
						}
					}
				}

			} else {
				MessageBox.error("Data Not available");
			}
		},

		OnSave: function () {
			var that = this;
			var ReqNo = this.getView().byId("txtReqNo");
			if (ReqNo.getValue() === "0") {
				that._onSaveData();

			} else {
				that._onUpdateData();
			}
		},
		
		
			
		_onSaveData: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var NPlntNm = this.getView().byId("txtpltnm");
			var NMcnNm = this.getView().byId("txtmchnm");
			var Nwrkcnt = this.getView().byId("txtwrkcnt");
			var NPrio = this.getView().byId("txtPri");

			var NDate = this.getView().byId("DP2");
			var NReqRsn = this.getView().byId("txtReqrsn");
			var NAssnto = this.getView().byId("txtAssngto");

			if (NPlntNm.getValue() === "" || NMcnNm.getValue() === "" || Nwrkcnt.getValue() === "" || NPrio.getSelectedKey() === ""
	||	NDate.getValue() === "" || NReqRsn.getValue() === "" || NAssnto.getValue() === ""	) {
				MessageToast.show("Please fill all  required Data");
			} else {
				// Get the Model in the view 
				var oModelDemo = this.getOwnerComponent().getModel("DemoData");
				this.getView().setModel(oModelDemo);

				var oModel = this.getView().getModel();

				// Get the Number of records in file
				var ReqNumber = oModel.getProperty("/DemoList").length;

				var NewReqNo = ReqNumber + 1;
				var oNewEntry = {};

				oNewEntry = {
					"RequestNo": NewReqNo,
					"PlantName": NPlntNm.getValue(),
					"MachineName": NMcnNm.getValue(),
					"Workcenter": Nwrkcnt.getValue(),
					"Priority": NPrio.getSelectedKey(),
					"Date": NDate.getValue(),
					"RequestReason": NReqRsn.getValue(),
					"AssignTo": NAssnto.getValue()
				};

				var oModelMaintanace = oModel.getProperty("/DemoList");
				oModelMaintanace.push(oNewEntry);
				oModel.setProperty("/DemoList", oModelMaintanace);
				

				MessageBox.confirm("Do you want to add new data?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("FirstPage");
						that.OnReset();
						}
					}
				});
			}
		}, 

		_onUpdateData: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var reqno = this.getView().byId("txtReqNo");
			var NPlntNm = this.getView().byId("txtpltnm");
			var NMcnNm = this.getView().byId("txtmchnm");
			var Nwrkcnt = this.getView().byId("txtwrkcnt");
			var NPrio = this.getView().byId("txtPri");

			var NDate = this.getView().byId("DP2");
			var NReqRsn = this.getView().byId("txtReqrsn");
			var NAssnto = this.getView().byId("txtAssngto");

			if (NPlntNm.getValue() === "") {
				MessageToast.show(" Plant name is required");
			} else {
				// Get the Model in the view 
				var oModelDemo = this.getOwnerComponent().getModel("DemoData");
				this.getView().setModel(oModelDemo);

				var oModel = this.getView().getModel();
				var oModelEmpLength = oModel.getProperty("/DemoList");
				for (var i = 0; i < oModel.getData().DemoList.length; i++) {
					if (oModel.getData().DemoList[i].RequestNo.toString() === reqno.getValue()) {
						oModel.getData().DemoList[i].RequestNo = reqno.getValue();
						oModel.getData().DemoList[i].PlantName = NPlntNm.getValue();
						oModel.getData().DemoList[i].MachineName = NMcnNm.getValue();
						oModel.getData().DemoList[i].Workcenter = Nwrkcnt.getValue();
						oModel.getData().DemoList[i].Priority = NPrio.getSelectedKey();
						oModel.getData().DemoList[i].Date = NDate.getValue();
						oModel.getData().DemoList[i].RequestReason = NReqRsn.getValue();
						oModel.getData().DemoList[i].AssignTo = NAssnto.getValue();
					} else {
						oModel.getData().DemoList[i].RequestNo = oModel.getData().DemoList[i].RequestNo;
						oModel.getData().DemoList[i].PlantName = oModel.getData().DemoList[i].PlantName;
						oModel.getData().DemoList[i].MachineName = oModel.getData().DemoList[i].MachineName;
						oModel.getData().DemoList[i].Workcenter = oModel.getData().DemoList[i].Workcenter;
						oModel.getData().DemoList[i].Priority = oModel.getData().DemoList[i].Priority;
							oModel.getData().DemoList[i].Date = oModel.getData().DemoList[i].Date;
						oModel.getData().DemoList[i].RequestReason = oModel.getData().DemoList[i].RequestReason;
						oModel.getData().DemoList[i].AssignTo = oModel.getData().DemoList[i].AssignTo;

					}
				}

				oModel.setProperty("/DemoList", oModelEmpLength);
				MessageBox.confirm("Do you want to Update ", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("FirstPage");
							that.OnReset();
						}
					}
				});
			}
		},

		OnReset: function () {
			var ReqNo = this.getView().byId("txtReqNo");
			var PlnatNm = this.getView().byId("txtpltnm");
			var MachineNm = this.getView().byId("txtmchnm");
			var wrkcntr = this.getView().byId("txtwrkcnt");
			var prirt = this.getView().byId("txtPri");
			var Date = this.getView().byId("DP2");
			var reqrssn = this.getView().byId("txtReqrsn");
			var Assgnto = this.getView().byId("txtAssngto");

			ReqNo.setValue(0);
			PlnatNm.setValue("");
			MachineNm.setValue("");
			wrkcntr.setValue("");
			prirt.setValue("");
			Date.setValue("");
			reqrssn.setValue("");
			Assgnto.setValue("");

		},


//for plant

		_handleValueHelpPlantData: function (oEvent) {

			var oModelPlant = this.getOwnerComponent().getModel("PlantSet");
			this.getView().setModel(oModelPlant);

			var sInputValuePlant = oEvent.getSource().getValue();

			this.inputPlantId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPlant) {
				this._valueHelpDialogPlant = sap.ui.xmlfragment(
					"demo.ZMasterDetailApp.fragments.plant", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogPlant);
			}

			// create a filter for the binding

			this._valueHelpDialogPlant.getBinding("items").filter([new sap.ui.model.Filter(
				"PlantName",
				sap.ui.model.FilterOperator.Contains, sInputValuePlant
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogPlant.open(sInputValuePlant);
		},
		_handleValueHelpSearchPlant: function (evt) {
			var sValuePlant = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"PlantName",
				sap.ui.model.FilterOperator.Contains, sValuePlant
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleValueHelpClosePlant: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var PlantInput = this.getView().byId(this.inputPlantId);
				PlantInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},

		//for Workcenter

		_handleValueHelpWorkcenter: function (oEvent) {

			var oModelWorkcenter = this.getOwnerComponent().getModel("WorkcenterDataSet");
			this.getView().setModel(oModelWorkcenter);

			var sInputValueWorkcenter = oEvent.getSource().getValue();

			this.inputWorkcenterId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogWorkcenter) {
				this._valueHelpDialogWorkcenter = sap.ui.xmlfragment(
					"demo.ZMasterDetailApp.fragments.workcenter", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogWorkcenter);
			}

			// create a filter for the binding

			this._valueHelpDialogWorkcenter.getBinding("items").filter([new sap.ui.model.Filter(
				"Workcenter",
				sap.ui.model.FilterOperator.Contains, sInputValueWorkcenter
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogWorkcenter.open(sInputValueWorkcenter);
		},
		_handleValueHelpSearchWorkcenter: function (evt) {
			var sValueWorkcenter = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"Workcenter",
				sap.ui.model.FilterOperator.Contains, sValueWorkcenter
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleValueHelpCloseWorkcenter: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var workcenterInput = this.getView().byId(this.inputWorkcenterId);
				workcenterInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},
		
		//for Machine

		_handleValueHelpMachineData: function (oEvent) {

			var oModelMAchine = this.getOwnerComponent().getModel("MachineDataSet");
			this.getView().setModel(oModelMAchine);

			var sInputValueMachine = oEvent.getSource().getValue();

			this.inputMachineId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMachine) {
				this._valueHelpDialogMachine = sap.ui.xmlfragment(
					"demo.ZMasterDetailApp.fragments.machine", //id.fragments.file.name ---take id from manifest.json
					this
				);
				this.getView().addDependent(this._valueHelpDialogMachine);
			}

			// create a filter for the binding

			this._valueHelpDialogMachine.getBinding("items").filter([new sap.ui.model.Filter(
				"MachineName",
				sap.ui.model.FilterOperator.Contains, sInputValueMachine
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogMachine.open(sInputValueMachine);
		},
		_handleValueHelpSearchMachine: function (evt) {
			var sValueMachine = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"MachineName",
				sap.ui.model.FilterOperator.Contains, sValueMachine
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleValueHelpCloseMachine: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var MachineInput = this.getView().byId(this.inputMachineId);
				MachineInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		},


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetailApp.view.DetailDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetailApp.view.DetailDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetailApp.view.DetailDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});