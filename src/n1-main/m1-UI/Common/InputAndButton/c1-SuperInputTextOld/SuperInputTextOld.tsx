import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
} from "react";
import s from "./SuperInputTextOld.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
    buttonCallback?:(a:any)=>void
    title?:any
    needButton?:boolean
    type?:string | number
    placeholder?:string
};

const SuperInputTextOld: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,title,placeholder,
        buttonCallback,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement> ) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)
        onChangeText && onChangeText(e.currentTarget.value);

    }



    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }


    const finalSpanClassName = `${s.errorText} ${spanClassName ? spanClassName : ""}`;


    return (
        <span >
            <input
                type={type? type :'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={s.inputOld}
                value={title}
                placeholder={placeholder}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />


            <div className={finalSpanClassName}>

                {error && <div className={finalSpanClassName}>{error}</div>}
            </div>
        </span>
    );
}

export default SuperInputTextOld;
