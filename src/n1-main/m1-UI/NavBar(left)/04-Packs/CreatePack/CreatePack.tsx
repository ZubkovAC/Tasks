import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Modal} from "../../../Common/Modal/Modal";
import React, {useCallback, useState} from "react";
import SuperRadio from "../../../Common/InputAndButton/c6-SuperRadio/SuperRadio";
import {SuperTextArea} from "../../../Common/InputAndButton/c10-SuperTextArea/SuperTextArea";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import {Sort} from "../../allComponentPages/SortPack&Card/Sort";
import {Pagination} from "../../../Common/Pagination/Pagination";

type CreatePackPropsType = {
    userID: string
    update:string
}

export const CreatePack = (props: CreatePackPropsType) => {
    console.log('createPack')
    const dispatch = useDispatch()

    let {searchCardName, pagesList, cardPages} = useSelector((state: AppStateType) => state.search)
    let {type} = useSelector((state: AppStateType) => state.packs)

    // modal position
    const [active, setActive] = useState<boolean>(false)
    // InputText
    const [namePack, setNamePack] = useState<string>('')
    const [gradeType, setGradeType] = useState<number>(0)


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


    const craetePackYes =useCallback( () => {
        if (valueRadio === 'false') {
            dispatch(addPackTC(namePack, '', gradeType, 0, 0, '', false, type,
                searchCardName, pagesList, cardPages,props.update))
        } else if (valueRadio !== 'false') {
            dispatch(addPackTC(namePack, '', gradeType, 0, 0, '', true, type,
                searchCardName, pagesList, cardPages,props.update))
        }
        setNamePack('')
        setActive(false)
    },[props.update,dispatch,type,cardPages,gradeType,namePack,pagesList,searchCardName,valueRadio])

    const TextCreatePack = (question: string) => {
        dispatch(textCreateNamePackAC(question))
        setNamePack(question)
    }
    const packGrade = (type: string) => {
        if (+type < 6 && +type > -1) setGradeType(+type)
    }
    const onChangeChecked = (value: string) => {
        setValueRadio(value)
    }

    return (
        <div style={{padding:'5px'}}>
            {/*Modal createPack*/}
            <Modal active={active} setActive={SetActive}>

                <TitleModal title={'Create'}/>
                <SuperTextArea width={'250px'} heigth={'75px'} backgroundColor={'wheat'}
                               onChangeText={TextCreatePack}
                               valueStart={namePack}
                               placeholder={'name'}/>
                <SuperInputTextOld
                    value={gradeType}
                    placeholder={'number'}
                    type={'number'}
                    onChangeText={packGrade}/>

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


            <span style={{marginLeft: '30%'}}>
                    <Sort userID={props.userID}/>
            </span>
            <span style={{float:"right" }}>
                <Pagination/>
            </span>
        </div>
    )
}