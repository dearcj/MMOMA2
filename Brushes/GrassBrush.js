/**
 * Created by dearcj on 12.01.2016.
 */
/**
 * Created by mac-pc on 12/15/15.
 */
extend(GrassBrush, Brush);

function GrassBrush(color) {
	Brush.apply(this, color);
	this.name = ['трава'];
	this.innerName = ['трава'];

	var self = this;

	this.imgs = [];
	for (var i = 1; i <= 8; ++i) {
		this.img = new Image();
		this.img.onload = function () {
			self.imgLoaded = true;
		};
		this.img.src = relPath + 'Grass/grass' + i.toString() + '.png';
		this.imgs.push(this.img);
	}

}



GrassBrush.prototype.drawParticle = function (ctx, x, y, scale, angle) {
	ctx.setTransform(1, 0, 0, 1, 0,  0);
	var img = this.imgs[getRandomInt(0, 7)];
	ctx.translate(x,  y);
	ctx.rotate(angle);
	ctx.translate( -img.width*0.5*scale,   -img.height*0.5*scale);
	ctx.scale(scale, scale);

	this.lastX = x;
	this.lastY = y;
	ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
};


GrassBrush.prototype.onDown = function (ctx, x, y) {
	this.drawParticle(ctx, x, y, 0.5 + 0.5*Math.random(), 0);

	ZSound.Play('grass');

};

GrassBrush.prototype.use = function (obj, ctx) {
	if (!this.imgLoaded) return;

	var dx = obj.x2 - obj.x1;
	var dy = obj.y2 - obj.y1;
	var d = dx * dx + dy * dy;
	dx /= d; dy /= d;
	var angle = Math.atan2(dy, dx);

	this.drawParticle(ctx, obj.x2 + 12*(Math.random() - 0.5), obj.y2 + 12*(Math.random() - 0.5), 1 + Math.random(), angle);
	this.drawParticle(ctx, obj.x2 + 12*(Math.random() - 0.5), obj.y2 + 12*(Math.random() - 0.5), 1 + Math.random(), angle);

};

//
