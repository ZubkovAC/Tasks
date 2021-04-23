import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, getPacksTC, textCreateNamePackAC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";
import {Modal} from "../../../Common/Modal/Modal";
import React, {useState} from "react";


export const CreatePack = () => {
    const dispatch = useDispatch()

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)


    let name = useSelector<AppStateType,string>(state => state.packs.name)
    let type = useSelector<AppStateType,string>(state => state.packs.type)


    const [active, setActive] = useState<boolean>(false)

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
        dispatch(addPackTC(name,'',0,0,0,'',true,type,searchCardName,pagesList,cardPages))
        setActive(false)
    }


    const TextCreatePack = (name:string) =>{
        dispatch(textCreateNamePackAC(name))
    }


    return (
        <div>
           <div style={{fontSize:'20px',color:'white',fontWeight:600}}>Name</div>
            <Modal active={active} setActive={SetActive} >
                <h2 style={{color:'wheat'}}>Create</h2>
                <div style={{marginBottom:'10px'}}>
                    <SuperInputTextOld placeholder={'question'} onChangeText={TextCreatePack}/>
                </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld placeholder={'answer'} onChangeText={TextCreatePack}/>
               </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld placeholder={'type'} onChangeText={TextCreatePack}/>
               </div>
               <div style={{marginBottom:'10px'}}>
                   <SuperInputTextOld placeholder={'rating'} onChangeText={TextCreatePack}/>
               </div>


                <SuperButtonOld title={'yes'}  onClick={craetePackYes} />
                <SuperButtonOld title={'no'} onClick={craetePackNo}/>
            </Modal>
            <SuperButtonOld  title={'Create  Pack'} onClick={CreatePack}/>
        </div>
    )
}