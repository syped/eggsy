// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user ? (
        <>
          <div className="menu">
            <button onClick={openMenu} className="profile-button">
              {/* <img src={menuicon} className="menu"></img> */}
              <i className="fa fa-bars"></i>
              <i className="fas fa-user-circle" />
            </button>

            <div className={ulClassName} ref={ulRef}>
              <div className="dropdowncontainer move">
                <div className="menu-user">{user.username}</div>
                <div className="menu-name">{user.firstName}</div>
                <div className="menu-email">{user.email}</div>
                <div className="manage-products-button">
                  <NavLink
                    className="manage-products-link"
                    to="/products/current"
                  >
                    Manage Products
                  </NavLink>
                </div>
                <div>
                  <button className="log-out-button" onClick={logout}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="menu">
            <button onClick={openMenu} className="profile-button">
              {/* <img src={menuicon} className="menu"></img> */}
              <i className="fa fa-bars"></i>
              <i className="fas fa-user-circle" />
            </button>

            <div className={ulClassName} ref={ulRef}>
              <div className="dropdowncontainer move">
                <div className="sign-up-button">
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                  />
                </div>
                <div className="log-in-button">
                  <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileButton;
