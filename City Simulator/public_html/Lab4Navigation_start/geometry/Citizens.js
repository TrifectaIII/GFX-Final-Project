function Citizens(pop, blocs) {
    this.name = "citizens";

    this.population = pop;
    this.bLocations = blocs;
    this.people = [];
    this.generateCitizens();
    //this.drawCitizens();



}
Citizens.prototype.generateCitizens = function () {
    for (i = 0; i < this.population; i++) {
        this.people[i] = new Person(this.bLocations, i);
    }
};

Citizens.prototype.drawCitizens = function () {
    for (i = 0; i < this.people.length; i++) {
        this.people[i].drawPerson();
    }
};

Citizens.prototype.incrementCitizens = function () {
    for (i = 0; i < this.people.length; i++) {
        this.people[i].increment();
        this.people[i].animPerson();
    }
}

Citizens.prototype.personToString = function(p){
    return this.people[p].toString();
};
