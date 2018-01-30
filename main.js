// Constants
const FONT_SIZE = 10;

var p5js = function (p) {
    
    p.setup = function() {
        // Save height and width for later positioning
        let cnv = document.getElementById('theCanvas');
        this.width = cnv.offsetWidth;
        this.height = cnv.offsetHeight;
        
        //Configure p5
        p.textSize(FONT_SIZE);
        p.createCanvas(this.width, this.height);

        let num = new visualNumber(p, 12, this.width * 0.5, this.height * 0.5);
        num.show();
    }

    p.draw = function () {
    
    }
} 

// This step is crucial for the p5 sketch to be displayed.
var theP5Sketch = new p5(p5js, 'theCanvas');