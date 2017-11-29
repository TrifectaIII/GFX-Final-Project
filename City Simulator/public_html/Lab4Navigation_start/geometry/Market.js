function Market(){
    this.name = "market";
}

Market.prototype.drawMarket = function () {
    gl.uniform1f(uColorMode, 2);
    greentex.activate();
    stack.push();
    stack.multiply(scalem(1,0.3,1));
    stack.multiply(translate(0, 0.5, 0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    poletex.activate();
    stack.push();
    stack.multiply(translate(0,0.5,0));
    stack.push();
    stack.multiply(translate(0.45,0.15,0.45));
    stack.multiply(scalem(0.1,0.7,0.1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    stack.push();
    stack.multiply(translate(-0.45,0.15,0.45));
    stack.multiply(scalem(0.1,0.7,0.1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    stack.push();
    stack.multiply(translate(0.45,0.15,-0.45));
    stack.multiply(scalem(0.1,0.7,0.1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    stack.push();
    stack.multiply(translate(-0.45,0.15,-0.45));
    stack.multiply(scalem(0.1,0.7,0.1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    stack.pop();
    
    
    tenttex.activate();
    stack.push();
    stack.multiply(translate(0,1,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.pyramid);
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
