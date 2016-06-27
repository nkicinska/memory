function Tile(img) {
	this.flipped = false;
	this.img = img;
}

Tile.prototype.flip  = function() {
	this.flipped = !this.flipped;
}