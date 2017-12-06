function CityMap(l, w) {
    this.length = l;
    this.width = w;
    this.height = -0.5;
    this.generate();
    
    //var rotate;

}

CityMap.prototype.generate = function () {
    this.positions = [];
    this.rotate = [];

    for (var i = 0; i < 6; i++) {
        this.positions[i] = i;
    }

    this.positions = this.shuffleArray(this.positions);

    for (var i = 0; i < 6; i++) {
        console.log(this.positions[i]);
    }

    for (var i = 0; i < 6; i++) {
        if (this.positions[i] > 2) {
            this.rotate[i] = true;
            this.positions[i] = this.positions[i]-3;
            //this.positions[i] = -this.positions[i];
        } else {
            this.rotate[i] = false;
        }
        this.positions[i] = this.positions[i]*-2+1.5;
        
    }

    for (var i = 0; i < 6; i++) {
        console.log(this.positions[i]);
        console.log(this.rotate[i]);
    }




//    for (var i = 0; i < 6; i++) {
//        var x = this.getRandomPlace();
//        if (x > 2) {
//            x = x - 3;
//            this.rotate[i] = true;
//            this.positions[i] = x - 0.5;
//        } else {
//            this.rotate[i] = false;
//            this.positions[i] = x + 0.5;
//        }

    //console.log("Position at " + i + ":" + this.positions[i]);
    //console.log("Rotate at " + i + ":" + this.rotate[i]);

};

CityMap.prototype.shuffleArray = function () {
    //Fisher-Yates Shuffle
    var i = this.positions.length,
            j = 0,
            temp;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));

        temp = this.positions[i];
        this.positions[i] = this.positions[j];
        this.positions[j] = temp;
    }

    return this.positions;
};

CityMap.prototype.getRandomPlace = function () {
    var min = 0;
    var max = 6;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};




