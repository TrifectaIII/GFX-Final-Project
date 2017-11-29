function Park() {
    this.name = "park";


    Park.prototype.drawPark = function (h) {
        stack.multiply(translate(0, -h, 0));
        stack.multiply(scalem(1, h, 1));
        stack.push();

        Shapes.park.drawBase(h);
        stack.pop();
    };

    Park.prototype.drawBase = function (h) {


        gl.uniform1f(uColorMode, 2);
        stack.push();
        Tpark.activate();
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    };
}