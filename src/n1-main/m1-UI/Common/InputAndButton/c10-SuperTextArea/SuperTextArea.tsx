import {useState} from "react";
import css from './SuperTextArea.module.css'

type SuperTextAreaPropsType = {
    valueStart:string
    onChangeText:(e:string)=>void
    placeholder?:string
    width?:string
    heigth?:string
    backgroundColor?:string
}

export const SuperTextArea = (props:SuperTextAreaPropsType) =>{
    const [value,setValue]=useState<string>(props.valueStart)
    const onText =(e:any)=>{
        setValue(e)
        props.onChangeText && props.onChangeText(e)
    }
    let width =props.width
    let heigth =props.heigth
    let backgroundColor =props.backgroundColor
    return (
        <div className={css.textArea}>
            <textarea
                style={{
                    width:width,
                    height:heigth,
                    backgroundColor:backgroundColor,
                    outline:"none", fontSize:'16px',padding:'3px',borderRadius:'5px'}}
                value={value}
                onChange={e=>onText(e.currentTarget.value)}
                placeholder={props.placeholder}/>
        </div>
    )
}