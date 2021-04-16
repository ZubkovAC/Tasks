import React from "react";
import { Redirect } from 'react-router-dom';

export const Unauthorised =()=>{
    return  (
        <>
            <p>You are not authorised! Redirecting to login..</p>
            {setTimeout(() => {
                <Redirect to={'/login'}/>
            }, 2000)}
        </>
    )
}