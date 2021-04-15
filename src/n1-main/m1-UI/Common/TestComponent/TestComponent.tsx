import SuperInputText from "../InputAndButton/c1-SuperInputText/SuperInputText";
import SuperButton from "../InputAndButton/c2-SuperButton/SuperButton";
import SuperCheckbox from "../InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../InputAndButton/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../InputAndButton/c5-SuperSelect/SuperSelect";
import SuperRadio from "../InputAndButton/c6-SuperRadio/SuperRadio";
import SuperRange from "../InputAndButton/c7-SuperRange/SuperRange";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {authMeTC} from "../../../m2-BLL/02-reducer-login/login";
import SuperInputTextOld from "../InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import SuperButtonOld from "../InputAndButton/с2-SuperBottonOld/SuperButtonOld";

export const TestComponent = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(authMeTC())
    },[dispatch])
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

