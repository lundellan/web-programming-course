import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import ComposeSaladWrapper from "./components/ComposeSaladWrapper";
import ShoppingCart from "./components/ShoppingCart.jsx";
import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import ViewIngredient from "./components/ViewIngredient";
import FetchInventory from "./components/FetchInventory";
import OrderConfirmation from "./components/OrderConfirmation";
import Salad from "./components/Salad";

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Salad Bonanza</span>
    </header>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Välkommen!
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
          Visa kundvagn
        </NavLink>
      </li>
    </ul>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

export default function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [inventory, setInventory] = useState({});
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function checkInventory() {
      if (!window.localStorage.getItem("inventory")) {
        console.log("Fetching inventory...");
        const result = await FetchInventory();
        setInventory(result);
        window.localStorage.setItem("inventory", JSON.stringify(result));
      } else {
        setInventory(JSON.parse(window.localStorage.getItem("inventory")));
      }
    }

    checkInventory();

    let order = window.localStorage.getItem("order");
    if (order) {
      order = JSON.parse(order);
      order.map((obj) => Object.setPrototypeOf(obj, Salad.prototype));
      setShoppingCart(order);
    }
    // console.log(order);
  }, []);

  function handleSubmit(saladInput) {
    setShoppingCart([...shoppingCart, saladInput]);
    const order = JSON.stringify([...shoppingCart, saladInput]);
    window.localStorage.setItem("order", order);
    // console.log(saladInput.uuid);
  }

  async function submitShoppingCart() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:
        "[" + JSON.stringify(Object.keys(shoppingCart[0].ingredients)) + "]",
    };

    const response = await fetch(
      "http://localhost:8080/orders/",
      requestOptions
    ).then((response) => response.json());

    setOrder(response);
    navigate("/order-confirmation");
    setShoppingCart([]);
    window.localStorage.setItem("order", "");
  }

  function PageContent() {
    return (
      <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3 mt-3">
          <Routes>
            <Route
              path="view-ingredient/:name"
              element={<ViewIngredient inventory={inventory} />}
            />
            <Route path="/" element={<Welcome />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="compose-salad"
              element={
                <ComposeSaladWrapper
                  inventory={inventory}
                  onSubmit={handleSubmit}
                />
              }
            />
            <Route
              path="view-order"
              element={
                <ShoppingCart
                  shoppingCart={shoppingCart}
                  submitShoppingCart={submitShoppingCart}
                />
              }
            />
            <Route
              path="order-confirmation"
              element={<OrderConfirmation shoppingCart={order} />}
            />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <PageContent />
      <Footer />
    </div>
  );
}
