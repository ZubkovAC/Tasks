import React, {ButtonHTMLAttributes, DetailedHTMLProps, useCallback} from "react";
import s from "./SuperButtonOld.module.css";


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    title:string
    onClick?: (e?:any) => void
    onChange?:any
    password?:string
    resetPasswordsToken?:string
    transform?:boolean
    disabled?:boolean
}


const SuperButtonOld =  ({red, className,title,disabled, onChange,onClick,transform, ...restProps}:SuperButtonPropsType) => {
    console.log('button')

    const DisabledTrue = {
        backgroundColor:'grey',
    }
    const DisabledFalse = {
        backgroundColor:'wheat',
    }


    const onClickButon = useCallback( () =>{
        onClick && onClick()
    },[onClick])

    return (
        <button
            disabled={disabled}
            className={ transform?  s.buttonOldT : s.buttonOld }
            style={disabled? DisabledTrue:DisabledFalse}


            onClick={onClickButon}
        >{title}</button>
    );
}



export default SuperButtonOld;
