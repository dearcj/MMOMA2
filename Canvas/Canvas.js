function Canvas(frontCtx, backCtx, canvasType) {
	this.canvasType = canvasType;
	this.actions = [];
	this.currentBrush = null;
	var el = document.getElementById('main-canvas');
	this.cursImg=new Image();
	this.cursorSrc = window.relPath + 'cursors/c_orange.png';
	this.backups = [];
	this.state = {
		width: el.width,
		height: el.height,
		drawState: null,
		ctx: frontCtx,
		backCtx: backCtx
	};
}

Canvas.prototype.savePattern = function() {
	var canvas = document.getElementById('main-canvas');
	//resize issue

	var dataURL = canvas.toDataURL("image/jpg");
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};


Canvas.prototype.saveImage = function() {
	var canvas = document.getElementById('back-canvas');

	var dataURL = canvas.toDataURL("image/jpg", 0.85);
	return  dataURL;//.asdsareplace(/^data:image\/(png|jpg);base64,/, "");
};

Canvas.prototype.GetMousePositionInElement = function(ev, element)
{
	var offset = element.offset();

	var bottom = offset.top + element.height();
	var r = (750 / element[0].clientWidth);
	console.log(r);
	if (ev.touches) {
		var x = r*(ev.touches[0].clientX - offset.left);
		var y = (bottom - r*ev.touches[0].clientY);
	} else {
		var x = ev.pageX - offset.left;
		var y = bottom - ev.pageY;
	}
	return { x: x, y: y, y_fromTop: element.height() - y };
}

Canvas.prototype.saveState = function(e) {
	var canvas = document.getElementById('back-canvas');
	var dataURL = canvas.toDataURL("image/jpg", 0.85);
	this.backups.push(dataURL);
	if (this.backups.length > 10) this.backups.splice(0, 1);

	$('#undo')[0].style.opacity = "1";
}


Canvas.prototype.makeUndo = function(e) {
	if (this.backups.length > 0) {


		var b = this.backups[this.backups.length - 1];
		this.backups.splice(this.backups.length - 1, 1);
		var i = new Image();
		i.src = b;
		var w = this.state.width;
		var h = this.state.height;
		var ctx = this.state.backCtx;
		i.onload = function() {

			var el = document.getElementById('back-canvas');
			var ctx = el.getContext('2d');
			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(i, 0, 0);


			var el = document.getElementById('main-canvas');
			var ctx = el.getContext('2d');
			ctx.clearRect(0, 0, w, h);

			//ctx.canvas.width = ctx.canvas.width;

		};
	}
		if (this.backups.length <= 1)
		$('#undo')[0].style.opacity = "0.5";

}


Canvas.prototype.mouseMoveAction = function(e) {
	if (!this.currentBrush) return;

	var cursCanv =  $('#main-canvas');
	var mp = this.GetMousePositionInElement(e, cursCanv);
	this.state.mouseX = mp.x;
	this.state.mouseY = mp.y_fromTop;
	//console.log(this.state.mouseX, this.state.mouseY);
	if (this.state.drawState == 'insideAction') {

		var action = this.actions[this.actions.length - 1];
		var obj = action.addObject(this.state.prevMouseX, this.state.prevMouseY, this.state.mouseX, this.state.mouseY);
		action.brush.use(obj, this.state.ctx, action);

		this.state.prevMouseX = this.state.mouseX;
		this.state.prevMouseY = this.state.mouseY;
	}
	if (this.cursImg.src != this.cursorSrc)
		this.cursImg.src = this.cursorSrc;

	var cursCanv =   document.getElementById('cursor-canvas');
	var ctx = cursCanv.getContext('2d');
	ctx.clearRect(0, 0, this.state.width, this.state.height);
	ctx.drawImage(this.cursImg,  this.state.mouseX - this.cursImg.width / 2,  this.state.mouseY - this.cursImg.height/2);

};

