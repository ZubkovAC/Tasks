import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    title?:string
    onClickButon?: () => void
    onChange?:any

}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,title,onChange,onClickButon,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    //const finalClassName = `${red ? s.red : s.default} ${className}`;
    //const finalClassName={ props.error? s.buttonErrorTrue : s.buttonErrorFalse}

    const onClick = () =>{
        onClickButon && onClickButon()
    }


    return (
        <button
            className={red? s.buttonErrorTrue : s.buttonErrorFalse }
            //className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
            onClick={onClick}
        >{title}</button>
    );
}

export default SuperButton;
