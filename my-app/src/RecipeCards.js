// CURRENTLY NOT IN USE
// Currently rendering to the App.js component directly
// But that's probably not good and we should implement something like this
import React from "react";
export function RecipeCards(props) {
  const { data } = props;

  return (
    <div>
      {data.hints.map((hint, index) => (
        <div key={index}>
          <h2>{hint.food.label}</h2>
          <p>{hint.food.categoryLabel}</p>
          <img src={hint.food.image} alt={hint.food.label} />
          <ul>
            {hint.measures.map((measure, i) => (
              <li key={i}>{measure.label}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
