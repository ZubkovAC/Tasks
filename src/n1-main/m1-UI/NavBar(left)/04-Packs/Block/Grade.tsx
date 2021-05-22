import React from "react";
import Rating from "react-rating";
import star from '../../../Common/Accets/stars.png'
import star2 from '../../../Common/Accets/stars2.png'


type GradeType = {
    grade:number
    width?: string
}
export const Grade = ({grade,width}:GradeType) =>{
    return (
        <span >
            <Rating
                emptySymbol={<img src={star} width={width? width : '15px' } alt='stars' className="icon" />}
                fullSymbol={<img src={star2} width={width? width : '15px' } alt='stars' className="icon" />}
                initialRating={grade}
                readonly
            />
        </span>
    )

}