Canvas.prototype.resetCanvas = function () {

	var cursCanv =   document.getElementById('cursor-canvas');
	var ctx = cursCanv.getContext('2d');
	ctx.clearRect(0, 0, this.state.width, this.state.height);


	this.state.backCtx.clearRect(0, 0, this.state.width, this.state.height);
	var ctx = this.state.backCtx;

	this.tags = [];
	this.innerTags = [];
	var pathToSurfaces = window.basePath + 'img/textures/';
	switch (this.canvasType) {
		case 1:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			this.tags.push('дерево');
			this.innerTags.push('дерево');

			imageObj.src = pathToSurfaces + 'wood.jpg';
			break;
		case 2:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			imageObj.src = pathToSurfaces + 'board.jpg';
			this.tags.push('школьная доска');
			this.innerTags.push('школьная доска');

			break;
		case 3:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			imageObj.src = pathToSurfaces + 'canvas.jpg';
			this.tags.push('холст');
			this.innerTags.push('холст');


			break;
		case 4:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			imageObj.src = pathToSurfaces + 'brick.jpg';
			this.tags.push('кирпич');
			this.innerTags.push('кирпич');

			break;
		case 5:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			imageObj.src = pathToSurfaces + 'cardboard.jpg';
			this.tags.push('картон');
			this.innerTags.push('картон');

			break;
		case 6:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			imageObj.src = pathToSurfaces + 'wallpaper.jpg';
			this.tags.push('обои');
			this.innerTags.push('обои');

			break;
		case 7:
			var imageObj = new Image();
			imageObj.onload = function() {
				ctx.drawImage(this, 0, 0);
			};
			this.tags.push('металл');
			this.innerTags.push('металл');

			imageObj.src = pathToSurfaces + 'metal.jpg';
			break;
	}
};

Canvas.prototype.redraw = function (ctx){
	this.resetCanvas(this.state.backCtx);

	var len = this.actions.length;
	for (var i = 0; i < len; ++i) {
		var br = this.actions[i].brush;
		var olen = this.actions[i].objects.length;
		for (var j = 0; j < olen; ++j) {
			br.use(this.actions[i].objects[j], this.state.backCtx);
		}
	}
};

Canvas.prototype.sendPic = function(cbbbb, img) {
	data = {
		api_method: 'applyimagetogallery',
		user_id: 1,
		image: img,
		name: $('#in-author').val(),
		description: $('#in-label').val(),
		tags: this.tags.join(';')
	};

	$.ajax({
		type: "POST",
		url: "http://188.227.16.35/wp-content/themes/mmoma/api/index.php",
		data: data,
		success: function cb(res) {
			localStorage.setItem('imageId', res.imageId);
			console.log(res);
			cbbbb();
		}
	});
};


Canvas.prototype.finishAction = function (e) {
	if (!this.currentBrush) return;
	this.saveState();

	var el = document.getElementById('main-canvas');

	this.state.backCtx.drawImage(el, 0, 0);
	this.state.ctx.canvas.width = this.state.ctx.canvas.width;
	this.state.ctx.clearRect(0, 0, this.state.width, this.state.height);
	this.state.drawState = null;
	this.actions[this.actions.length - 1].brush.onFinish();
	var t = this;
};

Canvas.prototype.startAction = function (e) {
	if (!this.currentBrush) return;
 	var cursCanv =  $('#main-canvas');

	var mp = this.GetMousePositionInElement(e, cursCanv);
	this.state.prevMouseX = mp.x;
	this.state.prevMouseY = mp.y_fromTop;

	this.state.drawState = 'insideAction';
	this.actions.push(new Action(this.currentBrush));

	this.state.ctx.clearRect(0, 0, window.mainCanvasObject.state.width, window.mainCanvasObject.state.height);
	this.state.ctx.canvas.width = this.state.ctx.canvas.width;

	this.actions[this.actions.length - 1].brush.onDown(this.state.ctx, this.state.prevMouseX, this.state.prevMouseY);
};