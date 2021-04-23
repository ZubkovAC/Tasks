import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../Common/InputAndButton/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../Common/InputAndButton/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import SuperRange from "../../Common/InputAndButton/c7-SuperRange/SuperRange";
import React, {useState} from "react";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {Modal} from "../../Common/Modal/Modal";

export const TestComponent = () =>{

    const [modalActive,setModalActive]=useState<boolean>(true)

    const select = (value:boolean) =>{
        setModalActive(value)
    }


    return(
        <div>

            <Modal  active={modalActive} setActive={select}>
            </Modal>



            <SuperInputTextOld />
            <button id='ButtonTrue' onClick={()=>select(true)} > Modal ACTIVE</button>
            <SuperButtonOld title={'add'}   />
            <SuperButtonOld title={'v'}/>
            <SuperButtonOld title={'v'} transform={true}/>



            <SuperInputText title={'alert'}/>
            <SuperButton title={'push'}/>
            <SuperCheckbox/>
            <SuperEditableSpan/>
            <SuperSelect options={['1','2','3']}/>
            <SuperRadio options={[1,2,3,4,5]}/>
            <SuperRange/>
        </div>
    )
}

