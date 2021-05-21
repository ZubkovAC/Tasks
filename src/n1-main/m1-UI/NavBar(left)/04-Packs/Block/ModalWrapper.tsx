import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {Modal} from "../../../Common/Modal/Modal";
import {TitleModal} from "../../../Common/TitleModal/TitleModal";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";

type ModalWrapperPropsType = {
    modalType:string
    name:string
    id:string
    updateID:string
    setModalType:any
}


export const ModalWrapper = ({modalType, name, id, updateID, setModalType}: ModalWrapperPropsType) => {
    const dispatch = useDispatch()
    let {cardPages, pagesList, searchCardName} = useSelector((state: AppStateType) => state.search)
    const [inputName, setInputName] = useState<string>(name)
    const [gradeType, setGradeType] = useState<number  >(0)


    const UpdatePack = (yes?: boolean) => {
        if (yes) dispatch(updatePackTC(id,gradeType, inputName, searchCardName, pagesList, cardPages,updateID))
        setModalType('')
    }
    const deletePack = (yes?: boolean) => {
        if (yes) dispatch(deletePackTC(id, searchCardName, pagesList, cardPages, updateID  ))
        setModalType('')
    }
    const packGrade = (type: string) => {
        if(+type < 6 && +type > -1  ) setGradeType(+type)
    }

    const onChangeName = (value: string) => {
        setInputName(value)
    }

    return modalType === 'delete' ? (
        <Modal active={true} setActive={() => setModalType('')}>
            <TitleModal title={'Are you sure you want to delete it?'}/>
            <div style={{float: 'right'}}>
                <SuperButtonOld
                    title={'yes'}
                    onClick={() => deletePack(true)}
                />
                <SuperButtonOld
                    title={'no'}
                    onClick={() => deletePack()}
                />
            </div>
        </Modal>

    ) : (
        <Modal active={true} setActive={()=>setModalType('')}>
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
                onClick={() => UpdatePack(true)}/>
            <SuperButtonOld
                title={'no'}
                onClick={() => UpdatePack()}/>
        </Modal>
    )
}