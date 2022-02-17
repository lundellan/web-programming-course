class Salad {
  static instanceCounter = 0;
  constructor() {
    this.ingredients = {};
    Object.defineProperty(this, "uuid", {
      value: "salad_" + Salad.instanceCounter++,
      writable: true,
    });
  }
  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }
  remove(name) {
    delete this.ingredients[name];
    return this;
  }
  getPrice() {
    const price = Object.values(this.ingredients).reduce(
      (prev, curr) => prev + curr.price,
      0
    );
    return price;
  }
  count(property) {
    let count = 0;
    const found = Object.entries(this.ingredients).filter(
      (obj) => obj[1][property]
    );
    return found.length;
  }
}
export default Salad;
