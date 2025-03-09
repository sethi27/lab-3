let brushSizeSlider;
let colorPicker;
let clearButton;
let shapeSelect;
let currentShape = 'circle';
let drawingColor;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('controls');
    background(255);
    
    createP('Brush Size:').parent('controls');
    brushSizeSlider = createSlider(5, 50, 20);
    brushSizeSlider.parent('controls');
    brushSizeSlider.style('width', '200px');
    
    createP('Color:').parent('controls');
    colorPicker = createColorPicker('#000000');
    colorPicker.parent('controls');
    colorPicker.input(updateColor);
    
    createP('Shape:').parent('controls');
    shapeSelect = createSelect();
    shapeSelect.parent('controls');
    shapeSelect.option('circle');
    shapeSelect.option('square');
    shapeSelect.option('triangle');
    shapeSelect.changed(updateShape);
    
    clearButton = createButton('Clear Canvas');
    clearButton.parent('controls');
    clearButton.mousePressed(clearCanvas);
    
    drawingColor = colorPicker.value();
}

function draw() {
   
    if (mouseIsPressed && mouseY > 0) {
        drawShape(mouseX, mouseY);
    }
}

function drawShape(x, y) {
    let size = brushSizeSlider.value();
    fill(drawingColor);
    noStroke();
    
    switch(currentShape) {
        case 'circle':
            circle(x, y, size);
            break;
        case 'square':
            rectMode(CENTER);
            square(x, y, size);
            break;
        case 'triangle':
            triangle(
                x, y - size/2,
                x - size/2, y + size/2,
                x + size/2, y + size/2
            );
            break;
    }
}

function updateColor() {
    drawingColor = colorPicker.value();
}

function updateShape() {
    currentShape = shapeSelect.value();
}

function clearCanvas() {
    background(255);
}

function mouseDragged() {
   
    if (mouseY > 0) {
        drawShape(mouseX, mouseY);
    }
}

function keyPressed() {
  
    if (key === 'c' || key === 'C') {
        clearCanvas();
    }
}