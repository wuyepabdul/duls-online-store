import React from "react";
import StarRating from "react-star-ratings";

const showAverageRating = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let totalRatings = [];
    let length = ratingsArray.length;

    ratingsArray.map((rating) => totalRatings.push(rating.star));

    const initialNumber = 0;
    let reducedTotal = totalRatings.reduce(
      (prev, next) => prev + next,
      initialNumber
    );

    let highestRating = length * 5;
    let averageRatingResult = (reducedTotal * 5) / highestRating;

    return (
      <div className="pt-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={averageRatingResult}
            editing={false}
          />
        </span>{" "}
        <span>({product.ratings.length})</span>
      </div>
    );
  }
};

export default showAverageRating;
