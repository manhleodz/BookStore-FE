import React from 'react';
import ReactStars from "react-rating-stars-component";


export default function Rating({rating}) {
    return (
        <>
            <ReactStars
                edit={false}
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
        </>
    )
}
