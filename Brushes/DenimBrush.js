/**
 * Created by dearcj on 09.01.2016.
 */
/**
 * Created by mac-pc on 12/15/15.
 */
extend(DenimBrush, Brush);

function DenimBrush(color) {
	Brush.apply(this, color);
	this.name = ['джинсы', 'джинсы', 'джинсы' ];
	this.innerName = ['джинсы-1', 'джинсы-2', 'джинсы-3'];

}

DenimBrush.prototype.onSelect = function () {
	var self = this;
	this.img=new Image();
	this.img.onload=function(){
		self.imgLoaded = true;
	};
	switch (this.mode) {
		case 1:
			this.img.src = relPath + 'Jeans/jeans1.png';
			break;
		case 2:
			this.img.src = relPath + 'Jeans/jeans2.png';
			break;
		case 3:
			this.img.src = relPath + 'Jeans/jeans3.png';
			break;
	}
}


DenimBrush.prototype.onFinish = function () {
	clearTimeout(this.timeout); this.timeout = null;

	Brush.prototype.onFinish.call(this);
}

DenimBrush.prototype.onDown = function (ctx, x, y) {
	this.rotation = 1;
	this.scale = 0.1;
	this.use({x2: x, y2: y}, ctx);

	ZSound.Play('jeans');
}

DenimBrush.prototype.use = function (obj, ctx) {
	if (!this.imgLoaded) return;
	ctx.setTransform(1, 0, 0, 1, 0,  0);
	ctx.clearRect(0, 0, window.mainCanvasObject.state.width, window.mainCanvasObject.state.height);
	ctx.canvas.width = ctx.canvas.width;
	//this.scale = 1;
	// Math.cos(this.rotation)*this.scale*this.img.width*0.4
	// - Math.sin(this.rotation)*this.scale*this.img.width*0.4

	ctx.translate(obj.x2,  obj.y2);
	ctx.rotate(this.rotation);
	ctx.translate( -this.img.width*0.5*this.scale,   -this.img.height*0.5*this.scale);
	ctx.scale( this.scale, this.scale);

	ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.img.width, this.img.height);
	this.rotation += 0.01;
	this.scale += 0.005;
	if (this.scale > 1) this.scale = 1;
	if (this.timeout) clearTimeout(this.timeout);
	this.timeout = setTimeout(this.use.bind(this, obj, ctx), 0);
};

//

