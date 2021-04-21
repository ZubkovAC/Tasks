import css from './Block.module.css'
import React from "react";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";


export type BlockPropsType = {
    name: string
    rating: number
    userName: string
    created: string
    id: string
    cardsCount: number
}

export const Block = (props: BlockPropsType) => {

    const dispatch = useDispatch()

    // const loadingIdCard = () =>{
    //     dispatch(inputIdAC(props.id))
    //     dispatch(getCardsTC('english','english',props.id,1,4,'0grade',1,7) )
    // }

    const deleteCard = () => {
        dispatch(deletePackTC(props.id))
    }

    const updateCard = () => {
        dispatch(updatePackTC(props.id, 'jylio-xylio'))
    }

    return (
        <div className={css.Block}>
            <div style={{fontSize: '16px', fontWeight: 600}}>
                <span className={css.userName}>{props.userName}</span>
                <div className={css.Table}>

                    <span className={css.name}>{props.name}</span>
                    <span className={css.rating}> rating:{props.rating}</span>
                    {/*<span className={css.create}> {props.created}</span>*/}
                    <span className={css.cardsCount}>cardsCount:{props.cardsCount}</span>
                    <span className={css.id}>
                        ID:
                        <NavLink to={`/packs/${props.id}`}>{props.id}</NavLink>
                    </span>
                    <span className={css.buttons}>
                        <SuperButtonOld title={'Delete'} onClick={deleteCard}/>
                        <SuperButtonOld title={'Update'} onClick={updateCard}/>
                    </span>
                </div>

            </div>


        </div>
    )

}
