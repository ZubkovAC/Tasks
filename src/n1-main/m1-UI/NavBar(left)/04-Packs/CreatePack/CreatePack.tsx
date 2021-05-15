import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, getPacksTC, textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Modal} from "../../../Common/Modal/Modal";
import React, {useState} from "react";
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";


export const CreatePack = () => {

    const dispatch = useDispatch()

    let {searchCardName, pagesList, cardPages} = useSelector((state: AppStateType) => state.search)
    let {type} = useSelector((state: AppStateType) => state.packs)

    // modal position
    const [active, setActive] = useState<boolean>(false)
    // InputText
    const [question, setQuestion] = useState<string>('')
    const [textType, setTextType] = useState<string>('')


    const [valueRadio, setValueRadio] = useState<string>('false')


    const SetActive = () => {
        setActive(false)
    }

    const CreatePack = () => {
        setActive(true)
    }
    const craetePackNo = () => {
        setActive(false)
    }
    const craetePackYes = () => {
        if (valueRadio === 'false') {
            dispatch(addPackTC(textType, '', 0, 0, 0, '', false, type,
                searchCardName, pagesList, cardPages))
        } else if (valueRadio !== 'false') {
            dispatch(addPackTC(textType, '', 0, 0, 0, '', true, type,
                searchCardName, pagesList, cardPages))
        }
        setActive(false)
    }

    const TextCreatePack = (question: string) => {
        dispatch(textCreateNamePackAC(question))
        setQuestion(question)
    }

    const typeCreatePack = (type: string) => {
        setTextType(type)
    }


    const onChangeChecked = (value: string) => {
        setValueRadio(value)
    }


    const SortUp = () => {
        dispatch(getPacksTC(searchCardName, 0, 99, '0cardsCount', pagesList, cardPages, ''))
    }
    const SortDown = () => {
        dispatch(getPacksTC(searchCardName, 0, 99, '1cardsCount', pagesList, cardPages, ''))
    }


    return (
        <div>
            {/*Modal createPack*/}
            <Modal active={active} setActive={SetActive}>

                <TitleModal title={'Create'}/>
                <SuperTextArea width={'250px'} heigth={'75px'} backgroundColor={'wheat'}
                               onChangeText={TextCreatePack}
                               valueStart={question}
                               placeholder={'name'}/>
                <SuperInputTextOld
                    value={textType}
                    placeholder={'type'}
                    onChangeText={typeCreatePack}/>

                <TitleModal title={'Private:'}/>
                <SuperRadio
                    options={['true', 'false']}
                    value={valueRadio}
                    onChangeOption={onChangeChecked}/>
                <SuperButtonOld
                    title={'yes'}
                    onClick={craetePackYes}/>
                <SuperButtonOld
                    title={'no'}
                    onClick={craetePackNo}/>
            </Modal>

            <SuperButtonOld
                title={'Create  Pack'}
                onClick={CreatePack}/>
            <span style={{marginLeft: '25%'}}>
                <SuperButtonOld
                    title={'v'}
                    transform={true}
                    onClick={SortUp}/>
                <SuperButtonOld
                    title={'v'}
                    onClick={SortDown}/>
            </span>

        </div>
    )
}