Ext.define('moneyworld.controller.SummaryViewMortality', {
    extend: 'moneyworld.controller.SummaryView',

    config: {
        refs: {
            mainView: 'main',
            summaryViewMortality: 'summaryview_mortality'
        },
        control: {
            'summaryViewMortality': {
                initialize: 'initHack'
            }
        }
    },
    myCanvasObj: null,
    counter: 0,
    renderView: function() {
        
        localStorage["direction"] = 1; // higher value means worse
        containerObj = Ext.get("summaryview_mortality");
        if (containerObj !== null) {
            containerH = containerObj.getHeight();
            containerW = containerObj.getWidth();
            console.log('render', containerW, containerH);
        }

    },
    init: function() {
        containerObj = Ext.get("summaryview_mortality");
        if (containerObj !== null) {
            containerH = containerObj.getHeight();
            containerW = containerObj.getWidth();
            //Ext.getBody().getViewSize().height
            console.log(containerW || containerH);
            if (containerW || containerH !== 0) {
                // we test if the height and width are not zero
                var canvasObj = new Ext.draw.engine.Canvas({
                    region: [0, 0, containerW, containerH] // this is the whole region of the canvas.
                    // region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
                });
                this.getSummaryViewMortality().add(canvasObj);
                this.myCanvasObj = canvasObj;
                this.myDrawFunctionHack(this.myCanvasObj);
            }
        }
    },
    initHack: function() {
        var canvasObj = new Ext.draw.engine.Canvas({
            region: [0, 0, screen.availWidth, screen.availHeight] // this is the whole region of the canvas.
            // region: [0, 0, parseInt(myViewObj.getWidth())/10*screen.availHeight, 1000]
        });
        this.getSummaryViewMortality().add(canvasObj);
        this.myCanvasObj = canvasObj;
        this.myDrawFunctionHack(this.myCanvasObj);
    },
    myDrawFunctionHack: function(canvasObj) {
        var canvas = canvasObj['canvases'][0]['dom'];
        var ctx = canvas.getContext("2d");
        var prop = 0.20;
        var adult_prop = 0.05;
        var offsetY = 20;
        canvas.height = (300 + offsetY).toString(); // this will set the drawing area., this will scale into the region setting
        // as a hack, add 50 to whatever canvas height you actually want (this will offset the nav bar)
        canvas.width = '400';
        ctx.font = "20px Georgia";
        // console.log(canvas.height, canvas.width);

        // draw the background 
        var image2 = new Image();
        image2.src = 'resources/images/tomb.png';
        image2.onload = function() {
            // draw for infant
            ctx.drawImage(image2, 0, offsetY + image2.height / 2, image2.width, image2.height / 2);
            ctx.fillText((prop * 100).toString() + "%", 85, offsetY + image2.height / 2 + image2.height / 4);
            // draw for adult
            ctx.drawImage(image2, image2.width, offsetY, image2.width, image2.height);
            ctx.fillText((adult_prop * 100).toString() + "%", 85 + image2.width, offsetY + image2.height / 4);

        }
        ctx.save();

        // Draw the coloured version
        var image = new Image();
        image.src = 'resources/images/tomb_coloured.png';
        image.onload = function() {
            //draw for infant
            clipT = (1 - prop) * image.height / 2;
            ctx.rect(0, offsetY + (image.height / 2) + clipT, image.width, prop * image.height / 2);
            ctx.clip();
            ctx.drawImage(image, 0, offsetY + image.height / 2, image.width, image.height / 2);
            ctx.restore();
            // draw for adult
            clipT = (1 - adult_prop) * image.height;
            ctx.rect(image.width, offsetY + clipT, image.width, adult_prop * image.height);
            ctx.clip();
            ctx.drawImage(image, image.width, offsetY, image.width, image.height);
            ctx.restore();
        }
    }
});
