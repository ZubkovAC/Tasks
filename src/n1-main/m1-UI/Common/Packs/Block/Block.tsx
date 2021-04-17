import css from './Block.module.css'
import React from "react";
import SuperButtonOld from "../../InputAndButton/с2-SuperBottonOld/SuperButtonOld";

export type BlockPropsType ={
    name:string
    rating:number
    userName:string
    created:string
}

export const Block =(props:BlockPropsType)=>{
    return  (
        <div className={css.Block}>
            <div style={{fontSize:'16px',fontWeight:600}}>
                <span  style={{fontSize:'22px',fontWeight:600}}>{props.userName}</span>
                <div>
                    <span style={{padding:'5px'}}>{props.name}</span>
                    <span style={{padding:'5px'}}> rating:{props.rating}</span>
                    <span style={{padding:'5px'}}> {props.created}</span>

                </div>

            </div>
            <div>
                <SuperButtonOld title={'Delete'}/>
                <SuperButtonOld title={'Update'}/>
            </div>

        </div>
    )
}