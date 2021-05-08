import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { pagesListAC} from "../../../m2-BLL/04-reducer-search/reducer-search";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import css from './Paginator.module.css'
import SuperButtonOld from "../InputAndButton/с2-SuperBottonOld/SuperButtonOld";
import {getPacksTC, preloaderOnAC} from "../../../m2-BLL/05-reducer-packs/reducer-packs";

export const Pagination = () => {

    const dispatch = useDispatch()

    let searchCardName =useSelector<AppStateType,string>(state=>state.search.searchCardName)

    let cardPageTotalCount = useSelector<AppStateType,number>((state)=>state.packs.cardPacksTotalCount)   //  1609
    const portionSize = useSelector<AppStateType,number>((state)=>state.search.countSelect)                 //  10
    let cardPages = useSelector<AppStateType,number>((state)=>state.search.cardPages)                     //  9

    let pagesList = useSelector<AppStateType,number>(state=>state.search.pagesList)

    if (cardPageTotalCount < 200) {
        cardPageTotalCount = 200
    }

    let pageCount = Math.ceil(cardPageTotalCount/cardPages)
    let pageList = []
    for(let i=0; i<pageCount;i++){
        pageList.push(i)
    }


    let portionCount = Math.ceil(pageCount / cardPages);//посмотрим
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    console.log(portionNumber)
    const PagesCount = (e:number) =>{
        dispatch(preloaderOnAC(true))
        dispatch( getPacksTC(searchCardName, 0, 99, '0updated', e, cardPages, ''))
        dispatch(pagesListAC(e))
    }



    return (
        <div style={{textAlign:'right'}}>

            {portionNumber > 1
                ? <SuperButtonOld  title={'PREV'} onClick={() => {setPortionNumber(portionNumber - 1)}}/>
                : <SuperButtonOld  title={'PREV'} onClick={() => {setPortionNumber(portionCount-2)}}/>        // на будущее реализовать  обратный отсчет
            }
            {pageList
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p}
                                 className={p === pagesList ? css.selectedPage : css.selectedP}
                                 onClick={()=>PagesCount(p)}
                               >{p}-</span>
                })}

            {portionCount-1 > portionNumber
                ? <SuperButtonOld title={'NEXT'} onClick={() => {setPortionNumber(portionNumber + 1)}}/>
                : portionCount <= rightPortionPageNumber-1 && setPortionNumber(1)                // править долго убегает вперед
            }
        </div>
    )
}
