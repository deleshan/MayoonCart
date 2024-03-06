import React from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logOut } from "../../actions/userActions";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = () => {
    dispatch(logOut);
  };

  return (
    <nav className="navbar row mx-auto">
      <div className="col-12 col-md-3">
        <div className="navbar-brand mx-auto">
          <Link to="/">
            <img className="logo9" src="/images/logo9.png" alt="logo" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-13 col-md-3  mt-4 mt-md-0 text-center">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              variant="default darkBlue pr-5"
              id="dropdown-basic"
            >
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user.avatar ?? "./images/default_avatar.png"}
                />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role === "admin" && (
                <Dropdown.Item
                  onClick={() => {
                    navigate("/admin/Dashboard");
                  }}
                  className="text-danger"
                >
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item
                onClick={() => {
                  navigate("/myprofile");
                }}
                className="text-danger"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders");
                }}
                className="text-danger"
              >
                My Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logOutHandler} className="text-danger">
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to={"/login"} className="btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to="/cart">
          <span id="cart" className="ml-3">
            <img className="cart-logo" src="/images/cartlogo.png" alt="cart" />
          </span>
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems.length}
        </span>
      </div>
      <div className="line"></div>
    </nav>
  );
};

export default Header;
