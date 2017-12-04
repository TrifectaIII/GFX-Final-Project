function City() {
    cityMap = new CityMap(10, 2);
    this.name = "city";

    this.length = cityMap.length;
    this.width = cityMap.width;
    this.height = cityMap.height;


    City.prototype.drawCity = function () {
        Shapes.city.drawRoad();
        Shapes.city.drawBuildings();
    };

    City.prototype.drawRoad = function () {
        stack.push();
        stack.multiply(scalem(2, 0.01, this.length));
        stack.multiply((translate(0, this.height, 0)));
        gl.uniform1f(uColorMode, 2);
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        road.activate();
        Shapes.drawPrimitive(Shapes.road);
        stack.pop();
    };

    City.prototype.drawBuildings = function () {
        Shapes.city.drawMarket();
        Shapes.city.drawOffice();
        //Shapes.city.drawFactory();
        //Shapes.city.drawPark();
        //Shapes.city.drawApartment();
        //Shapes.city.drawHospital();
    };

    City.prototype.drawMarket = function () {
        stack.push();
        stack.multiply(translate(2.5, 0, 0));
        mar = new Market();
        mar.drawMarket();
        stack.pop();
    };

    City.prototype.drawOffice = function () {
        stack.push();
        stack.multiply(translate(2.5, 0, 1));
        off = new Office();
        off.drawOffice();
        stack.pop();
    };

    City.prototype.drawFactory = function () {
        stack.push();
        stack.multiply(translate(2.5, 0, 2));
        fac = new Factory();
        fac.drawFactory();
        stack.pop();
    };
    


}

