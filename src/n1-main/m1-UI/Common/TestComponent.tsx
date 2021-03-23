import SuperInputText from "./c1-SuperInputText/SuperInputText";
import SuperButton from "./c2-SuperButton/SuperButton";
import SuperCheckbox from "./c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "./c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "./c5-SuperSelect/SuperSelect";
import SuperRadio from "./c6-SuperRadio/SuperRadio";
import SuperRange from "./c7-SuperRange/SuperRange";
import React from "react";

export const TestComponent = () =>{
    return(
        <div>
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

