// Contains all classes shared and used by both linear and binary search
// Examples include the visualization for numbers and the search head visualization. 

// Slider
var ySpacingSlider = document.getElementById('ySpacing');

// The class for visualizing single numbers
function VisualNumber (sketch, val, x, y) {
    // Essential info
    this.p = sketch;
    this.val = val;
    this.x = x;
    this.y = y;
    this._x = x; // Never change
    this._y = y; // Never change

    // Formatting info
    this.textXOffset = this.val >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    this.textYOffset = FONT_SIZE * 0.4;
    this.color = new Color(256, 256, 256);

    // Methods
    this.show = function () {
        // Scale ySpacing
        this.y = this._y * (ySpacingSlider.value * 0.01) + 50;

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

// The class for visualizing the searching head
function SearchHead (sketch, x, y) {
    // Essential info
    this.p = sketch;
    
    // targetPos is the linepoint just above the target node.
    // endPos is the linepoint a little higher. 
    // They are only used for drawing the search head. 
    this.targetPos = new Point(x, y - 15);
    this.endPos = new Point(x, y - SEARCH_HEAD_LENGTH);
    this.searchTarget = null;

    this.nextPos = null;
    this.moving = false;
    this.speedRate = 0.12;

    // Formatting info
    this.textXOffset = 0;
    this.textYOffset = FONT_SIZE * 0.4;

    // Methods
    this.show = function () {
        this.p.fill(0);
        // Draw the horizontal line
        this.p.line(this.targetPos.x, this.targetPos.y, this.endPos.x, this.endPos.y);

        // Draw the upper bar
        this.p.line(this.endPos.x - SEARCH_HEAD_WIDTH * 0.5, this.endPos.y, 
               this.endPos.x + SEARCH_HEAD_WIDTH * 0.5, this.endPos.y);

        // If we are looking for a number, show that above the bar
        if (this.searchTarget != null) {
            this.p.text(this.searchTarget, this.endPos.x - this.textXOffset, this.endPos.y - this.textYOffset);
        }
    }

    // If 'moving' is true, we should still be moving towards the target number.
    // Calculate the distance between the head and the target, and multiply it by some speedrate.
    // This makes the search head move more fluidly.
    this.update = function() {
        if (this.moving) {
            let Xmovement = ( this.nextPos.x - this.targetPos.x ) * this.speedRate;
            let Ymovement = ( this.nextPos.y - this.targetPos.y - (SEARCH_HEAD_LENGTH - 10) ) * this.speedRate;
            
            this.targetPos.x += Xmovement;
            this.endPos.x += Xmovement;
            this.targetPos.y += Ymovement;
            this.endPos.y += Ymovement;

            if ( (this.nextPos.x - this.targetPos.x) < 1 &&
                  this.nextPos.x - this.targetPos.x > 0 ) {
                this.targetPos.x = this.nextPos.x;
                this.endPos.x = this.nextPos.x;
                this.targetPos.y = this.nextPos.y - 15;
                this.endPos.y = this.nextPos.y - SEARCH_HEAD_LENGTH;
                this.moving = false;
            }
        }
    }

    // Call this when a search is initiated. 
    this.setTarget = function (num) {
        this.searchTarget = num;
        this.textXOffset = num >= 10 ? FONT_SIZE * 0.7 : FONT_SIZE * 0.3;
    }

    // Sets a target for the position update in this.update(), and sets the 
    // state variable to true.
    this.moveTo = function (pos) {
        this.moving = true;
        this.nextPos = pos;
    }
}

// The class for containing coordinates
function Point (x, y) {
    this.x = x;
    this.y = y;
}

// The class for containing RGB colors
function Color (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}