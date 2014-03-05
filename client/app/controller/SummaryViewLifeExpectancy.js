Ext.define('moneyworld.controller.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewLifeExpectancy: 'summaryview_lifeExpectancy'
		},
		control: {
			'summaryViewLifeExpectancy': {
				initialize: 'initHack',
			}
		}
	},
	myCanvasObj: null,
	currentLifeExpectancy: null,
	renderView: function() {
		var settingsStore = Ext.getStore('Settings');
		var dataSetsStore = Ext.getStore('DataSets');
		var dataPointsStore;

		var currentCountry;
		var currentRegion;

		var preHtmlString = this.preHtmlString;
		var postHtmlString = this.postHtmlString;

		var settingsRecords = [];
		var dataPointsRecords = [];

		settingsStore.load({
			callback: loadDataSetsStore,
			scope: this
		});

		function loadDataSetsStore(records, operations, success) {
			settingsRecords = records;
			currentCountry = records[0].get('countryCode');
			postHtmlString += records[0].get('countryName');
			currentRegion = records[0].get('region');
			dataSetsStore.load({
				callback: loadDataPointsStore,
				scope: this
			});
		}

		function loadDataPointsStore(records, operation, success) {
			dataSetsRecords = records;
			dataPointsStore = moneyworld.utils.Functions.getServerStore(
				this.getSummaryViewLifeExpectancy().getDataSet(),
				"all",
				currentCountry);
			dataPointsStore.load({
				callback: setData,
				scope: this
			});
		}

		function setData(records, operation, success) {

			// Visualisation code starts here
			dataPointsStore.sort([{
				property: 'year',
				direction: 'ASC'
			}]);
			var dataSetID = this.getSummaryViewLifeExpectancy().getDataSet();
			dataPointsStore.filter([
				Ext.create('Ext.util.Filter', {
					property: 'countryCode',
					value: currentCountry
				}),
				Ext.create('Ext.util.Filter', {
					property: 'dataSetCode',
					value: dataSetID
				})
			]);
			var currentLifeExpectancy = dataPointsStore.last().get('value');
			this.currentLifeExpectancy = moneyworld.utils.Functions.prettify(currentLifeExpectancy, 1,"","");
			var dataStoreRecord = dataSetsStore.findRecord('id', dataSetID);
			if (this.myCanvasObj != undefined){
				var canvas = this.myCanvasObj['canvases'][0]['dom'];
				this.myDrawFunctionHack(canvas);
			}
		}
	},
	initHack: function() {
		var containerObj = Ext.get("summaryview_lifeExpectancy");
		var canvasObj = new Ext.draw.engine.Canvas({
			id: 'myCanvasLifeExpectancy',
			region: [0, 50, document.body.clientWidth, Math.min(document.body.clientWidth * 1.3, document.body.clientHeight - 76)] // this is the whole region of the canvas.
			// region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
		});
		this.getSummaryViewLifeExpectancy().add(canvasObj);
		this.myCanvasObj = canvasObj;
		this.renderView();
	},
	myDrawFunctionHack: function(canvas) {
		canvas.height = 390;
		canvas.width = 300;
		canvas.top = 50;

		var lifeExpectancy = this.currentLifeExpectancy;
		var ctx = canvas.getContext("2d");
		var imageSource = "resources/images/cake.png";

		var cake = new Image();
		cake.src = imageSource;
		cake.onload = function() {
			ctx.drawImage(cake, 0, 0, 300, cake.height / cake.width * 300);
			ctx.rotate(18 * Math.PI / 180);
			ctx.font = "bold 40px sans-serif";
			ctx.fillStyle = "#666";
			ctx.fillText(lifeExpectancy + " years", 110, 95);

		};

	}
});