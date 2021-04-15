import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../../App";

export const Navbar = () =>{
    return (
        <div>
            <div>
                <NavLink to={RoutePath.LOGIN}>Login</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.REGISTRATION}>Registration</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.PROFILE}>Profile</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.PACKS}>Packs</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.CARDS}>Cards</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.PASSWORD_RECOVERY}>Password recovery</NavLink>
            </div>

            <div>
                <NavLink to={RoutePath.TEST_COMPONENT}>Test component</NavLink>
            </div>

        </div>
    )
}