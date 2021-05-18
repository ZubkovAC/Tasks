import React from "react";
import {NavLink} from "react-router-dom";
import {RoutePath} from "../../../App";
import css from './Routes.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../m2-BLL/00-store/store";

import {logoutTC} from "../../m2-BLL/02-reducer-login/reducer-login";

export const Navbar = () => {

    const dispatch = useDispatch()
    let {lamp, isAuth} = useSelector((state: AppStateType) => state.login)


    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={css.Header}>
            <span className={lamp ? css.lamp : css.lampErr}>status</span>


            {!isAuth &&
            <div className={css.navlink}>
                <NavLink to={RoutePath.REGISTRATION} activeClassName={css.link}>Registration</NavLink>

            </div>
            }
            {!isAuth &&
            <div className={css.navlink}>
                <NavLink to={RoutePath.LOGIN} activeClassName={css.link}>Login</NavLink>
            </div>
            }
            {isAuth &&
            <div className={css.navlink}>
                <NavLink to={RoutePath.PROFILE} activeClassName={css.link}>Profile</NavLink>
            </div>


            }

            {isAuth &&
            <div className={css.navlink}>
                <NavLink to={RoutePath.PACKS} activeClassName={css.link}>Packs</NavLink>

            </div>
            }

            {!isAuth &&
            <div className={css.navlink}>
                <NavLink to={RoutePath.PASSWORD_RECOVERY} activeClassName={css.link}>Recovery pass</NavLink>
            </div>
            }
            {isAuth
            && <div  className={css.navlink} style={{right: '40px', position: 'fixed'}}>
                <NavLink to={RoutePath.LOGIN} onClick={onClickHandler}>Logout </NavLink>
              </div>
            }

            {/*<div className={css.navlink}>*/}
            {/*    <NavLink to={RoutePath.NEW_PASSWORD}>Test component</NavLink>*/}
            {/*</div>*/}
        </div>
    )
}