Ext.define('moneyworld.controller.SummaryViewLifeExpectancy', {
	extend: 'moneyworld.controller.SummaryView',

	config: {
		refs: {
			mainView: 'main',
			summaryViewLifeExpectancy: 'summaryview_lifeExpectancy'
		},
		control: {
			'summaryViewLifeExpectancy': {
				// initialize: 'init',
				// initialize: 'initHack',
				// painted: 'testFn',
				woohoo: 'myDrawFunctionHack',
				// painted: 'myDrawFunctionHack'
				// add: 'renderView'
				//trying to bind to the event when the outer container actually gets drawn. BUt this is not working. 
			}
		}
	},
	testFn: function() {
		alert("success")
	},
	myCanvasObj: null,
	counter: 0,
	renderView: function() {
		// testing if I can access the canvas I included in html instead of creating it here.
		containerObj = document.getElementById("testtesttest");
		console.log(containerObj);
		ctx = containerObj.getContext('2d');
		ctx.rect(0, 0, 1150, 1100);
		ctx.fillStyle = "red";
		ctx.fill();
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
		var canvasObj = new Ext.draw.engine.Canvas({
			id: 'myCanvasLifeExpectancy',
			region: [0, 0, screen.availWidth, screen.availHeight] // this is the whole region of the canvas.
			// region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
		});
		this.getSummaryViewLifeExpectancy().add(canvasObj);
		this.myCanvasObj = canvasObj;
		var canvas = canvasObj['canvases'][0]['dom'];
		canvas.id = "testtest"; // another hack. An alternative is to refer to the wrapper object and get the canvas out
		// this.myDrawFunctionHack(this.myCanvasObj);

	},
	myDrawFunctionHack: function() {
		// if (this.canvasObj == null) {alert(this.counter++); return;}
		// var canvas = this.canvasObj['canvases'][0]['dom'];
		// canvas.id = "testtest"; // another hack. An alternative is to refer to the wrapper object and get the canvas out
		// var ctx = canvas.getContext("2d");
		// var prop = 0.20;
		// var adult_prop = 0.05;
		// var offsetY = 20;
		// canvas.height = (300+ offsetY).toString(); // this will set the drawing area., this will scale into the region setting
		// // as a hack, add 50 to whatever canvas height you actually want (this will offset the nav bar)
		// canvas.width = '400';
		// alert(1);

		// I have decided to use another graphing library because the charts provided by sencha is too inflexible and too complicated
		var bar = new RGraph.Bar('testtesttest', [
			[5.33, 2.33, 3.32],
			[3.42, 2.23, 4.23],
			[4.23, 3.23, 4.99],
			[7.99, 2.98, 2.35],
			[2.75, 1.02, 5.24]
		])
			.Set('grouping', 'stacked')
			.Set('labels', ['John', 'James', 'Fred', 'Luke', 'Luis'])
			.Set('labels.above', true)
			.Set('labels.above.decimals', 2)
			.Set('linewidth', 2)
			.Set('strokestyle', 'white')
			.Set('colors', ['Gradient(#4572A7:#66f)', 'Gradient(#AA4643:white)', 'Gradient(#89A54E:white)'])
			.Set('shadow', true)
			.Set('shadow.offsetx', 1)
			.Set('shadow.offsety', 1)
			.Set('shadow.blue', 5)
			.Set('hmargin', 25)
			.Set('gutter.left', 45)
			.Set('background.grid.vlines', false)
			.Set('background.grid.border', false)
			.Set('axis.color', '#ccc')
			.Set('noyaxis', true)

		.Set('key', ['Monday', 'Tuesday', 'Wednesday'])
			.Set('key.position.gutter.boxed', true)
			.Set('key.position', 'gutter');

		bar.Set('key.position.x', bar.canvas.width - 300)
			.Set('key.position.y', 20)
			.Set('key.colors', ['blue', '#c00', '#0c0'])

		.ondraw = function(obj) {
			for (var i = 0; i < obj.coords.length; ++i) {
				obj.context.fillStyle = 'white';
				RGraph.Text(obj.context, 'Verdana', 10, obj.coords[i][0] + (obj.coords[i][2] / 2), obj.coords[i][1] + (obj.coords[i][3] / 2), obj.data_arr[i].toString(), 'center', 'center', null, null, null, true);
			}
		}

		bar.Draw();
		// ctx.font="20px Georgia";
		// // console.log(canvas.height, canvas.width);

		// // draw the background 
		// ctx.save();
		// var image2 = new Image();
		// image2.src = 'resources/images/tomb.png';
		// image2.onload = function() {
		// 	// draw for infant
		// 	ctx.drawImage(image2, 0, offsetY + image2.height / 2, image2.width, image2.height / 2);
		// 	ctx.fillText((prop*100).toString() + "%", 85,offsetY + image2.height / 2 + image2.height / 4);
		// 	// draw for adult
		// 	ctx.drawImage(image2, image2.width, offsetY, image2.width, image2.height);
		// 	ctx.fillText((adult_prop*100).toString() + "%", 85 + image2.width ,offsetY + image2.height / 4);
		// }

		// // Draw the coloured version
		// var image = new Image();
		// image.src = 'resources/images/tomb_coloured.png';
		// image.onload = function() {
		// 	//draw for infant
		// 	clipT = (1 - prop) * image.height / 2;
		// 	ctx.rect(0, offsetY + (image.height / 2) + clipT, image.width, prop * image.height / 2);
		// 	ctx.clip();
		// 	ctx.drawImage(image, 0, offsetY +image.height / 2, image.width, image.height / 2);
		// 	ctx.restore();
		// ctx.save();

		// 	// draw for adult
		// clipT = (1 - adult_prop) * image.height;
		// ctx.rect(image.width, offsetY + clipT, image.width, adult_prop * image.height);
		// ctx.clip();
		// ctx.drawImage(image, image.width, offsetY, image.width, image.height);
		// ctx.restore();
		// }
	}
});