import css from './Block.module.css'
import React, {useState} from "react";
import SuperButtonOld from "../../../Common/InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../m2-BLL/05-reducer-packs/reducer-packs";
import {AppStateType} from "../../../../m2-BLL/00-store/store";
import {DeleteModal} from "../../allComponentPages/DeleteModalPackID/DeleteModal";
import {Modal} from "../../../Common/Modal/Modal";


export type BlockPropsType = {
    name: string
    rating: number
    userName: string
    created: string
    id: string
    cardsCount: number
}

export const Block = (props: BlockPropsType) => {

    let cardPages = useSelector<AppStateType,number>(state => state.search.cardPages)
    let pagesList = useSelector<AppStateType,number>(state => state.search.pagesList)
    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)
    const dispatch = useDispatch()

    const [active,setActive]=useState<boolean>(false)

    const SetActive =() =>{
        setActive(false)
    }

    const deleteSwitchYes = () => {
        setActive(true)
        // dispatch(deletePackTC(props.id,searchCardName,pagesList,cardPages))
    }

    const deletePack = () => {
        dispatch(deletePackTC(props.id,searchCardName,pagesList,cardPages))
    }

    const deleteSwitchNo = () => {
        setActive(false)
        // dispatch(deletePackTC(props.id,searchCardName,pagesList,cardPages))
    }

    const updateCard = () => {
        dispatch(updatePackTC(props.id, 'jylio-xylio'))
    }

    return (
        <div className={css.Block}>
            <div >

                <Modal active={active} setActive={SetActive} >
                    <h2 style={{color:'wheat',textShadow:'0 0 50px white'}}>Are you sure you want to delete it?</h2>
                    <div style={{float:'right'}}>
                        <SuperButtonOld title={'yes'}  onClick={deletePack} />
                        <SuperButtonOld title={'no'} onClick={deleteSwitchNo}/>
                    </div>
                </Modal>


                <span className={css.userName}>{props.userName}</span>
                <div className={css.Table}>

                    <span className={css.name}>{props.name}</span>
                    <span className={css.rating}> rating:{props.rating}</span>
                    {/*<span className={css.create}> {props.created}</span>*/}
                    <span className={css.cardsCount}>cardsCount:{props.cardsCount}</span>
                    <span className={css.id}>
                        ID:
                        <NavLink to={`/packs/${props.id}`}>{props.id}</NavLink>
                    </span>
                    <span className={css.buttons}>
                        <SuperButtonOld title={'Delete'} onClick={deleteSwitchYes}/>
                        <SuperButtonOld title={'Update'} onClick={updateCard}/>
                    </span>
                </div>

            </div>


        </div>
    )

}
