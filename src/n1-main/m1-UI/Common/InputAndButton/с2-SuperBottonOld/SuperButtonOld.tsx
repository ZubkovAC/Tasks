import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperButtonOld.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    title?:string
    onClick?: () => void
    onChange?:any
    password?:string
    resetPasswordsToken?:string
    transform?:boolean

}



const SuperButtonOld: React.FC<SuperButtonPropsType> = (
    {
        red, className,title,onChange,onClick,transform,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    //const finalClassName = `${red ? s.red : s.default} ${className}`;
    //const finalClassName={ props.error? s.buttonErrorTrue : s.buttonErrorFalse}

    const onClickButon = () =>{
        onClick && onClick()
    }



    return (
        <button

            className={ transform?  s.buttonOldT: s.buttonOld}
            //className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
            onClick={onClickButon}
        >{title}</button>
    );
}



export default SuperButtonOld;
