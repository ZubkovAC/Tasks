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

    const dispatch = useDispatch()

    let {cardPages, pagesList, searchCardName} = useSelector((state: AppStateType) => state.search)


    let userID = useSelector<AppStateType, string>(state => state.login.userID)

    // modal + input
    const [active, setActive] = useState<boolean>(false)
    const [activeUpdate, setActiveUpdate] = useState<boolean>(false)
    const [inputName, setInputName] = useState<string>(props.name)
    const [gradeType, setGradeType] = useState<number  >(0)

    const SetActive = () => {
        setActive(false)
    }

    const deletePack = () => {
        setActive(true)
    }
    const deletePackNo = () => {
        setActive(false)
    }
    const deletePackYes = () => {
        dispatch(deletePackTC(props.id, searchCardName, pagesList, cardPages,props.update))
        setActive(false)
    }


    const SetActiveUpdate = () => {
        setActiveUpdate(false)
    }
    const UpdatePack = () => {
        setActiveUpdate(true)
    }
    const UpdatePackNo = () => {
        setActiveUpdate(false)
    }
    const UpdatePackYes = () => {
        dispatch(updatePackTC(props.id,gradeType, inputName, searchCardName, pagesList, cardPages,props.update))
        setActiveUpdate(false)
    }
    const packGrade = (type: string) => {
        if(+type < 6 && +type > -1  ) setGradeType(+type)
    }

    const onChangeName = (value: string) => {
        setInputName(value)
    }

    let name = props.name.substr(0, 15)

// component - title
    return (
        <div className={css.Block}>
            <div>

                {/*Delete Madal*/}
                <Modal active={active} setActive={SetActive}>
                    <TitleModal title={'Are you sure you want to delete it?'}/>
                    <div style={{float: 'right'}}>
                        <SuperButtonOld title={'yes'} onClick={deletePackYes}/>
                        <SuperButtonOld title={'no'} onClick={deletePackNo}/>
                    </div>
                </Modal>

                {/*Update Madal*/}
                <Modal active={activeUpdate} setActive={SetActiveUpdate}>
                    <TitleModal title={'update name'}/>
                    <br/>
                    <SuperInputTextOld
                        title={inputName}
                        onChangeText={onChangeName}/>
                    <SuperInputTextOld
                        value={gradeType}
                        placeholder={'number'}
                        type={'number'}
                        onChangeText={packGrade}/>
                    <SuperButtonOld
                        title={'yes'}
                        onClick={UpdatePackYes}/>
                    <SuperButtonOld
                        title={'no'}
                        onClick={UpdatePackNo}/>

                </Modal>

                <div className={css.Table}>
                    <p className={css.rating}><Grade grade={props.grade}/></p>
                    <p className={css.cards}>  {props.cardsCount}</p>
                    <p className={css.name}><h3>{name}</h3></p>
                    <p className={css.cardsCount}>{props.userName}</p>
                    <p className={css.buttons}>
                        <SuperButtonOld title={'Delete'} disabled={props.user_id !== userID} onClick={deletePack}/>
                        <SuperButtonOld title={'Update'} disabled={props.user_id !== userID} onClick={UpdatePack}/>
                        <NavLink to={`/packs/${props.id}`} className={css.Link}>cards</NavLink>
                    </p>
                </div>

            </div>


        </div>
    )
}
