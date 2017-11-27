function Office(){
    this.name = "office";
}

Office.prototype.drawOffice = function () {
    stack.push();
    officetex.activate();
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};
