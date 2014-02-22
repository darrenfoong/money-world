	function install_clock() {
		var clock = document.createElement("canvas");
		clock.width = 250;
		clock.height = 250;
		$("#results > div.time > div.clock > div").append(clock);
		if (!Modernizr.canvas) G_vmlCanvasManager.initElement(clock);
		var ctx = clock.getContext("2d");
		var radius = 78;
		var center_x = clock.width / 2;
		var center_y = clock.height / 2;

		function draw_clock() {
			var ms = ((new Date() - start) % 60000);
			var ratio = ms / 60000;
			ctx.clearRect(0, 0, clock.width, clock.height);
			ctx.strokeStyle = "#160606";
			ctx.fillStyle = "#1F1F1F";
			ctx.beginPath();
			ctx.arc(center_x, center_y, radius * 1.15, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.fillStyle = "#160606";
			ctx.beginPath();
			ctx.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.fillStyle = "#AF392F";
			ctx.beginPath();
			ctx.moveTo(center_x, center_y);
			ctx.arc(center_x, center_y, radius, -Math.PI / 2, (Math.PI * 2 * ratio) - (Math.PI / 2), false);
			ctx.fill();
			ctx.fillStyle = "rgba(176, 57, 46, 0.5)";
			ctx.beginPath();
			ctx.arc(center_x, center_y, radius / 3, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle = "#160606";
			ctx.beginPath();
			ctx.arc(center_x, center_y, radius / 9, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.save();
			ctx.translate(center_x, center_y);
			ctx.rotate(Math.PI)
			ctx.strokeStyle = "#1F1F1F";
			for (var i = 0; i < 8; i++) {
				ctx.beginPath();
				ctx.moveTo(0.5, (radius * 0.9) + 0.5);
				ctx.lineTo(0.5, radius + 0.5);
				ctx.stroke();
				ctx.rotate(Math.PI / 4)
			}
			ctx.restore();
			requestAnimFrame(draw_clock, clock)
		}
		draw_clock();
	}
