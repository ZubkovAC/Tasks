import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, getPacksTC, textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Modal} from "../../../Common/Modal/Modal";
import React, {useState} from "react";
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";


export const CreatePack = () => {

    const dispatch = useDispatch()

    let {searchCardName,pagesList,cardPages} = useSelector((state:AppStateType) => state.search)
    let {name,type} = useSelector((state:AppStateType) => state.packs)

    // modal position
    const [active, setActive] = useState<boolean>(false)
    // InputText
    const [question, setQuestion] = useState<string>('')
    const [textAnswer, settextAnswer] = useState<string>('')
    const [textType, settextType] = useState<string>('')
    const [textRating, setTextRating] = useState<number>(0)

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
            dispatch(addPackTC(name, '', 0, 0, 0, '', false, type, searchCardName, pagesList, cardPages))
        } else if (valueRadio !== 'false') {
            dispatch(addPackTC(name, '', 0, 0, 0, '', true, type, searchCardName, pagesList, cardPages))
        }
        setActive(false)
    }

    const TextCreatePack = (question: string) => {
        dispatch(textCreateNamePackAC(question))
        setQuestion(question)
    }
    const answerCreatePack = (answer: string) => {
        settextAnswer(answer)
    }
    const typeCreatePack = (type: string) => {
        settextType(type)
    }
    const ratingCreatePack = (rating: string) => {
        setTextRating(+rating)
    }

    const onChangeChecked = (value: string) => {
        setValueRadio(value)
    }


    const SortUp = () =>{
        dispatch( getPacksTC(searchCardName, 0, 99, '0cardsCount', pagesList, cardPages, ''))
    }
    const SortDown =() =>{
        dispatch( getPacksTC(searchCardName, 0, 99, '1cardsCount', pagesList, cardPages, ''))
    }


    return (
        <div>
            {/*Modal createPack*/}
            <Modal active={active} setActive={SetActive}>
                <h2 style={{color: 'wheat'}}>Create</h2>
                <div style={{marginBottom: '10px'}}>
                    <SuperTextArea width={'250px'} heigth={'75px'} backgroundColor={'wheat'}
                                   onChangeText={TextCreatePack} valueStart={question} placeholder={'qwestion'}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <SuperTextArea width={'250px'} heigth={'100px'} backgroundColor={'wheat'}
                                   onChangeText={answerCreatePack} valueStart={textAnswer} placeholder={'answer'}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <SuperInputTextOld value={textType} placeholder={'type'} onChangeText={typeCreatePack}/>
                </div>
                <span style={{color: 'wheat', fontSize: '20px', fontWeight: 600}}>Private:</span>
                <SuperRadio options={['true', 'false']} value={valueRadio} onChangeOption={onChangeChecked}/>
                <SuperButtonOld title={'yes'} onClick={craetePackYes}/>
                <SuperButtonOld title={'no'} onClick={craetePackNo}/>
            </Modal>


            <SuperButtonOld title={'Create  Pack'} onClick={CreatePack}/>
            <span style={{marginLeft:'25%'}}>
                <SuperButtonOld title={'v'} transform={true} onClick={SortUp}/>
                <span style={{marginLeft:'10px'}}>
                <SuperButtonOld title={'v'} onClick={SortDown} />
                </span>
            </span>

        </div>
    )
}