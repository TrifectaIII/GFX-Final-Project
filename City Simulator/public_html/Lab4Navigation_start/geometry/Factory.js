function Factory(){
    this.name = "factory";
}

Factory.prototype.drawFactory = function () {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    factorytex.activate();
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.multiply(translate(0,1,0));
    stack.push();
    stack.multiply(translate(0,0,0.25));
    stack.multiply(scalem(0.1,0.5,0.1));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
    stack.multiply(translate(0,0,-0.25));
    stack.multiply(scalem(0.1,0.5,0.1));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
};
