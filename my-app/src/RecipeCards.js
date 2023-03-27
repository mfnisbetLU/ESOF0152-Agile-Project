import styled from 'styled-components';
import React from "react";

// Renders full array of returned results
// Trying to figure out how to use the measures values to calculate certain amounts
export function RecipeCards({ responseData }) {
  return (
    <div>
      {responseData.hints.map((hint, index) => {
        const measuresWithQuantity = hint.measures.map(measure => ({
          ...measure,
          quantity: 1
        }));
        
        return (
          <CardContainer key={index}>
            <RecipeCard>
              <CardHeader >{hint.food.label}</CardHeader >
              <CardImage src={hint.food.image || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt={hint.food.label} />
              <CardText>Calories: {hint.food.nutrients.ENERC_KCAL.toFixed(2)} kcal</CardText>
              <CardText>Fat: {hint.food.nutrients.FAT.toFixed(2)} grams</CardText>
              <CardText>Protein: {hint.food.nutrients.PROCNT.toFixed(2)} grams</CardText>
              <CardText>Carbs: {hint.food.nutrients.CHOCDF.toFixed(2)} grams</CardText>
              
              <ul>
                {measuresWithQuantity.map((measure, index) => (
                  <li key={index}>
                    {measure.label}: {measure.quantity} {measure.unit}
                  </li>
                ))}
              </ul>
            </RecipeCard>
          </CardContainer>
        );
      })}
    </div>
  );
}

const CardHeader = styled.header`
  font-size: 40px;
  font-weight: bold;
  padding-left: 30px;
  margin-bottom: 10px;
`

const CardText = styled.p`
  font-size: 20px;
  padding-left: 30px;
`

const CardContainer = styled.div`
  background-color: #e8efe6;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 8px solid black;
  border-radius: 40px;
  margin-right: 150px;
`

const RecipeCard = styled.div`
  margin-bottom: 20px;
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  margin-left: 20px;
  border-radius: 30px;
  border: 6px solid black;

`