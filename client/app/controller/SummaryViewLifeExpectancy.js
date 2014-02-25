Ext.define('moneyworld.controller.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewLifeExpectancy: 'summaryview_lifeExpectancy'
		},
		control: {
			'summaryViewLifeExpectancy': {
				initialize: 'initHack'
				// painted: 'myDrawFunctionHack'
			}
		}
	},
	testFn: function() {
		alert("success")
	},
	myCanvasObj: null,
	counter: 0,
	renderView: function() {

	},
	// init: function() {
	// 	containerObj = Ext.get("summaryview_lifeExpectancy");
	// 	if (containerObj !== null) {
	// 		containerH = containerObj.getHeight();
	// 		containerW = containerObj.getWidth();
	// 		//Ext.getBody().getViewSize().height
	// 		console.log(containerW || containerH);
	// 		if (containerW || containerH !== 0) {
	// 			// we test if the height and width are not zero
	// 			var canvasObj = new Ext.draw.engine.Canvas({
	// 				region: [0, 0, containerW, containerH] // this is the whole region of the canvas.
	// 				// region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
	// 			});
	// 			this.getSummaryViewLifeExpectancy().add(canvasObj);
	// 			this.myCanvasObj = canvasObj;
	// 			this.myDrawFunctionHack(this.myCanvasObj);
	// 		}
	// 	}
	// },
	initHack: function() {
		var containerObj = Ext.get("summaryview_lifeExpectancy");

		var canvasObj = new Ext.draw.engine.Canvas({
			id: 'myCanvasLifeExpectancy',
			region: [0, 0, document.body.clientWidth, Math.min(document.body.clientWidth*1.3,document.body.clientHeight-76)] // this is the whole region of the canvas.
			// region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
		});
		this.getSummaryViewLifeExpectancy().add(canvasObj);
		this.myCanvasObj = canvasObj;
		var canvas = canvasObj['canvases'][0]['dom'];
		this.myDrawFunctionHack(canvas);

	},
	myDrawFunctionHack: function(canvas) {
		canvas.height = 390;
		canvas.width = 300;
		
		var lifeExpectancy = 70;
		
		var ctx = canvas.getContext("2d");
		
		var imageSource = "resources/images/cake.png";
		
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0,0,150,300);
		
		var cake = new Image();
		cake.src = imageSource;
		cake.onload = function () {
			ctx.drawImage(cake, 0, 0, 300, cake.height / cake.width * 300);
			
			ctx.rotate(18*Math.PI/180);

			
			ctx.font = "bold 45px sans-serif";
			ctx.fillStyle = "#666";
			ctx.fillText(lifeExpectancy + " years", 110, 95);
			
		};

	}
});