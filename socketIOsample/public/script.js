let socket;

function setup() {
    createCanvas(600, 600);
    background(51);

    socket = io.connect("http://localhost:8080");
}

function mouseDragged() {
    console.log(mouseX + ',' + mouseY);

    let data = {
        x: mouseX, 
        y: mouseY
    }

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);

    socket.emit('mouse', data);

}

function draw() {
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);
}