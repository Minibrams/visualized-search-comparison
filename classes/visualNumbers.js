function visualNumber (val, x, y) {
    
    this.val = val;
    this.x = x;
    this.y = y;

    this.show = function () {
        ellipse(this.x, this.y, 10, 10);
        text(this.val, this.x, this.y);    
    }
}