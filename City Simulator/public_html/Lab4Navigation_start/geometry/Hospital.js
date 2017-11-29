function Hospital() {
    this.name = "hospital";

}

Hospital.prototype.drawHospital = function (h) {
    gl.uniform1f(uColorMode, 2);
    stack.multiply(translate(0, h / 2, 0));
    stack.push();
    Thospital.activate();
    stack.multiply(scalem(1, h, 1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

    gl.uniform1f(uColorMode, 1);
    gl.uniform4fv(uColor, vec4(0.505, 0.360, 0.215, 1));
    stack.push();
    stack.multiply(translate(-0.48, -h/2, 0));
    stack.multiply(scalem(0.1, 0.3, 0.3));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};