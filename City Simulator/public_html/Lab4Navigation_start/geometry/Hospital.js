function Hospital() {
    this.name = "hospital";

}

Hospital.prototype.drawHospital = function (h) {
    gl.uniform1f(uColorMode, 2);
    stack.multiply(translate(0, h , 0));
    stack.push();
    Thospital.activate();
    stack.multiply(scalem(1, h, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};