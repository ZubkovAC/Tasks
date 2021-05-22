import css from './Block.module.css'
import React, {useState} from "react";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store";
import {Grade} from "./Grade";
import {ModalWrapper} from './ModalWrapper';
import {RoutePath} from "../../../../../App";


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
    let {userID} = useSelector((state:AppStateType) => state.login)


    const [modalType, setModalType] = useState<string>('')
    let name = props.name.substr(0, 15)
    return (
        <div className={css.Block}>
            <div>
                {modalType
                    ? <ModalWrapper
                        id={props.id}
                        name={name}
                        updateID={props.update}
                        modalType={modalType}
                        setModalType={setModalType}
                          />
                    : null}

                <div className={css.Table}>
                    <div className={css.rating}><Grade grade={props.grade}/></div>
                    <div className={css.cards}>{props.cardsCount}</div>
                    <div className={css.name}>{name}</div>
                    <div className={css.cardsCount}>{props.userName}</div>
                    <div className={css.buttons}>
                        <SuperButtonOld title={'Delete'} disabled={props.user_id !== userID} onClick={() => setModalType('delete')}/>
                        <SuperButtonOld title={'Update'} disabled={props.user_id !== userID} onClick={() => setModalType('Update')}/>

                    </div>
                    <div className={css.LinkPosiiton}>
                        <NavLink to={RoutePath.PACKS+`/${props.id}`} className={css.Link}>
                            cards
                        </NavLink>
                        <NavLink to={RoutePath.LEARN+`/${props.id}`} className={props.cardsCount? css.Link : css.LinkDisable}
                                 >
                            learn
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}


