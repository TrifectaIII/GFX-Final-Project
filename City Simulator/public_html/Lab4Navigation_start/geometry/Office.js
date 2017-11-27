function Office(){
    this.name = "office";
}

Office.prototype.drawOffice = function () {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    officetex.activate();
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.multiply(translate(0,1,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    gl.uniform1f(uColorMode, 1);
    gl.uniform4fv(uColor, vec4(0.505, 0.360, 0.215,1));
    stack.push();
    stack.multiply(translate(-0.48,0,0));
    stack.multiply(scalem(0.1,0.3,0.3));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};
