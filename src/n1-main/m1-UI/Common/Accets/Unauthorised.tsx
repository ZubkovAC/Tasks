import React from "react";
import { Redirect } from 'react-router-dom';
import {lampAC} from "../../../m2-BLL/02-reducer-login/reducer-login";

export const Unauthorised =()=>{
    const  redire = () => {
        return (<Redirect to={'/login'}/>)
    }
    //потом суп с котом
    return  (
        <div>

            <h2>You are not authorised! Redirecting to login..</h2>
            {/*setTimeout(() => redire() , 2000)*/}
            <img src="https://i.ytimg.com/vi/Ha9tQlRTGms/maxresdefault.jpg" width='900px' alt="panda"/>
        </div>
    )
}