import css from './Block.module.css'
import React, {useState} from "react";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {Modal} from "../../../Common/Modal/Modal";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import {Grade} from "./Grade";
import { ModalWrapper } from './ModalWrapper';


export type BlockPropsType = {
    name: string
    rating: number
    userName: string
    created: string
    id: string
    cardsCount: number
    user_id: string
    grade: number
    update:string
}




export const Block = (props: BlockPropsType) => {
    let {userID,userName} = useSelector((state:AppStateType) => state.login)


    const [modalType, setModalType] = useState<string>('')
    let name = props.name.substr(0, 15)

    return (
        <div className={css.Block}>
            <div>
                {modalType ? <ModalWrapper userName={userName} setModalType={setModalType} id={props.id} update={props.update} modalType={modalType}  /> : null}

                <div className={css.Table}>
                    <div className={css.rating}><Grade grade={props.grade}/></div>
                    <div className={css.cards}>{props.cardsCount}</div>
                    <div className={css.name}>{name}</div>
                    <div className={css.cardsCount}>{props.userName}</div>
                    <div className={css.buttons}>
                        <SuperButtonOld title={'Delete'} disabled={props.user_id !== userID} onClick={() => setModalType('delete')}/>
                        <SuperButtonOld title={'Update'} disabled={props.user_id !== userID} onClick={() => setModalType('Update')}/>
                        <NavLink to={`/packs/${props.id}`} className={css.Link}>cards</NavLink>
                    </div>
                </div>

            </div>


        </div>
    )
}


