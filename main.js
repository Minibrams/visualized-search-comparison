var p5js = function (p) {
    
    p.setup = function() {
        // Save height and width for later positioning
        let cnv = document.getElementById('theCanvas');
        p.width = cnv.offsetWidth;
        p.height = cnv.offsetHeight;
        p.createCanvas(p.width, p.height);
        p.background(0);
    }

    p.draw = function () {
        p.background(0);
    }
} 

// This step is crucial for the p5 sketch to be displayed.
var theP5Sketch = new p5(p5js, 'theCanvas');