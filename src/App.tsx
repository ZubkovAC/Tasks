import './App.css';

import { Route, Switch} from "react-router-dom";
import {Navbar} from "./n1-main/m1-UI/Route/Routes";
import {TestComponent} from "./n1-main/m1-UI/NavBar(left)/06-TestComponent/TestComponent";
import {Login} from './n1-main/m1-UI/NavBar(left)/01-Login/Login';
import {Registration} from "./n1-main/m1-UI/NavBar(left)/02-Registration/Registration";
import {Profile} from "./n1-main/m1-UI/NavBar(left)/03-Profile/Profile";
import {PasswordRecovery} from "./n1-main/m1-UI/NavBar(left)/05-PasswordRecovery/PasswordRecovery";
import {Error404} from "./n1-main/m1-UI/NavBar(left)/allComponentPages/Error404/Error404";
import {HomePage} from "./n1-main/m1-UI/NavBar(left)/allComponentPages/HomePage/HomePage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "./n1-main/m2-BLL/02-reducer-login/reducer-login";
import {Packs, PardsTypeProps} from "./n1-main/m1-UI/NavBar(left)/04-Packs/Packs";
import {AppStateType} from "./n1-main/m2-BLL/00-store/store";
import {PackId} from "./n1-main/m1-UI/NavBar(left)/allComponentPages/packIDpage/PackID";

export const RoutePath = {
    HOME_RAGE:'/',
    LOGIN: "/login",
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/recovery',
    TEST_COMPONENT: "/testComponent",
    PACKS: '/packs',
    ERROR_404: "/404",
    REDIRECT: '*',
}

function App() {

    let cardPacks =  useSelector<AppStateType,Array<PardsTypeProps>>(state => state.packs.cardPacks)
    const isAuth = useSelector<AppStateType,boolean>(state=> state.login.isAuth)

    const dispatch = useDispatch()
    useEffect(()=>{
        if (!isAuth) dispatch(authMeTC())
    },[])




    return (
        <div className="App">
            <div style={{float: 'left', margin: '40px', height: '1000px'}}>
                <Navbar/>
            </div>
            <div style={{margin: '40px'}}>
                <Switch>
                    <Route exact path={RoutePath.HOME_RAGE} render={() => <HomePage/>}/>
                    <Route exact path={RoutePath.LOGIN} render={() => <Login/>}/>
                    <Route exact path={RoutePath.REGISTRATION} render={() => <Registration/>}/>
                    <Route exact path={RoutePath.PROFILE} render={() => <Profile/>}/>
                    <Route exact path={RoutePath.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                    <Route exact path={RoutePath.TEST_COMPONENT} render={() => <TestComponent/>}/>
                    <Route exact path={RoutePath.PACKS} render={() => <Packs/>}/>

                    <Route path={RoutePath.PACKS} render={() => <PackId/>}/>
                    <Route path={RoutePath.REDIRECT} render={() => <Error404/>}/>

                </Switch>
            </div>


        </div>
    );
}

export default App;
