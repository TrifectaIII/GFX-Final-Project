function Apartment(x, y, z, s) {
    this.name = "robot";


    this.w = 1; //width
    this.h = 1; //hieght
    this.l = 1; //length

    this.posX = x;
    posY = y;
    posZ = z;
    scale = s;

    translateX = 0;

}

Apartment.prototype.drawApartment = function () {
    stack.multiply(translate(this.posX, posY, posZ));
    stack.multiply(translate(translateX, 0, 0));
    stack.multiply(scalem(scale, scale, scale));
    stack.push();

    Shapes.Apartment.drawRoof();
//    Shapes.robot.move();
};


Apartment.prototype.drawRoof = function () {
    stack.push();
    stack.multiply(scalem(this.w, this.h, this.l));
    stack.multiply(translate(this.posX, posY, posZ));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};

Robot.prototype.drawBuilding = function () {
    stack.push();
    stack.multiply(scalem(this.hd, this.hd, this.t));
    stack.multiply(translate(this.posX, posY + 2, posZ));
    stack.multiply(translate(headTrans, headTrans, headTrans));
    stack.multiply(rotateX(headTilt));
    stack.multiply(scalem(1, 1, headScale))
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 0.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Robot.prototype.drawWheels = function () {
    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
//    console.log('posY = ' + posY);
    stack.multiply(translate(this.posX - (this.w * scale), posY - scale + 1, posZ - scale + 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX + (this.w * scale), posY - scale + 1, posZ + scale - 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX - (this.w * scale), posY - scale + 1, posZ + scale - 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();

    stack.push();
    stack.multiply(scalem(this.wd, this.wd, this.t));
    stack.multiply(translate(this.posX + (this.w * scale), posY - scale + 1, posZ - scale + 0.05));
    stack.multiply(rotateZ(wheelAngle));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};

Robot.prototype.drawEyes = function () {
    stack.push();
    stack.multiply(scalem(0.1, 0.1, this.t));
    stack.multiply(translate(this.posX + 2, posY + 9, posZ + this.t + 1));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateX(headTilt / 2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();

    stack.push();
    stack.multiply(scalem(0.1, 0.1, this.t));
    stack.multiply(translate(this.posX - 2, posY + 9, posZ + this.t + 1));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateX(headTilt / 2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1.0, 1.0, 0.0, 1.0));
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
};

Robot.prototype.drawNose = function () {
    stack.push();
    stack.multiply(scalem(0.1, 0.1, 0.2));
    stack.multiply(translate(this.posX, posY + 8, this.t));
    stack.multiply(translate(0, faceTrans, -faceTrans / 3));
    stack.multiply(rotateZ(headTilt / 2));
    stack.multiply(scalem(1, 1, noseScale))
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0.0, 1.0, 1.0, 1.0));
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
}

Robot.prototype.move2 = function () {
    canvas.addEventListener("mousedown", function (event) {
        wheelAngle += 10;
        translateX += 0.001;
    });
};

Robot.prototype.move = function ( ) {
    window.onkeydown = function (event) {
        var c = String.fromCharCode(event.keyCode);
        console.log('c = ' + c);

        switch (c) {
            case "A":
                wheelAngle -= 10;
                translateX -= 0.1;
                break;
            case "D":
                wheelAngle += 10;
                translateX += 0.1;
                break
            case "W":
                if (headTilt < 40) {
                    headTilt += 10;
                    headScale -= 0.1;
                    noseScale -= 0.05;
                    faceTrans += 0.4;
                }
                break;
            case "S":
                if (headTilt > -10) {
                    headTilt -= 10;
                    headScale += 0.1;
                    noseScale += 0.05
                    faceTrans -= 0.4;
                }
                break;

        }
    };

};


