import styled from 'styled-components';
import React, { useState } from "react";
import HoveredRecipeDetails from "./HoveredRecipeDetails";

const SAVE_KEY = "savedRecipes";

/**
 * This component renders the array of hints passed from the APIRecipe functions
 * Takes the response data from APIRecipe, the amount from app.js quantity, and can return the label of the card that was pressed
 * The number of calories is multiplied by the quantity
 * Uses the index to sort the cards
 * hoveredSavedRecipe is used to store the data of the card being hovered over
 * Those details are passed to the HoveredRecipeDetails component
 * showSavedRecipes is a toggleable state to show the list of saved recipes
 * Uses the hints in the same way as the food card component with respect to the new API..
 * to display relevant details about the recipe that was searched for, either by entering in the search bar...
 * or by the search recieps button on the food card component
 */
export function RecipeCards({ recipes, savedRecipes, setSavedRecipes }) {
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);

  const handleSaveClick = (recipe) => {
    const newSavedRecipes = {
      ...savedRecipes,
      [recipe.id]: { id: recipe.id, title: recipe.title, image: recipe.image }
    };
    localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
    setSavedRecipes(newSavedRecipes);
  };

  const toggleExpand = (id) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  const savedRecipeLinks = Object.entries(savedRecipes).map(([id, { title, image }]) => (
    <li key={id}>
      <div>{title}</div>
      {image && <img src={image} alt={title} style={{ width: "80px" }} />}
    </li>
  ));

  return (
    <div>
      <Button onClick={() => setShowSavedRecipes(true)}>Show Saved Recipes</Button>
      {showSavedRecipes && (
        <div>
          <Button onClick={() => setShowSavedRecipes(false)}>Hide Saved Recipes</Button>
          <ul>{savedRecipeLinks}</ul>
          <Button onClick={() => {localStorage.removeItem("savedRecipes"); setSavedRecipes({})}}>Reset Saved Recipes</Button>
        </div>
      )}

      <FlexContainer>
        {Array.isArray(recipes) &&
          recipes.map((recipe, index) =>
            recipe ? (
          <CardContainer key={recipe.id || index}>
            <CardHeader>{recipe.title}</CardHeader>
            {recipe.image && <CardImage src={recipe.image} alt={recipe.title} />}
            
            <CardText>Ingredients: {recipe.ingredients.length}</CardText>
            <CardText>Steps: {recipe.instructions.length}</CardText>

            <Button onClick={() => handleSaveClick(recipe)}>Save Recipe</Button>
            <Button onClick={() => toggleExpand(recipe.id)}>
              {expandedRecipeId === recipe.id ? "Hide Details" : "More Details"}
            </Button>

            {expandedRecipeId === recipe.id && (
              <DetailsSection>
                {recipe.description && (
                  <CardText>{recipe.description}</CardText>
                )}

                {recipe.video && (
                  <VideoWrapper>
                    <iframe
                      width="100%"
                      height="250"
                      src={recipe.video.replace("watch?v=", "embed/")}
                      title={recipe.title}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </VideoWrapper>
                )}

                <Dropdown>
                  <DropdownButton
                    onClick={(e) => e.currentTarget.nextSibling.classList.toggle("open")}
                  >
                    Ingredients
                  </DropdownButton>
                  <DropdownContent>
                    <ul>
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </DropdownContent>
                </Dropdown>

                <Dropdown>
                  <DropdownButton
                    onClick={(e) => e.currentTarget.nextSibling.classList.toggle("open")}
                  >
                    Instructions
                  </DropdownButton>
                  <DropdownContent>
                    <ol>
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </DropdownContent>
                </Dropdown>
              </DetailsSection>
            )}
          </CardContainer>

            ) : null
          )}
      </FlexContainer>
    </div>
  );
}


const CardHeader = styled.header`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 18px;
  padding: 0 10px;
`;

const DescriptionText = styled(CardText)`
  display: -webkit-box;
  -webkit-line-clamp: 3;   
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 4.5em;       
`;

const CardContainer = styled.div`
  background-color: #FED8D0;
  margin: 10px;
  padding: 20px;
  border: 6px solid black;
  border-radius: 20px;
  min-width: 220px;
  max-width: 320px;
  flex: 1;
  transition: box-shadow 0.3s ease-in-out;
  box-shadow: none;

  &:hover {
    box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.25);
  }
`;

const RecipeCard = styled.div`
  margin-bottom: 20px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  border: 4px solid black;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`;

const DetailsSection = styled.div`
  margin-top: 15px;
`;

const VideoWrapper = styled.div`
  margin-bottom: 15px;
`;

const Dropdown = styled.div`
  margin: 10px 0;
`;

const DropdownButton = styled(Button)`
  width: 100%;
`;

const DropdownContent = styled.div`
  display: none;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  background: #fff;

  &.open {
    display: block;
  }
`;