import React, {useState} from "react";
import './TestComponent.module.css'
// @ts-ignore
import {SuperTextArea} from "../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";

export const TestComponent = () =>{

    const [value,setValue]=useState<string>('hello')
    const onChangeText = (e:string)=>{
        setValue(e)
    }
    // End   TextArea

    return(
        <div >
            <SuperTextArea width={'250px'} heigth={'100px'} backgroundColor={'wheat'} onChangeText={onChangeText} valueStart={value} placeholder={'qwestion'}/>

        </div>
    )
}
