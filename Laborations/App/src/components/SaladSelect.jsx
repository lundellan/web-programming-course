import { Component } from "react";

class SaladSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [this.props.item_type]: event.target.value }, () => {
      this.props.onChange(this.state);
    });
    event.target.parentElement.classList.add("was-validated");
  }

  makeEntries(inventory, property) {
    return Object.keys(inventory)
      .filter((name) => inventory[name][property])
      .map((obj) => {
        return (
          <option key={property + obj} value={obj}>
            {obj}, {inventory[obj].price} kr
          </option>
        );
      });
  }

  render() {
    return (
      <div className="mb-3 row">
        <div className="form-group">
          <label htmlFor={"id_" + this.props.name}>{this.props.name}</label>
          <select
            required
            id={"id_" + this.props.name}
            className="form-select"
            name={this.props.name}
            value={this.state[this.props.item_type]}
            onChange={this.handleChange}
          >
            <option key="noneselected" value="">
              Välj ett alternativ...
            </option>
            {this.makeEntries(this.props.inventory, this.props.item_type)}
          </select>
          <div className="invalid-feedback">
            Välj ett alternativ innan du försöker beställa, jävla pappskalle!
          </div>
        </div>
      </div>
    );
  }
}

export default SaladSelect;
