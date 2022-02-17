import { Component } from "react";

class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.shoppingCart.status === "confirmed") {
      return( 
        <div>
          <h2>Beställningen är lagd!</h2>
        </div>
      )
    }
  }
}

export default OrderConfirmation;
