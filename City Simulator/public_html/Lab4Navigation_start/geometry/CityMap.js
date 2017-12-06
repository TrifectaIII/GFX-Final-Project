function CityMap(l, w) {
    this.length = l;
    this.width = w;
    this.height = -0.5;
    this.generate();
    var positions;
    var rotate;

}

CityMap.prototype.generate = function () {
    this.positions = [];
    this.rotate = [];

    for (var i = 0; i < 6; i++) {
        var x = this.getRandomPlace();
        if (x > 2) {
            x = x - 3;
            this.rotate[i] = true;
            this.positions[i] = x - 0.5;
        } else {
            this.rotate[i] = false;
            this.positions[i] = x + 0.5;
        }

    }

};

CityMap.prototype.getRandomPlace = function () {
    var min = 0;
    var max = 6;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}




