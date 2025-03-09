let brushSizeSlider;
let colorPicker;
let clearButton;
let shapeSelect;
let modeSelect;
let currentShape = 'circle';
let drawingColor;
let drawingMode = 'normal';

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
    
    createP('Drawing Mode:').parent('controls');
    modeSelect = createSelect();
    modeSelect.parent('controls');
    modeSelect.option('normal');
    modeSelect.option('eraser');
    modeSelect.option('rainbow');
    modeSelect.changed(updateMode);
    
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
    
   
    if (drawingMode === 'eraser') {
        fill(255);
        noStroke();
    } else if (drawingMode === 'rainbow') {
        fill(random(255), random(255), random(255));
    } else {
        fill(drawingColor);
    }
    
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

function updateMode() {
    drawingMode = modeSelect.value();
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