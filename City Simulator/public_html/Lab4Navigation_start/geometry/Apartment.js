function Apartment() {
    this.name = "apartment";

}

Apartment.prototype.drawApartment = function (h) {
    stack.multiply(translate(0, h / 2, 0));
    Shapes.apartment.drawRoof(h);
    Shapes.apartment.drawBase(h);
    Shapes.apartment.drawGround(h);
//    Shapes.robot.move();
};


Apartment.prototype.drawRoof = function (h) {
    stack.push();
    roof = Shapes.roof;
    roof.drawRoof(h);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    stack.pop();
};

Apartment.prototype.drawBase = function (h) {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    Tapartment.activate();
    stack.multiply(scalem(0.9, 1, 0.9));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};

Apartment.prototype.drawGround = function (h) {
    stack.multiply(translate(0,-h/2-0.05,0));
    gl.uniform1f(uColorMode, 2);
    stack.push();
    Tsidewalk.activate();
    stack.multiply(scalem(1, 0.05, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

}