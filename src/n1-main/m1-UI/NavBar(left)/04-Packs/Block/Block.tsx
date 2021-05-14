import css from './Block.module.css'
import React, {useState} from "react";
import SuperButtonOld from "../../../Common/InputAndButton/c2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {Modal} from "../../../Common/Modal/Modal";
import SuperInputTextOld from "../../../Common/InputAndButton/c1-SuperInputTextOld/SuperInputTextOld";


export type BlockPropsType = {
    name: string
    rating: number
    userName: string
    created: string
    id: string
    cardsCount: number
    user_id:string
}

export const Block = (props: BlockPropsType) => {

    const dispatch = useDispatch()

    let {cardPages,pagesList,searchCardName} = useSelector((state:AppStateType) => state.search)


    let userID =useSelector<AppStateType,string>(state=>state.login.userID)

    console.log(props.id )
    console.log( userID )
    // modal + input
    const [active,setActive]=useState<boolean>(false)
    const [activeUpdate,setActiveUpdate]=useState<boolean>(false)
    const [inputName,setInputName]=useState<string>(props.name)
    const [inputNumber,setInputNumber]=useState<any>(0)


    const SetActive =() =>{
        setActive(false)
    }

    const deletePack = () => {
        setActive(true)
    }
    const deletePackNo = () => {
        setActive(false)
    }
    const deletePackYes = () => {
        dispatch(deletePackTC(props.id,searchCardName,pagesList,cardPages))
        setActive(false)
    }


    const SetActiveUpdate =() =>{
        setActiveUpdate(false)
    }
    const UpdatePack = () =>{
        setActiveUpdate(true)
    }
    const UpdatePackNo = () => {
        setActiveUpdate(false)
    }
    const UpdatePackYes = () => {
        dispatch(updatePackTC(props.id, inputName,inputNumber,searchCardName,pagesList,cardPages))
        setActiveUpdate(false)
    }


    const onChangeName = (value:string) =>{
        setInputName(value)
    }
    const onChangeNumber = (value:string) =>{
        if(+value >= 0 && +value <=5)setInputNumber(+value)
    }



    return (
        <div className={css.Block}>
            <div >

                {/*Delete Madal*/}
                <Modal active={active} setActive={SetActive} >
                    <h2 style={{color:'wheat',textShadow:'0 0 50px white'}}>Are you sure you want to delete it?</h2>
                    <div style={{float: 'right'}}>
                        <SuperButtonOld title={'yes'}  onClick={deletePackYes} />
                        <SuperButtonOld title={'no'} onClick={deletePackNo}/>
                    </div>
                </Modal>

                {/*Update Madal*/}
                <Modal active={activeUpdate} setActive={SetActiveUpdate} >
                    <h2 style={{color:'wheat',textShadow:'0 0 50px white'}}>update name?</h2>
                        <h3 className={css.h3}>Name:</h3>  <SuperInputTextOld  title={inputName} onChangeText={onChangeName} />
                        <h3 className={css.h3}>Rating:</h3> <SuperInputTextOld type={'number'} title={inputNumber} onChangeText={onChangeNumber}/>
                        <SuperButtonOld title={'yes'}  onClick={UpdatePackYes} />
                        <SuperButtonOld title={'no'} onClick={UpdatePackNo}/>

                </Modal>



                <span className={css.userName}>{props.userName}</span>
                <div className={css.Table}>

                    <span className={css.rating}> id:{props.user_id}</span>
                    <span className={css.name}>{props.name}</span>
                    <span className={css.cardsCount}>cardsCount:{props.cardsCount}</span>
                    <span className={css.id}>
                        <NavLink to={`/packs/${props.id}`}>Go To CardPack</NavLink>
                    </span>
                    <span className={css.buttons}>
                        <SuperButtonOld title={'Delete'} disabled={props.user_id !== userID}  onClick={deletePack}/>
                        <SuperButtonOld title={'Update'} disabled={props.user_id !== userID}   onClick={UpdatePack}/>
                    </span>
                </div>

            </div>


        </div>
    )
}
