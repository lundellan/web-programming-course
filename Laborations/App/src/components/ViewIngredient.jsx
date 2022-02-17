import { Component } from "react";
import SaladCheckBox from "./SaladCheckBox";
import SaladSelect from "./SaladSelect";
import Salad from "./Salad";
import { useParams } from "react-router-dom";

function ViewIngredient(props) {
  let { name } = useParams();
  let inventory = props.inventory;

  return (
    <div className="row">
      <h2>{name}</h2>
      <hr></hr>
      <div className="col-2">
        <h4 className="text-muted mb-3">Vegansk?</h4>
        <h4 className="text-muted mb-5">Laktos?</h4>
        <h3 className="text-muted mb-3">Pris:</h3>
      </div>
      <div className="col-4">
        <h4 className="mb-3">{`${
          inventory[name].vegan ? "Ja! ✨" : "Nej 😥"
        }`}</h4>
        <h4 className="mb-5">{`${
          inventory[name].lactose
            ? "Ja, ingrediensen innehåller laktos"
            : "Nej 😥"
        }`}</h4>
        <h3 className="mb-3">{inventory[name].price} kr</h3>
      </div>

      {/* {Object.entries(inventory[name]).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <div key={key}>
              <h5>{key}</h5>
              </div>
              );
            }
            return (
              <div>
              <h5>{key}:</h5> <p>{value}</p>
              </div>
              );
            })} */}
    </div>
  );
}

export default ViewIngredient;
