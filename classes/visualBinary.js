// This file contains all classes that are used for binary search visualization.

// The class 'containing' the binary tree. 
// Constructs and manipulates it recursively, so watch out for large tree sizes
// (large trees won't fit on the screen though, so I doubt I should be worried)
function VisualBinaryTree (sketch, numbers, x, y, xSpacing) {
    //Essential information
    this.p = sketch;
    this._numbers = numbers;
    this.left = null;
    this.right = null;
    this.pos = new Point(x, y);
    this.color = new Color(256, 256, 256);

    // Immediately build the tree to visualize it
    
    if (this._numbers.length == 1) {
        // No possible children, so skip that. 
        this.root = this._numbers[0];
    } else {
        // This root will be the middle-most number
        // Split the array in two and give one to each subtree
        let rootIndex = this.p.floor(this._numbers.length / 2);
        let leftNumbers = this._numbers.slice(0, rootIndex);
        let rightNumbers = this._numbers.slice(rootIndex + 1, this._numbers.length);

        // Don't try to make a subtree if there are no numbers for it
        this.root = this._numbers[rootIndex];
        this.left = leftNumbers.length != 0 ? new VisualBinaryTree(sketch, leftNumbers, x - xSpacing, y + 50, xSpacing * 0.45) : null;
        this.right = rightNumbers.length != 0 ? new VisualBinaryTree(sketch, rightNumbers, x + xSpacing, y + 50, xSpacing * 0.45) : null;
    }

    // Create a bubble with a number in it...
    this.visualRoot = new VisualNumber(sketch, this.root, x, y);

    // Visualizes the tree. 
    // Show the bubble for this root, recursively do the same for both the left
    // and right subtree, given that they exist
    this.show = function () {
        this.visualRoot.show();
        if (this.left != null) {
            this.p.line(this.pos.x, this.pos.y + 10, this.left.pos.x, this.left.pos.y);
            this.left.show();
        }
        if (this.right != null) {
            this.p.line(this.pos.x, this.pos.y + 10, this.right.pos.x, this.right.pos.y);
            this.right.show();
        }
    }

    this.changeColor = function(color) {
        this.visualRoot.changeColor(color);
    }

    // Changes the color of this node and every child. 
    // Useful when a decision is made during binary search - if the choice is to go
    // to the left, then we can safely ignore the node to the right and all its children
    // i.e. color them red. 
    // Returns a count of how many nodes were colored (for the UI).
    this.changeColorRecursively = function (color) {
        this.changeColor(color);
        // Count how many nodes are colored
        let num = 1; 
        if (this.left != null) {
            num += this.left.changeColorRecursively(color);
        }
    
        if (this.right != null) {
            num += this.right.changeColorRecursively(color);
        }

        return num;
    }
}

// The class conducting and visualizing the binary search accross
// a visual binary tree object. 
function VisualBinarySearch(sketch, numbers, x, y) {
    // Essential information
    this.p = sketch;

    // Spacing between the two first children in the tree
    let spacing = (numbers.length * 15) / 2; 

    // Build the tree
    this.tree = new VisualBinaryTree(sketch, numbers, x, y, spacing);

    // Get a search head
    this.searchHead = new SearchHead(sketch, x, y);

    // Information for the UI
    this.currentNode = null;
    this.numSteps = 1;
    this.numExcludedNodes = 0;

    // Initiates a search.
    this.startSearchFor = function (num) {
        this.currentNode = this.tree;
        this.searchHead.setTarget(num);
        this.tree.changeColor('yellow');
    }

    // Visualize the tree and the search head, update the search head's position
    this.show = function () {
        this.tree.show();
        this.searchHead.update();
        this.searchHead.show();
    }

    // Takes a step through the binary search algorithm. 
    // Takes an action based on what number is in the current node
    // we're looking at. 
    // Colors nodes appropriately.
    this.step = function () {
        
        // Have we found what we were looking for?
        if (this.currentNode.root == this.searchHead.searchTarget) {
            this.currentNode.changeColor('green');
            return;
        // If this node is larger than what we're looking for, we should look for
        // numbers lower than this. Go to its left subtree.
        // Recursively exclude (make red) the entire right subtree. 
        } else if (this.currentNode.root > this.searchHead.searchTarget) {
            this.currentNode.changeColor('red'); 
            this.numExcludedNodes++;

            if (this.currentNode.right != null) {
                this.numExcludedNodes += this.currentNode.right.changeColorRecursively('red');
            }
            
            // Pick the new goal node, move the search head to it. 
            this.currentNode = this.currentNode.left;
            this.searchHead.moveTo(this.currentNode.pos);
            this.currentNode.changeColor('yellow');
            this.numSteps++;

        // If this node is smaller than what we are looking for, then
        // its right subtree must have it. Exclude the left subtree and 
        // go to the right subtree.
        } else if (this.currentNode.root < this.searchHead.searchTarget) {
            this.currentNode.changeColor('red'); 
            this.numExcludedNodes++;

            if (this.currentNode.left != null) {
                this.numExcludedNodes += this.currentNode.left.changeColorRecursively('red');
            }
            
            this.currentNode = this.currentNode.right;
            this.searchHead.moveTo(this.currentNode.pos);
            this.currentNode.changeColor('yellow');
            this.numSteps++;
        }
    }
}
