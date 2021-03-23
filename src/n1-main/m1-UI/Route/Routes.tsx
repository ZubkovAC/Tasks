import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () =>{
    return (
        <div>
            <div>
                <NavLink to={'/login'}>Login</NavLink>
            </div>
            <div>
                <NavLink to={'/registration'}>Registration</NavLink>
            </div>
            <div>
                <NavLink to={'/profile'}>Profile</NavLink>
            </div>
            <div>
                <NavLink to={'/recovery'}>Password recovery</NavLink>
            </div>
            <div>
                <NavLink to={'/new_password'}>New password</NavLink>
            </div>
            <div>
                <NavLink to={'/testComponent'}>Test component</NavLink>
            </div>


        </div>
    )
}