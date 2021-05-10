import React, {useState} from "react";
import { gradeCardAC} from "../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import SuperRadio from "../InputAndButton/c6-SuperRadio/SuperRadio";
import {AppStateType} from "../../../m2-BLL/00-store/store";


export const SelectedFluppy = () => {


    const dispatch=useDispatch()
    const valueSelect=useSelector<AppStateType,string>(state=>state.cards.valueSelect)
    const grade=useSelector<AppStateType,number>(state=>state.cards.grade)


    console.log(valueSelect)
    console.log(grade)
    const [radio, setRadio] = useState<any>(valueSelect)


    const RadioSelect = (value: string) => {
        setRadio(value)
        let arr = [`кажется я обкакался =(`, `Я учился?`, `не уверенно, фильшиво, слабо`, `ну почти`, `это было слишком легко`]
        let grade = arr.indexOf(value)
        dispatch(gradeCardAC(grade + 1,value))
        console.log(grade)
    }

    return (
        <div>
            <SuperRadio

                options={[`кажется я обкакался =(`, `Я учился?`, `не уверенно, фильшиво, слабо`, `ну почти`, `это было слишком легко`]}
                onChangeOption={RadioSelect}
                value={valueSelect ==radio ? valueSelect:''}
            />
        </div>
    )
}

