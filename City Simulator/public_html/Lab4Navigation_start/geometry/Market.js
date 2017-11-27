function Market(){
    this.name = "market";
}

Market.prototype.drawMarket = function () {
    gl.uniform1f(uColorMode, 2);
    stack.push();
    markettex.activate();
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};
