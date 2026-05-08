class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h ${this.isTrunkOpen}`);
  }

  go() {
    if(this.speed >= 200) return;
    if(this.isTrunkOpen === true) return;
    this.speed += 5;
  }

  brake() {
    if(this.speed <=0) return;
    this.speed -= 5;
  }

  openTrunk() {
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

car1.go();
car1.go();
car1.brake();

car2.go();
car2.go();
car2.brake();

car1.openTrunk();
car1.closeTrunk();

car2.openTrunk();

car1.displayInfo();
car2.displayInfo();

console.log(car1);
console.log(car2);


class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if(this.speed >= 300) return;
    this.speed += this.acceleration;
  }

  openTrunk() {
    console.log('raceCars do not have a trunk');
  }

  closeTrunk() {
    console.log('raceCars do  not have a trunk');
  }
}

const raceCar1 = new RaceCar({
  brand: 'Mclaren',
  model: 'F1',
  acceleration: 20
});



raceCar1.openTrunk();

raceCar1.go();

raceCar1.displayInfo();

console.log(raceCar1);