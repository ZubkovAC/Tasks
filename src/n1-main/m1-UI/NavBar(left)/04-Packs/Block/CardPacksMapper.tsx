import React, { useMemo } from "react";
import {CardPackType} from "../../../../m3-DAL/axios";
import { Block } from "./Block";

type cardPacksMapperPropsType={
    cardPacks:CardPackType[]
    userID:string
}

export const CardPacksMapper = ({cardPacks,userID}:cardPacksMapperPropsType) =>{
    const cardPacksMapper = useMemo(() => cardPacks.map(t => {
        return <Block
            update={userID}
            key={t._id} name={t.name} rating={t.rating}
            userName={t.user_name} created={t.created}
            id={t._id}
            user_id={t.user_id}
            cardsCount={t.cardsCount}
            grade={t.grade}
        />
    }),[cardPacks, userID])
    return (
    <div>
        {cardPacksMapper}
    </div>
    )
}
