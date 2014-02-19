Ext.define('moneyworld.controller.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewLifeExpectancy: 'summaryview_lifeExpectancy'
		},
		control: {
			'summaryViewLifeExpectancy': {
				initialize: 'renderView'
			}
		}
	},

	renderView: function() {
		var canvasObj = new Ext.draw.engine.Canvas();
		canvasObj.setHeight('100%');
		console.log(canvasObj.getHeight());
		// this is a hack to get the canvas object created
		var canvas = canvasObj['canvases'][0]['dom'];
		var ctx = canvas.getContext("2d");
		var prop = 0.20;
		var adult_prop = 0.05;
		var image2 = new Image();
		canvas.height='485';
		canvas.width='320';
		console.log(canvas);
		console.log(canvas.width);
		console.log(canvas.height);
		image2.src = 'resources/images/tomb.png';
		image2.onload = function() {
			// draw for infant
			ctx.drawImage(image2, 0, image2.height / 2, image2.width, image2.height / 2);
			// draw for adult
			ctx.drawImage(image2, image2.width, 0, image2.width, image2.height);
		}
		ctx.save();
		var image = new Image();
		image.src = 'resources/images/tomb_coloured.png';
		image.onload = function() {
			//draw for infant
			clipT = (1 - prop) * image.height / 2;
			ctx.rect(0, image.height / 2 + clipT, image.width, prop * image.height / 2);
			ctx.clip();
			ctx.drawImage(image, 0, image.height / 2, image.width, image.height / 2);
			ctx.restore();
			// draw for adult
			clipT = (1 - adult_prop) * image.height;
			ctx.rect(image.width, clipT, image.width, adult_prop * image.height);
			ctx.clip();
			ctx.drawImage(image, image.width, 0, image.width, image.height);
			ctx.restore();
		}
		this.getSummaryViewLifeExpectancy().add(canvasObj);
	}
});