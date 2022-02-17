import { Component } from "react";
import SaladCheckBox from "./SaladCheckBox";
import SaladSelect from "./SaladSelect";
import Salad from "./Salad";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(event);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.checkValidity() === false) {
      event.stopPropagation();
      event.target.classList.add("was-validated");
      return;
    }
    let salad = new Salad();
    Object.values(this.state)
      .flat()
      .forEach((obj) => salad.add(obj.toString(), this.props.inventory[obj]));
    // console.log(salad);
    this.props.onSubmit(salad);
    this.props.navigate("/view-order");
  }

  render() {
    return (
      <div>
        <h2 className="mb-4">Välj innehållet i din sallad</h2>
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="mb-3 col align-items-center">
              <SaladSelect
                inventory={this.props.inventory}
                item_type="foundation"
                name="Foundation"
                onChange={this.handleChange}
              />
              <SaladSelect
                inventory={this.props.inventory}
                item_type="protein"
                name="Protein"
                onChange={this.handleChange}
              />
              <SaladCheckBox
                inventory={this.props.inventory}
                item_type="extra"
                name="Extras"
                onChange={this.handleChange}
              />
              <SaladSelect
                inventory={this.props.inventory}
                item_type="dressing"
                name="Dressing"
                onChange={this.handleChange}
              />

              <div className="col">
                <button type="submit" className="btn btn-primary">
                  Beställ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ComposeSalad;
