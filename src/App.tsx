import './App.css';

import { Route, Switch} from "react-router-dom";
import {Navbar} from "./n1-main/m1-UI/Route/Routes";
import {TestComponent} from "./n1-main/m1-UI/Common/TestComponent/TestComponent";
import {Login} from './n1-main/m1-UI/Common/Login/Login';
import {Registration} from "./n1-main/m1-UI/Common/Registration/Registration";
import {Profile} from "./n1-main/m1-UI/Common/Profile/Profile";
import {PasswordRecovery} from "./n1-main/m1-UI/Common/PasswordRecovery/PasswordRecovery";
import {Error404} from "./n1-main/m1-UI/Common/Error404/Error404";
import {HomePage} from "./n1-main/m1-UI/Common/HomePage/HomePage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {authMeTC} from "./n1-main/m2-BLL/02-reducer-login/login";
import {Packs} from "./n1-main/m1-UI/Common/Packs/Packs";

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

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(authMeTC())
    },[dispatch])




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
                    <Route path={RoutePath.REDIRECT} render={() => <Error404/>}/>

                </Switch>
            </div>


        </div>
    );
}

export default App;
