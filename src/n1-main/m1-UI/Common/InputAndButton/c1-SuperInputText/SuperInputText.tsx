import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
} from "react";
import s from "./SuperInputText.module.css";

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
    title?:string
    needButton?:boolean
};

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,title,
        buttonCallback,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {


    const onChangeCallback = (e: ChangeEvent<HTMLInputElement> ) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);

    }

    const onChangeCallbackButton =()=> {
        alert('hello')
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {

        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }


    const finalSpanClassName = `${s.errorText} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = error ?`${s.errorInputTrue} `:`${s.errorInputFalse} ` // need to fix with (?:) and s.superInput


    return (
        <div className={s.Input}>
            <input
                type={"text"}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {restProps.needButton&&<button className={error?  s.buttonErrorFalse : s.buttonErrorTrue  } onClick={onChangeCallbackButton} >
                {title?title:'add'}
            </button>}

            <div className={finalSpanClassName}>

                {error && <div className={finalSpanClassName}>{error}</div>}
            </div>
        </div>
    );
}

export default SuperInputText;
