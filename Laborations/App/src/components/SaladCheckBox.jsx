import { Component } from "react";
import { Link } from "react-router-dom";

class SaladCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // This could probably be refactored
    const exists = this.state[event.target.name];
    if (exists) {
      let newState = this.state;
      delete newState[event.target.name];
      this.setState(newState, () =>
        this.props.onChange(
          { [this.props.item_type]: Object.keys(this.state) },
          () =>
            this.props.onChange({
              [this.props.item_type]: Object.keys(this.state),
            })
        )
      );
    } else {
      this.setState({ [event.target.name]: true }, () =>
        this.props.onChange({ [this.props.item_type]: Object.keys(this.state) })
      );
    }
  }

  makeEntries(inventory, property) {
    // console.log(inventory);
    return Object.keys(inventory)
      .filter((name) => inventory[name][property])
      .map((obj, i) => {
        const label = obj + ", " + inventory[obj].price + " kr";
        return (
          <div className="col" key={"key_checkbox" + i}>
            <div className="col form-check">
              <input
                type="checkbox"
                name={obj}
                checked={this.state[obj] || false}
                onChange={this.handleChange}
                className="form-check-input"
                id={"checkbox_" + i}
              ></input>
              <Link to={{ pathname: `/view-ingredient/${obj}` }}>
                <label htmlFor={"check_" + i} className="form-check-label">
                  {label}
                </label>
              </Link>
            </div>
          </div>
        );
      });
  }

  render() {
    return (
      <div className="mb-3 form-group">
        <label className="form-label">{this.props.name}</label>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {this.makeEntries(this.props.inventory, this.props.item_type)}
        </div>
      </div>
    );
  }
}

export default SaladCheckBox;
