import './App.css';
import {Route, Switch} from "react-router-dom";
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
import {Packs} from "./n1-main/m1-UI/NavBar(left)/04-Packs/Packs";
import {AppStateType} from "./n1-main/m2-BLL/00-store/store";
import {PackId} from "./n1-main/m1-UI/NavBar(left)/allComponentPages/packIDpage/PackID";
import {LearnPage} from "./n1-main/m1-UI/NavBar(left)/allComponentPages/LearnPage/LearnPage";
import {TableMenu} from "./n1-main/m1-UI/Common/TableContents/TableMenu";
import {NewPassword} from "./n1-main/m1-UI/NavBar(left)/05-PasswordRecovery/NewPassword";


export const RoutePath = {
    HOME_RAGE:'/',
    LOGIN: "/login",
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/recovery',
    NEW_PASSWORD: '/newPassword',
    TEST_COMPONENT: "/testComponent",
    PACKS: '/packs',
    LEARN: '/learn',
    ERROR_404: "/404",
    REDIRECT: '*',
}

const LoginR = React.memo(Login)


function App() {

    let {isAuth,me} = useSelector((state:AppStateType)=> state.login)

    const dispatch = useDispatch()
    useEffect(()=>{
        if (!isAuth && !me) dispatch(authMeTC())
    },[dispatch , me ,isAuth])



    return (
        <div className="App">
            <div >
                <Navbar/>
            </div>
            <div style={{margin: '40px'}}>
                <Switch>

                    <Route exact path={RoutePath.LOGIN} render={() => <TableMenu children={<LoginR/>}/>}/>
                    <Route exact path={RoutePath.REGISTRATION} render={() =><TableMenu children={ <Registration/>}/>}/>
                    <Route exact path={RoutePath.PASSWORD_RECOVERY} render={() => <TableMenu children={<PasswordRecovery/>}/> }/>
                    <Route exact path={RoutePath.PACKS} render={() => <Packs/>}/>
                    <Route exact path={RoutePath.PROFILE} render={() => <Profile/>}/>
                    <Route exact path={RoutePath.HOME_RAGE} render={() => <HomePage/>}/>
                    <Route exact path={RoutePath.TEST_COMPONENT} render={() => <TestComponent/>}/>
                    <Route exact path={RoutePath.LEARN+ '/:id'} render={() => <LearnPage/>}/>

                    <Route  path={RoutePath.NEW_PASSWORD+'/:token'} render={() => <TableMenu children={<NewPassword/>}/>}/>

                    <Route path={RoutePath.PACKS + '/:id'} render={() => <PackId />}/>
                    <Route path={RoutePath.REDIRECT} render={() => <Error404/>}/>

                </Switch>
            </div>


        </div>
    );
}

export default App;
