function City() {
    cityMap = new CityMap(6, 2);
    this.name = "city";

    this.length = cityMap.length;
    this.width = cityMap.width;
    this.height = cityMap.height;

    //marPos = cityMap.placeArray[1];



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
        stack.multiply(scalem(2, 2, 2));
        Shapes.city.drawMarket();
        Shapes.city.drawOffice();
        Shapes.city.drawFactory();
        Shapes.city.drawPark();
        Shapes.city.drawApartment();
        Shapes.city.drawHospital();
    };

    City.prototype.drawMarket = function () {

        stack.push();
        stack.multiply(translate(1.5, 0, -2.5));
        mar = new Market();
        mar.drawMarket();
        stack.pop();

        stack.push();
        stack.multiply(translate(1.5, 0, -1.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawOffice = function () {
        stack.push();
        stack.multiply(translate(1.5, 0, -0.5));
        off = new Office();
        off.drawOffice();
        stack.pop();

        stack.push();
        stack.multiply(translate(1.5, 0, 0.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawFactory = function () {
        stack.push();
        stack.multiply(translate(1.5, 0, 1.5));
        fac = new Factory();
        fac.drawFactory();
        stack.pop();

        stack.push();
        stack.multiply(translate(1.5, 0, 2.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawPark = function () {
        stack.push();
        stack.multiply(translate(-1.5, 0, -2.5));
        stack.multiply(rotateY(180));
        park = new Park();
        park.drawPark();
        stack.pop();

        stack.push();
        stack.multiply(translate(-1.5, 0, -1.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawApartment = function () {
        stack.push();
        stack.multiply(translate(-1.5, 0, -0.5));
        stack.multiply(rotateY(180));
        apr = new Apartment();
        apr.drawApartment();
        stack.pop();

        stack.push();
        stack.multiply(translate(-1.5, 0, 0.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawHospital = function () {
        stack.push();
        stack.multiply(translate(-1.5, 0, 1.5));
        stack.multiply(rotateY(180));
        hos = new Hospital();
        hos.drawHospital();
        stack.pop();

        stack.push();
        stack.multiply(translate(-1.5, 0, 2.5));
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };


}

