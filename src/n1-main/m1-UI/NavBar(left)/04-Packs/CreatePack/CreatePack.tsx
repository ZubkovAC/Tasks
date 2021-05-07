import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC,  textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Modal} from "../../../Common/Modal/Modal";
import React, {useState} from "react";
import SuperSelect from "../../../Common/InputAndButton/c5-SuperSelect/SuperSelect";
import SuperCheckbox from "../../../Common/InputAndButton/c3-SuperCheckbox/SuperCheckbox";
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";


export const CreatePack = () => {
    const dispatch = useDispatch()

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)


    let name = useSelector<AppStateType,string>(state => state.packs.name)
    let type = useSelector<AppStateType,string>(state => state.packs.type)

    // modal position
    const [active, setActive] = useState<boolean>(false)
    // InputText
    const [question, setQuestion] = useState<string>('')
    const [textAnswer, settextAnswer] = useState<string>('')
    const [textType, settextType] = useState<string>('')
    const [textRating, setTextRating] = useState<number>(0)

    const [valueRadio, setValueRadio] = useState<string>('false')



    const SetActive =()=>{
        setActive(false)
    }

    const CreatePack = () =>{
        setActive(true)
    }
    const craetePackNo = () =>{
        setActive(false)
    }
    const craetePackYes = () =>{
        if(valueRadio ==='false'){
            dispatch(addPackTC(name,'',0,0,0,'',false,type,searchCardName,pagesList,cardPages))
        } else if(valueRadio !=='false'){
            dispatch(addPackTC(name,'',0,0,0,'',true,type,searchCardName,pagesList,cardPages))
        }
        setActive(false)
    }

    const TextCreatePack = (question:string) =>{
        dispatch(textCreateNamePackAC(question))
        setQuestion(question)
    }
    const answerCreatePack = (answer:string) =>{
        settextAnswer(answer)
    }
    const typeCreatePack = (type:string) =>{
        settextType(type)
    }
    const ratingCreatePack = (rating:string) =>{
        setTextRating(+rating)
    }

    const onChangeChecked=(value:string)=>{
        setValueRadio(value)
    }

    return (
        <div>
            {/*Modal createPack*/}
            <Modal active={active} setActive={SetActive} >
                <h2 style={{color:'wheat'}}>Create</h2>
                <div style={{marginBottom:'10px'}}>
                    <SuperInputTextOld value={question} type={'textarea'} placeholder={'question'} onChangeText={TextCreatePack}/>
                </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld value={textAnswer} placeholder={'answer'} onChangeText={answerCreatePack}/>
               </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld value={textType} placeholder={'type'} onChangeText={typeCreatePack}/>
               </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld value={textRating} placeholder={'rating'} onChangeText={ratingCreatePack}/>
               </div>
                    <span style={{color:'wheat',fontSize:'20px',fontWeight:600}}>Private:</span>
                    <SuperRadio options={['true','false']} value={valueRadio} onChangeOption={onChangeChecked}/>

                <SuperButtonOld title={'yes'}  onClick={craetePackYes} />
                <SuperButtonOld title={'no'} onClick={craetePackNo}/>
            </Modal>



            <SuperButtonOld  title={'Create  Pack'} onClick={CreatePack}/>
        </div>
    )
}