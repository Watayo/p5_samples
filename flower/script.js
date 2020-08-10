let rowShader;
let grassShdader;

let pass = Array();
let passNum = 2;

let isSymmetry;

function petal(pass, w_size, h_size, k) {
    // pass.background(10);
    pass.stroke(255, 255, 255);
    pass.strokeWeight(1);
    pass.noFill();

    let w = w_size;
    let h = h_size;
    for (let p = -h/8; p < h/8; p += 14) {
        pass.bezier(0, 0, 0, w/8, p + 10, k * w/8**2, w/4, p + 10, k * w/4**2, w/2.4,
             0, k * w/2.4 ** 2);
    }
    // pass.beginShape(POINTS);
    // pass.vertex();
    // pass.bezierVertex(80, 0, 80, 75, 30, 75);
    // pass.endShape();

}

function flower(pass) {
    let divisionNum = 8;
    let divisionCirc = 2 * PI/ divisionNum;
    for (let i = 0; i < divisionNum; i++) {
        pass.push();
        pass.rotateZ(divisionCirc * i);
        petal(pass, width, height, 1.5);
        pass.pop();
        pass.push();
        pass.rotateZ(PI/6 + divisionCirc * i);
        petal(pass, width/1.5, height/1.5, 2);
        pass.pop();
        pass.push();
        pass.rotateZ(PI/3 + divisionCirc * i);
        petal(pass, width/2, height/2, 2.5);
        pass.pop();
    }
}

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
    let time = frameCount * 0.02;
    let speed = 2; 
    let theta =  frameCount * PI / 180.0 * speed;

    background(10, 0, 0);
    
    // pass[0].camera(100 * cos(theta), 0, 700, 0, 0, 0, 0, 1, 0);
    {
        pass[0].push();    
        pass[0].background(100);
        // pass[0].camera(100 * cos(theta), 0, 700, 0, 0, 0, 0, 1, 0);

        pass[0].rotateX(-PI/4);
        //pass[0].camera(0, 20, 700, 0, 0, 0, 0, 1, 0);
        pass[0].rotateZ(PI/6);
        flower(pass[0]);
        pass[0].pop();
    }

    camera(0.0, 0.0, 800, 0.0, 4.0, 0.0, 0.0, 1.0, 0.0);
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
