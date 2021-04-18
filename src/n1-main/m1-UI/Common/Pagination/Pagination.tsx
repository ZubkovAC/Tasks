import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cardCountAC, pagesListAC} from "../../../m2-BLL/04-reducer-search/reducer-search";
import {AppStateType} from "../../../m2-BLL/00-store/store";
import SuperSelectOld from "../InputAndButton/c5-SuperSelectOld/SuperSelectOld";
import {Search} from "../../NavBar(left)/04-Packs/Search/search";
import css from './Paginator.module.css'
import SuperButtonOld from "../InputAndButton/с2-SuperBottonOld/SuperButtonOld";

export const Pagination = () => {
    const cardPageTotalCount = useSelector<AppStateType,number>((state)=>state.search.cardPageTotalCount)
    const portionSize = useSelector<AppStateType,number>((state)=>state.search.countSelect)
    const cardPages = useSelector<AppStateType,number>((state)=>state.search.cardPages)

    let pageCount = Math.ceil(cardPageTotalCount/cardPages)
    let pageList = []
    for(let i=0; i<pageCount;i++){
        pageList.push(i)
    }

    let portionCount = Math.ceil(pageCount / cardPages);//посмотрим
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardCountAC(+e))
    }
    const PagesCount = (e:number) =>{
        dispatch(pagesListAC(e))
    }
    let pagesList = useSelector<AppStateType,number>(state=>state.search.pagesList)
    return (
        <div style={{textAlign:'right'}}>


            <SuperSelectOld style={{display:'inline' ,textAlign:'right'}} onChangeOption={onChangeHandler} options={['3','4','5','6','7','8','9']}/>



            <Search/>




            {portionNumber > 1
                ? <SuperButtonOld  title={'PREV'} onClick={() => {setPortionNumber(portionNumber - 1)}}/>
                : <SuperButtonOld  title={'PREV'} onClick={() => {setPortionNumber(pageList.length)}}/>        // на будущее реализовать  обратный отсчет
            }
            {pageList
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span
                                 className={p === pagesList ? css.selectedPage : css.selectedP}
                                 onClick={()=>PagesCount(p)}
                               >{p}-</span>
                })}
            {portionCount > portionNumber
                ? <SuperButtonOld title={'NEXT'} onClick={() => {setPortionNumber(portionNumber + 1)}}/>
                : portionCount < rightPortionPageNumber-1 && setPortionNumber(1)                // править долго убегает вперед
            }

        </div>
    )
}