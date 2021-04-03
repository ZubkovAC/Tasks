import React from "react";
import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";


export const Registration = () => {
    return (
        <div>
            <h2>temporary stub</h2>
            <h3>Create account</h3>
            <SuperInputText/>
            <h3>your password</h3>
            <SuperInputText/>
            <h3>Your email</h3>
            <SuperInputText/>
            <SuperButton title={'create'}/>
            <p>Check that branch was created</p>
        </div>
    )
}