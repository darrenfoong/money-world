Ext.define('moneyworld.controller.InfoView', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mainView: 'main',
			infoView: 'infoview'
		},
		control: {
			'infoView': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
		console.log("Loading InfoView");

		var dataSetsStore = Ext.getStore('DataSets');
		dataSetsStore.load({ callback: loadInfo, scope: this });

		function loadInfo(records, operation, success) {
			var currentDataSet = dataSetsStore.findRecord('id', this.getInfoView().getDataSet());
			var currentDataSetName = currentDataSet.get('name');
			var currentDataSetDescription = currentDataSet.get('description');

			moneyworld.utils.Functions.changeTitle(this.getInfoView(), this.getMainView(), currentDataSetName);
			var htmlString = "<h1 class='infoview-title'>" + currentDataSetName + "</h1><p class='infoview-text'>" + currentDataSetDescription + "</p>";
			console.log(htmlString);
			this.getInfoView().setHtml(htmlString);
		}
	}
});
