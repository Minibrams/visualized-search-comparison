
// The class for visualizing single numbers
function VisualNumber (sketch, val, x, y) {
    // Essential info
    this.p = sketch;
    this.val = val;
    this.x = x;
    this.y = y;

    // Formatting info
    this.textXOffset = this.val >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    this.textYOffset = FONT_SIZE * 0.4;
    this.color = new Color(256, 256, 256);

    // Methods
    this.show = function () {
        //Draw background
        this.p.fill(this.color.r, this.color.g, this.color.b);
        this.p.ellipse(this.x, this.y, 20, 20);
        
        //Draw text
        this.p.fill(0);
        this.p.text(this.val, this.x - this.textXOffset, this.y + this.textYOffset);    
    }

    this.changeColor = function (color) {
        if (color == 'red') {
            this.color = new Color(256, 200, 200);
        } else if (color == 'green') {
            this.color = new Color(200, 256, 200);
        } else if (color == 'yellow') {
            this.color = new Color(256, 256, 200);
        }
    }
}

// The class for visualizing an array of numbers
function VisualArray(sketch, x, y) {
    // Essential info
    this.p = sketch;
    this.numbers = [];
    this.y = y;
    this.x = x;

    //Formatting info
    this.numOffset = 30;
    // Methods
    this.add = function(num) {
        let xOffset = this.numbers.length * this.numOffset;
        let newNum = new VisualNumber(this.p, num, x + xOffset, y);
        this.numbers.push(newNum);
    }

    this.show = function () {
        this.numbers.forEach ( element => {
            element.show();
        });
    }

    this.getPositionOfIndex = function (index) {
        if (index > numbers.length)
            return null;
        
        return new Point(numbers[index].x, numbers[index].y);
    }

    this.changeColorOfIndex = function (index, color) {
        let num = this.numbers[index];
        num.changeColor(color);
    }
}

// The class for containing coordinates
function Point (x, y) {
    this.x = x;
    this.y = y;
}

function Color (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}