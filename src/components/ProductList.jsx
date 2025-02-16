import { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { plantsArray } from "../data/plants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

function ProductList() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff!important",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignIems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };
  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    setAddedToCart({ ...addedToCart, [plant.name]: true });
    dispatch(addItem(plant));
  };

  const totalCartItems = () => {
    return [...cartItems].reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" style={{ textDecoration: "none" }}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart">
                <span
                  style={{ marginLeft: totalCartItems() > 9 ? "18px" : "28px" }}
                  className="cart_quantity_count"
                >
                  {totalCartItems() > 0 && totalCartItems()}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1
                className="plant_heading"
                style={{ alignSelf: "center", justifySelf: "center" }}
              >
                {category.category}
              </h1>
              <div className="product-list" key={index}>
                {category.plants.map((d, index) => (
                  <div
                    className="product-card"
                    style={{ display: "flex", flexDirection: "column" }}
                    key={index}
                  >
                    <img
                      className="product-image"
                      src={d.image}
                      alt={d.name + " plant"}
                    />
                    <span className="product-title">{d.name}</span>
                    <span className="product-description">{d.description}</span>
                    <span className="product-price"> {d.cost}</span>
                    <button
                      disabled={cartItems.find((item) => item.name === d.name)}
                      onClick={() => handleAddToCart(d)}
                      className={`product-button ${
                        cartItems.find((item) => item.name === d.name) &&
                        "added-to-cart"
                      }`}
                    >
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
