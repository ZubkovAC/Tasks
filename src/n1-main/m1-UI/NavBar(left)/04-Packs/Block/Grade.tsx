import React from "react";
import Rating from "react-rating";
import star from './../../../Common/img/stars.png'
import star2 from './../../../Common/img/stars2.png'


type GradeType = {
    grade:number
}
export const Grade = ({grade}:GradeType) =>{
    return (
        <span >
            <Rating
                emptySymbol={<img src={star} width='15px' className="icon" />}
                fullSymbol={<img src={star2} width='15px' className="icon" />}
                initialRating={grade}
                readonly
            />
        </span>
    )

}


