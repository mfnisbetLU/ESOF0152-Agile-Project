import styled from 'styled-components';
import React, { useState } from "react";
import CaloriesIcon from "./NutrientIcons/Calories.png"
import CarbsIcon from "./NutrientIcons/Carbs.png"
import FatIcon from "./NutrientIcons/Fats.png"
import ProteinIcon from "./NutrientIcons/Protein.png"
import {RenderIcon} from './RenderIcon.js';

const nutrientMap = {
  ENERC_KCAL: { label: "Calories", unit: "kcal", icon: CaloriesIcon },
  FAT: { label: "Fat", unit: "g", icon: FatIcon },
  PROCNT: { label: "Protein", unit: "g", icon: ProteinIcon },
  CHOCDF: { label: "Carbs", unit: "g", icon: CarbsIcon }
};

/**
 * This component renders the array of hints passed from the APIFood functions
 * Takes the response data from APIFood, the amount from app.js quantity, and can return the label of the card that was pressed
 * The number of calories is multiplied by the quantity
 * The API has natural word processing capabilities so if the user entered "3 slices of pizza" it should be able to
 * return the calories for '3 slices' if it matched, I couldn't figure that out
 * So instead just returns full measures array and multplies by the quantity
 * Results are tabluated with a little icon beside them
 * Uses the index to sort the cards
 */

export function FoodCards({ FoodResponseData, amount, unit, onSelectLabel }) {
  if (!FoodResponseData?.hints) return null;

  return (
    <FlexContainer>
      {FoodResponseData.hints.map((hint, index) => {
        const { food, measures = [] } = hint;

        const selectedMeasure = unit
          ? measures.find((m) => m.label.toLowerCase() === unit.toLowerCase())
          : null;

        const weightPerUnit = selectedMeasure?.weight || 1;

        return (
          <FoodCard
            key={index}
            food={food}
            measures={measures}
            amount={amount}
            unit={unit}
            weightPerUnit={weightPerUnit}
            onSelectLabel={onSelectLabel}
          />
        );
      })}
    </FlexContainer>
  );
}

function FoodCard({ food, measures, amount, unit, weightPerUnit, onSelectLabel }) {
  const [expanded, setExpanded] = useState(false);

  // Calculate total grams based on quantity * unit weight
  const totalGrams = amount * weightPerUnit;

  return (
    <CardContainer>
      <RecipeCard>
        <CardHeader>{food.label}</CardHeader>
        <CardImage
          src={
            food.image ||
            "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
          }
          alt={food.label}
        />

        <CardText>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nutrient</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(nutrientMap).map(([key, { label, unit, icon }]) => (
                <tr key={key}>
                  <td><RenderIcon image={icon} size={30} /></td>
                  <td>{label}</td>
                  <td>
                    {food.nutrients[key]
                      ? (totalGrams * food.nutrients[key] / 100).toFixed(2) + " " + unit
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button onClick={() => onSelectLabel(food.label)}>
            Search Recipes
          </Button>

          <Button onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Details" : "Show Details"}
          </Button>

          {expanded && (
            <>
              <CardMeasure>Serving Conversions</CardMeasure>
              <ul>
                {measures.map((m, idx) => {
                  const formattedWeight = Number(m.weight)
                    .toFixed(2)
                    .replace(/\.?0+$/, "");
                  return (
                    <li key={idx}>
                      {m.label}: {formattedWeight} g
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </CardText>
      </RecipeCard>
    </CardContainer>
  );
}


const CardHeader = styled.header`
  font-size: 40px;
  font-weight: bold;
  padding-left: 30px;
  margin-bottom: 10px;
`

const CardText = styled.p`
  font-size: 23px;
  padding-left: 25px;
`
const CardMeasure = styled.p`
  font-size: 20px;
  font-weight: bold;
`

const CardContainer = styled.div`
  background-color: #e8efe6;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 8px solid black;
  border-radius: 40px;
  margin-right: 20px;
  margin-left: 10px;
  padding-right: 40px;
  min-width: 200px;
  max-width: 330px;
  transition: box-shadow 0.3s ease-in-out; 
  box-shadow: none; 

  &:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3); 
  }
`;

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

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  margin-left: 50px;
  margin-top: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-right: 10px solid #4f9b7b;
`