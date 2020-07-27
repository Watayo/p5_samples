class EasyCam{
    constructor(pos, look, up){
        this._pos = pos;
        this._look = look;
        this._up = up;
        this._theta = 0.0;
        // camera(pos.x, pos.y, pos.z, look.x, look.y, look.z, up.x, up.y, up.z);
        // this._radius = sqrt(pos.dot(pos));
    }

    //0:xz, 1:xy, 2:yz
    polareMove(type){
        this._theta =  frameCount * PI / 180.0;
        if(type === 0){
            camera(this._radius * cos(this._theta), this._pos.y, this._radius * sin(theta),
            this._look.x, this._look.y, this._look.z,
            this._up.x, this._up.y, this._up.z);
        }else if(type === 1){
            camera(this._radius * cos(this._theta), this._radius * sin(this._theta), pothis._pos.z,
            this._look.x, this._look.y, this._look.z,
            this._up.x, this._up.y, this._up.z);
        }else{
            camera(this._pos.x, this._radius * cos(this._theta), this._radius * sin(this._theta),
            this._look.x, this._look.y, this._look.z,
            this._up.x, this._up.y, this._up.z);
        }

    }

    customMove(type, radius, look, up, speed){
        this._theta =  frameCount * PI / 180.0 * speed;
        this._radius = radius;
        if(type === 0){
            this._pos = createVector(this._radius * cos(this._theta), this._pos.y, this._radius * sin(this._theta));
            camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);

        }else if(type === 1){
            this._pos = createVector(this._radius * cos(this._theta), this._radius * sin(this._theta), this._pos.z);
            camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);
            //camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);
        }else{
            this._pos = createVector(this._pos.x, this._radius * cos(this._theta), this._radius * sin(this._theta));
            camera(this._pos.x, this._pos.y, this._pos.z,
            look.x, look.y, look.z,
            up.x, up.y, up.z);
        }
    }

    customMoveinPass(type, radius, look, up, speed, pass){
        this._theta =  frameCount * PI / 180.0 * speed;
        this._radius = radius;
        if(type === 0){
            this._pos = createVector(this._radius * cos(this._theta), this._pos.y, this._radius * sin(this._theta));
            pass.camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);

        }else if(type === 1){
            this._pos = createVector(this._radius * cos(this._theta), this._radius * sin(this._theta), this._pos.z);
            pass.camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);
            //camera(this._pos.x, this._pos.y, this._pos.z, look.x, look.y, look.z, up.x, up.y, up.z);
        }else{
            this._pos = createVector(this._pos.x, this._radius * cos(this._theta), this._radius * sin(this._theta));
            pass.camera(this._pos.x, this._pos.y, this._pos.z,
            look.x, look.y, look.z,
            up.x, up.y, up.z);
        }
    }

    get pos(){
        return this._pos;
    }

    get theta(){
        return this._theta;
    }

    get radius(){
        return this._radius;
    }
}