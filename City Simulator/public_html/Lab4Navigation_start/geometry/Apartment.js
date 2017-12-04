function Apartment() {
    this.name = "apartment";

}

Apartment.prototype.drawApartment = function () {
    stack.multiply(translate(0, 0.01, 0));
    Shapes.apartment.drawRoof(2);
    Shapes.apartment.drawBase(2);
    Shapes.apartment.drawGround(2);
};


Apartment.prototype.drawRoof = function (h) {
    stack.push();
    stack.multiply(translate(0, h / 4, 0));
    roof = Shapes.roof;
    roof.drawRoof(h);
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    stack.pop();
};

Apartment.prototype.drawBase = function (h) {
    stack.push();
    stack.multiply(translate(0, h / 4, 0));
    gl.uniform1f(uColorMode, 2);
    Tapartment.activate();
    stack.multiply(scalem(0.9, 1, 0.9));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    gl.uniform1f(uColorMode, 1);
    gl.uniform4fv(uColor, vec4(0.505, 0.360, 0.215, 1));
    stack.push();
    stack.multiply(translate(0, h / 4, 0));
    stack.multiply(translate(-0.48, -h / 4, 0));
    stack.multiply(scalem(0.1, 0.3, 0.3));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

};

Apartment.prototype.drawGround = function (h) {
    stack.multiply(scalem(1, 0.01, 1));
    gl.uniform1f(uColorMode, 2);
    stack.push();
    Tsidewalk.activate();
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

}