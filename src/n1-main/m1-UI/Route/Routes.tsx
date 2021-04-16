import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../../App";
import css from './Routes.module.css'

export const Navbar = () =>{
    return (
        <div>
            <div className={css.navlink}>
                <NavLink to={RoutePath.LOGIN}>Login</NavLink>
            </div >

            <div className={css.navlink}>
                <NavLink to={RoutePath.REGISTRATION}>Registration</NavLink>
            </div>

            <div className={css.navlink}>
                <NavLink to={RoutePath.PROFILE}>Profile</NavLink>
            </div>

            <div className={css.navlink}>
                <NavLink to={RoutePath.PACKS}>Packs</NavLink>
            </div>

            <div className={css.navlink}>
                <NavLink to={RoutePath.PASSWORD_RECOVERY}>Password recovery</NavLink>
            </div>

            <div className={css.navlink}>
                <NavLink to={RoutePath.TEST_COMPONENT}>Test component</NavLink>
            </div>
        </div>
    )
}