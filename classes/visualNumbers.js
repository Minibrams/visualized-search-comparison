function visualNumber (sketch, val, x, y) {
    this.p = sketch;
    this.val = val;
    this.x = x;
    this.y = y;

    this.textXOffset = this.val >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    this.textYOffset = FONT_SIZE * 0.4;

    this.show = function () {
        this.p.ellipse(this.x, this.y, 20, 20);
        this.p.text(this.val, this.x - this.textXOffset, this.y + this.textYOffset);    
    }
}