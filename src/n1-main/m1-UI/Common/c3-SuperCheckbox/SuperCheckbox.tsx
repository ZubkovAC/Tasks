import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./SuperCheckbox.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    title?:string
    cheked?:boolean
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,title,cheked,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    // const finalInputClassName = `${s.checkbox} ${className ? className : ""}`;

    return (
        <div className={s.checkbox}>
            {/*<label>

                <input
                    type={"checkbox"}
                    onChange={onChangeCallback}
                    className={finalInputClassName}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
                />
                {title}
                {children && <span className={s.spanClassName}>{children}</span>}
            </label> // благодаря label нажатие на спан передастся в инпут
*/}

            <label>
                <input
                    type="checkbox"
                    checked={cheked}
                    onChange={onChangeCallback}
                    className={`${s.option_input} ${s.radio}`}
                    name="example"
                    {...restProps}
                />
                {title}
            </label>
        </div>

    );
}

export default SuperCheckbox;
