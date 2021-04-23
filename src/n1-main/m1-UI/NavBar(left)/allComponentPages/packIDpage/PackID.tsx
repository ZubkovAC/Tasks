import React, {useEffect, useState} from "react";
import {
    CardArrayResponseType,
    createCardTC,
    deleteCardTC,
    getCardsTC,
    inputIdAC,
} from "../../../../m2-BLL/06-reducer-cards/reducer-cards";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import css from './PackID.module.css'
import cardFront from './../../../Common/Accets/CardFront.jpg'
import {NavLink, useParams} from "react-router-dom";
import {RoutePath} from "../../../../../App";
import {DeleteModal} from "../DeleteModalPackID/DeleteModal";
import {Modal} from "../../../Common/Modal/Modal";


interface ParamTypes {
    id: string
}


export const PackId = () => {

    const cardArray = useSelector<AppStateType, CardArrayResponseType[]>(state => state.cards.cardArray)
    const dispatch = useDispatch()


    let {id} = useParams<ParamTypes>()

    const [active,setActive]=useState<boolean>(false)

    useEffect(() => {
        dispatch(getCardsTC('', '', id, 1, 4, '', 1, 7))
    }, [id])


    const SetActive =() =>{
        setActive(false)
    }

    const createCard = () => {
        dispatch(createCardTC(id, '1+`0`', '`10`', 0, 0,
            0, 'string', 'string', '',
            '', 'CARD'))
    }
    const updateCard = () => {
        // dispatch(updateCardTC(card))    // сделать
    }


    const inputIdCard = (value: string) => {
        dispatch(inputIdAC(value))
    }
    return (
        <div>
            <h2 className={css.content_top}>Pack -- Card</h2>
            <div className={css.box_button}>
                <div  className={css.learn}>
                    <NavLink to={RoutePath.LEARN}>
                        <SuperButtonOld  title={'learn'}/>
                    </NavLink>
                </div>
                <div className={css.create}><SuperButtonOld  onClick={createCard} title={'create'}/></div>
                <div className={css.update}><SuperButtonOld   onClick={updateCard} title={'update'}/></div>
            </div>


            <div className={css.box_card} >
                {cardArray.map(card => {


                    let arr = card.created.substring(0,10)

                    let update = card.updated.substring(0,10)



                    const deleteCardYes = () => {
                        dispatch(deleteCardTC(card._id, id))
                    }
                    const deleteCardNo = () => {
                        setActive(false)
                    }
                    const deleteCard = () => {
                        setActive(true)
                    }


                    return (
                        <div className={css.cardFront} key={card._id}>
                            <div className={css.cardFront2} >
                                <div className={css.cardFront3}>

                                    <Modal active={active} setActive={SetActive} >
                                        <h2 style={{color:'wheat'}}>Are you sure you want to delete it?</h2>
                                        <div style={{float:'right'}}>
                                            <SuperButtonOld title={'yes'}  onClick={deleteCardYes} />
                                            <SuperButtonOld title={'no'} onClick={deleteCardNo}/>
                                        </div>

                                    </Modal>

                                    <div>{card.question}</div>
                                    <img src={card.answerImg==='' ? card.answerImg : cardFront } width='100px' alt=""/>


                                    <div>{card.answer}</div>
                                    <div>Update:{update}</div>
                                    <div> Rating:<span style={{color:'white',textShadow:'0 0 10px white'}}>{card.rating}</span></div>
                                    <div> Grade:{card.grade}</div>
                                    <div>Type: {card.type}</div>
                                    -----------------------------
                                    <div >
                                        <SuperButtonOld onClick={deleteCard} title={'Delete Card'}/>
                                    </div>

                                    -----------------------------
                                    <div>Create :{arr }</div>
                                    <div style={{margin:'20px'}}>

                                    </div>

                                </div>


                            </div>
                        </div>
                        )

                })}
            </div>

        </div>
    )

}

