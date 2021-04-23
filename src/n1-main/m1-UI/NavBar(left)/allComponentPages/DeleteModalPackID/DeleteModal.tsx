import React, {useState} from "react";
import {Modal} from "../../../Common/Modal/Modal";

type DeleteModalPropsType = {
    children:any
}

export const DeleteModal = (props:any) => {

    const [active,setActive]=useState<boolean>(false)

    return(
        <>
            <Modal active={active} setActive={setActive} {...props.children}/>
            {props.title}
            {props.button}
            {props.children}
        </>
    )
}