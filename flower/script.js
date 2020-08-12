let rowShader;
let grassShader;
let blurShader;

let pass = Array();
let passNum = 4;

let isSymmetry;

let strength;

function petal(pass, w_size, h_size, k, color) {
    // pass.background(10);
    pass.stroke(color);
    pass.strokeWeight(1);
    // pass.fill(255, 100, 255, 100);
    pass.noFill();
    
    let speed = 1;
    let theta = frameCount * PI / 180 * speed;
    let w = w_size;
    let h = h_size;
    for (let p = -h/8; p < h/8; p += 20) {
        pass.bezier(0, 0, 0, w/8, p + 10, k * w/8**2, w/4, p + 10, k * w/4**2, w/2.4,
             0, k * w/2.4 ** 2);
        
    }
}

function flower(pass) {
    let divisionNum = 8;
    let divisionCirc = 2 * PI/ divisionNum;

    let alpha = 200;
    for (let i = 0; i < divisionNum; i++) {
        pass.push();
        pass.rotateZ(divisionCirc * i);
        petal(pass, width, height, 1.5, color(50, 180, 200, alpha));
        pass.pop();
        pass.push();
        pass.rotateZ(PI/6 + divisionCirc * i);
        petal(pass, width/1.5, height/1.5, 2, color(30, 140, 220, alpha));
        pass.pop();
        pass.push();
        pass.rotateZ(PI/3 + divisionCirc * i);
        petal(pass, width/2, height/2, 2.5, color(10, 100, 240, alpha));
        pass.pop();
        pass.push();
        pass.rotateZ(2 * PI/3 + divisionCirc * i);
        petal(pass, width/2.5, height/2.5, 3.0,  color(5, 60, 255, alpha));
        pass.pop();
    }
}

function preload() {
    rowShader = loadShader("./assets/shader.vert", "./assets/shader.frag");
    grassShader = loadShader("./assets/passth.vert", "./assets/grass.frag");
    blurShader = loadShader("./assets/passth.vert", "./assets/blur.frag");
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
    let speed = 0.5; 
    let theta =  frameCount * PI / 180.0 * speed;

    background(10, 0, 0);
    
    pass[0].camera(0, -600, 600, 0, 0, 0, 0, 1, 0);
    {
        pass[0].clear();

        pass[0].background(240);
        pass[0].blendMode(MULTIPLY);

        pass[0].push();

        pass[0].rotateZ(time * 0.5);
        flower(pass[0]);
        pass[0].pop();
    }

    camera(0.0, 0.0, 800, 0.0, 4.0, 0.0, 0.0, 1.0, 0.0);

    strenght = 1.0;
    {
        pass[1].shader(grassShader);
        isSymmetry = false;
        grassShader.setUniform("isEnable", isSymmetry);
        grassShader.setUniform("tex0", pass[0]);
        grassShader.setUniform("time", time);
        pass[1].rect(-width / 2.0, -height / 2.0, width, height);
    }

    {
        pass[2].shader(blurShader);
        blurShader.setUniform("horizontal", true);
        blurShader.setUniform("tex0", pass[2]);
        blurShader.setUniform("strength", strength);
        pass[2].rect(-width / 2.0, -height / 2.0, width, height);
    }

    {
        pass[3].shader(blurShader);
        blurShader.setUniform("horizontal", false);
        blurShader.setUniform("tex0", pass[3]);
        blurShader.setUniform("strength", strength);
        pass[3].rect(-width / 2.0, -height / 2.0, width, height);
    }

    image(pass[passNum - 3], -width / 2.0, -height / 2.0);
}
