sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("demo.ZMasterDetailApp.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demo.ZMasterDetailApp.view.Master
		 */
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("DemoData");
			this.getView().setModel(oModel);

			var oList = this.getView().byId("list123");
			oList.attachUpdateFinished(function (oEvent) {

				oEvent.getSource().getItems()[0].firePress();
			});

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onItemPress: function (oEvent) {

			var obj = oEvent.getSource().getBindingContext().getObject();
			//Get the Model. 
			this.getRouter().navTo("detail", {
				RequestNo: obj.RequestNo
			});
		},

		// Start of Search
		onSearch: function (oEvent) {

			var oList = oEvent.getSource().getValue();
			if (oList && oList.length > 0) {

				var oFilter1 = new sap.ui.model.Filter("RequestNo", sap.ui.model.FilterOperator.Contains, oList);
				var oFilter2 = new sap.ui.model.Filter("Workcenter", sap.ui.model.FilterOperator.Contains, oList);
				var oFilter3 = new sap.ui.model.Filter("Priority", sap.ui.model.FilterOperator.Contains, oList);

				var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3], false);
			}
			var obinding = this.getView().byId("list123").getBinding("items");
			obinding.filter(allFilter);
		},

		//End of Search

		//Sorting Start Here
		onSorting: function (oEvent) {
			var oList = this.getView().byId("list123");
			var oBinding = oList.getBinding("items");
			var SORTKEY = "RequestNo";

			var flag = this.flagval;
			var DESCENDING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				DESCENDING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				DESCENDING = false;
				this.flagval = 0;
			}

			var GROUP = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));
			oBinding.sort(aSorter);

		},

		// End Sorting

		//Start of Grouping
		onGrouping: function (oEvent) {
			var oList = this.getView().byId("list123");
			var oBinding = oList.getBinding("items");
			var SORTKEY = "Priority";

			var flag = this.flagval;
			var GROUPING = "";
			if (this.flagval === 0 || this.flagval === undefined) {
				GROUPING = true;
				this.flagval = 1;
			} else if (flag === 1) {
				GROUPING = false;
				this.flagval = 0;
			}

			var DESCENDING = false;
			var aSorter = [];
			aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUPING));
			oBinding.sort(aSorter);

		},

		// End Sorting
		//NAvigation to Detail Page
		onAdd: function () {
			this.getRouter().navTo("DetailDetail", {}, true);
		},
		
		


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf demo.ZMasterDetailApp.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf demo.ZMasterDetailApp.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demo.ZMasterDetailApp.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});