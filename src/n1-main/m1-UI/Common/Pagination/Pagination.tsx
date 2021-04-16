import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {cardCountAC} from "../../../m2-BLL/04-reducer-search/search-reducer";
import SuperSelect from "../InputAndButton/c5-SuperSelect/SuperSelect";
import {AppStateType} from "../../../m2-BLL/00-store/store";


export const Pagination = () => {
    const pagesCount = useSelector<AppStateType,number>((state)=>state.search.cardPageTotalCount)
    const portionSize = useSelector<AppStateType,number>((state)=>state.search.count)
    let pageCount = Math.ceil(pagesCount/portionSize)
    let pageList = []
    for(let i=0; i<pageCount;i++){
        pageList.push(i)
    }
    let portionCount = Math.ceil(pageCount / portionSize);//посмотрим
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(cardCountAC(+e))
    }
    return (
        <div>
            <SuperSelect onChangeOption={onChangeHandler} options={['3','4','5','6','7','8','9']}/>
            {portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}
            {pageList
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span style={{width:'30px',display:'alignItems'}}
                               >{p}-</span>
                })}
            {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>
                NEXT</button>}
        </div>
    )
}