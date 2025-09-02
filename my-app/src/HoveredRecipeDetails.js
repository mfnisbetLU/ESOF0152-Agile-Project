import React, { useState } from "react";
import styled from "styled-components";

/**
 * Hovered recipe details is an extension of the recipe cards component
 * Holds the specific recipe that is being hovered over and is passed the quantity from app.js
 * Uses the intredients portion of the recipe to display all the used ingredients
 * Uses the nutrient daily/total to display the amount of micronutrients from the quantity of servings
 * Is set to hidden again after it's no longer being hovered over
 * 
 * CURRENTLY UNUSED 
 */
const HoveredRecipeDetails = ({ recipe, amount }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <RecipeDetails>
      <h3>{recipe.title}</h3>
      <CardText>
        <strong>Ingredients:</strong> {recipe.ingredients?.join(", ")}
      </CardText>

      <ToggleButton onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </ToggleButton>

      {showDetails && (
        <DetailsSection>
          {recipe.description && <p><strong>Description:</strong> {recipe.description}</p>}

          {recipe.instructions?.length > 0 && (
            <>
              <h4>Instructions</h4>
              <ol>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </DetailsSection>
      )}
    </RecipeDetails>
  );
};

const RecipeDetails = styled.div`
  background-color: #FED8D0;
  padding: 10px;
  border: 8px solid black;
  border-radius: 40px;
  margin: 0 1em;
`;

const CardText = styled.p`
  font-size: 20px;
`;

const ToggleButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  cursor: pointer;
`;

const DetailsSection = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: white;
  border-radius: 12px;
`;

export default HoveredRecipeDetails;

