import React from "react";
import { gradeCardAC} from "../../../m2-BLL/Cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import SuperRadio from "../InputAndButton/c6-SuperRadio/SuperRadio";
import {AppStateType} from "../../../m2-BLL/00-store";


export const SelectedFluppy = () => {


    const dispatch=useDispatch()
    const valueSelect=useSelector<AppStateType,string>(state=>state.cards.valueSelect)


    const RadioSelect = (value: string) => {
        let arr = [`кажется я обкакался =(`, `Я учился?`, `не уверенно, фильшиво, слабо`, `ну почти`, `это было слишком легко`]
        let grade = arr.indexOf(value)
        dispatch(gradeCardAC(grade + 1,value))
    }

    return (
        <div >
            <SuperRadio

                options={[`кажется я обкакался =(`, `Я учился?`, `не уверенно, фильшиво, слабо`, `ну почти`, `это было слишком легко`]}
                onChangeOption={RadioSelect}
                value={valueSelect}
            />
        </div>
    )
}

