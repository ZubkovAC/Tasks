import css from './SuperRadio.module.css'

import React, {InputHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: string) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {


    const onChangeCallback = (value: string) => {

        onChangeOption &&
        onChangeOption(value)
    }


    const mappedOptions = options ? options.map((opt, i) => { // map options with key

        return  <li  key={opt.toString()}>
                    <label  >

                        <input

                            type={"radio"}
                            name={opt}
                            checked={value === opt}
                            onChange={() => onChangeCallback(opt)}
                            value={value}


                            id="f-option"
                            //name="selector"
                        />
                        <span className={css.check}></span>
                        {opt}
                    </label>
                </li>
    }) : [];

    return (
            <div className={css.container}>
                <div className={css.red}>
                </div>
                <ol>
                    {mappedOptions}
                </ol>
            </div>

    );
}

export default SuperRadio;
