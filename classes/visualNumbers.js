function visualNumber (sketch, val, x, y) {
    this.p = sketch;
    this.val = val;
    this.x = x;
    this.y = y;

    this.show = function () {
        let textOffset = FONT_SIZE * 0.33;
        this.p.ellipse(this.x, this.y, 20, 20);
        this.p.text(this.val, this.x - textOffset, this.y + textOffset);    
    }
}