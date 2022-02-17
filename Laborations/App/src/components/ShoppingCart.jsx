import { Component } from "react";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
  }

  renderSalad(saladInput) {
    const salad = saladInput["ingredients"];
    return Object.keys(salad).map((obj, i) => {
      return (
        <div key={"key_entry_" + i} className="col">
          <h6 className="text-black">
            {obj}, <p className="mb-0">{salad[obj].price} kr</p>
          </h6>
        </div>
      );
    });
  }
  renderShoppingCart(shoppingCart) {
    return (
      <div>
        <h2 className="mb-4">Din kundvagn</h2>

        <div className="container-fluid">
          {shoppingCart.map((salad) => (
            <div key={Math.random()}>
              <hr className="my-4"></hr>
              <div className="row justify-content-between mb-5">
                <div className="col-1 mb-3">
                  <h1>🥗</h1>
                </div>
                {this.renderSalad(salad)}
                <div className="col-1 mb-3">
                  {/* <h5>{this.calcPrice(obj)} kr</h5> */}
                  <h5>{salad.getPrice()} kr</h5>
                </div>
              </div>
            </div>
          ))}
          <h3>
            Totalt:{" "}
            {shoppingCart.reduce((prev, curr) => {
              return prev + curr.getPrice();
            }, 0)}{" "}
            kr
          </h3>

          <div className="col">
            <button
              type="submit"
              onClick={this.props.submitShoppingCart}
              className="btn btn-primary"
            >
              Beställ
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.shoppingCart.length > 0) {
      return this.renderShoppingCart(this.props.shoppingCart);
    } else {
      return <h2 className="mb-4">Inget i varukorgen än!</h2>;
    }
  }
}

export default ShoppingCart;
