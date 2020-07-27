let rowShader;
let grassShdader;

let pass = Array();
let passNum = 2;

let isSymmetry;

function preload() {
    rowShader = loadShader("./assets/shader.vert", "./assets/shader.frag");
    grassShdader = loadShader("./assets/passth.vert", "./assets/grass.frag");
}

function setup() {
    createCanvas(800, 800, WEBGL);
    // pass setting
    for (let i = 0; i < passNum; i++) {
        pass.push(createGraphics(width, height, WEBGL));
    }
}

function draw() {
    let time = frameCount * 0.05;
    // let time = performance.now();

    background(10, 0, 0);

    updateCam(pass[0]);
    {
        // pass[0].perspective(PI / 3.0, width / height, 0.1, 500);
        pass[0].background(100.0);
        pass[0].shader(rowShader);
        rowShader.setUniform('time', frameCount);
        // pass[0].box();
        petal(pass[0]);
    }

    // camera(0.0, 0.0, 800, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    {
        pass[1].shader(grassShdader);
        isSymmetry = false;
        grassShdader.setUniform("isEnable", isSymmetry);
        grassShdader.setUniform("tex0", pass[0]);
        grassShdader.setUniform("time", time);
        pass[1].rect(-width / 2.0, -height / 2.0, width, height);

    }

    image(pass[passNum - 1], -width / 2.0, -height / 2.0);
}

function updateCam(pass) {
    // pass.perspective(80, width / height, 0.1, 800);
    // pass.camera(0, 0, 400, 0, 0, 0, 0, 1, 0);
    // console.log(cam.pos);
}

function petal(pass) {
    pass.stroke(255, 255, 255);
    pass.strokeWeight(4);
    pass.noFill();
    for (var i = -height/2; i < height/2; i += 40) {
        pass.bezier(-width/2, 0, -width/3, i + 10, width/3, i + 10, mouseX - width/2, -(mouseY - height/2));
    }
    console.log(-(mouseX - width / 2));
    console.log( mouseY - height / 2);
    // pass.beginShape(POINTS);
    // pass.vertex();
    // pass.bezierVertex(80, 0, 80, 75, 30, 75);
    // pass.endShape();

}
