import SuperInputText from "../../Common/InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../../Common/InputAndButton/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../Common/InputAndButton/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../Common/InputAndButton/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import SuperRange from "../../Common/InputAndButton/c7-SuperRange/SuperRange";
import React from "react";
import SuperInputTextOld from "../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";

export const TestComponent = () =>{


    return(
        <div>

            <SuperInputTextOld />
            <SuperButtonOld title={'add'}/>
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

