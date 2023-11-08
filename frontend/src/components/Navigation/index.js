// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    // <ul>
    //   <li>
    //     <NavLink exact to="/">
    //       Home
    //     </NavLink>
    //   </li>
    //   {isLoaded && (
    //     <li>
    //       <ProfileButton user={sessionUser} />
    //     </li>
    //   )}
    // </ul>
    <div className="header">
      <div className="header-content">
        <div className="nav-header-left">
          <div className="nav-logo">
            <NavLink to="/">Eggsy</NavLink>
          </div>
        </div>
        <div className="nav-header-right">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
