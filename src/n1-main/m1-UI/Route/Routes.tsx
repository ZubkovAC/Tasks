import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../../App";
import css from './Routes.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../m2-BLL/00-store/store";

export const Navbar = () =>{

    let lamp = useSelector<AppStateType,boolean>(state=>state.login.lamp)

    return (
        <div>
            <span className={lamp ? css.lamp:css.lampErr}>status</span>
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
                <NavLink to={RoutePath.PASSWORD_RECOVERY}>Recovery pass</NavLink>
            </div>

            {/*<div className={css.navlink}>*/}
            {/*    <NavLink to={RoutePath.TEST_COMPONENT}>Test component</NavLink>*/}
            {/*</div>*/}
        </div>
    )
}