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
        if (cityMap.rotate[0] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[0]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[0]));
        }
        mar = new Market();
        mar.drawMarket();
        stack.pop();

        stack.push();
        if (cityMap.rotate[0] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[0] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[0] + 1));
        }

        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawOffice = function () {
        stack.push();
        if (cityMap.rotate[1] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[1]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[1]));
        }
        off = new Office();
        off.drawOffice();
        stack.pop();

        stack.push();
        if (cityMap.rotate[1] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[1] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[1] + 1));
        }
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawFactory = function () {
        stack.push();
        if (cityMap.rotate[2] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[2]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[2]));
        }
        fac = new Factory();
        fac.drawFactory();
        stack.pop();

        stack.push();
        if (cityMap.rotate[2] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[2] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[2] + 1));
        }
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawPark = function () {
        stack.push();
        if (cityMap.rotate[3] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[3]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[3]));
        }
        stack.multiply(rotateY(180));
        park = new Park();
        park.drawPark();
        stack.pop();

        stack.push();
        if (cityMap.rotate[3] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[3] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[3] + 1));
        }
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawApartment = function () {
        stack.push();
        if (cityMap.rotate[4] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[4]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[4]));
        }
        stack.multiply(rotateY(180));
        apr = new Apartment();
        apr.drawApartment();
        stack.pop();

        stack.push();
        if (cityMap.rotate[4] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[4] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[4] + 1));
        }
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };

    City.prototype.drawHospital = function () {
        stack.push();
        if (cityMap.rotate[5] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[5]));
            stack.multiply(rotateY(180));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[5]));
        }
        stack.multiply(rotateY(180));
        hos = new Hospital();
        hos.drawHospital();
        stack.pop();

        stack.push();
        if (cityMap.rotate[5] === true) {
            stack.multiply(translate(-1.5, 0, cityMap.positions[5] + 1));
        } else {
            stack.multiply(translate(1.5, 0, cityMap.positions[5] + 1));
        }
        g1 = new Ground();
        g1.drawGround();
        stack.pop();
    };


}

