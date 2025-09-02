import styled from 'styled-components';
import React, { useState } from "react";

/**
 * This component renders the array of hints passed from the APIRecipe functions
 * Takes the response data from APIRecipe, the amount from app.js quantity, and can return the label of the card that was pressed
 * The number of calories is multiplied by the quantity
 * Uses the index to sort the cards
 * hoveredSavedRecipe is used to store the data of the card being hovered over
 * Those details are passed to the HoveredRecipeDetails component
 * showSavedRecipes is a toggleable state to show the list of saved recipes
 */
export function RecipeCards({ recipes, amount, onSaveRecipe, compact, showDirections }) {
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const toggleExpand = (id) => setExpandedRecipeId(expandedRecipeId === id ? null : id);

  return (
    <FlexContainer>
      {Array.isArray(recipes) &&
        recipes.map((recipe, index) => {
          const isExpanded = expandedRecipeId === recipe.id;

          return (
            <CardContainer
              key={recipe.id || index}
              onClick={() => compact && toggleExpand(recipe.id)} 
              style={{ cursor: compact ? "pointer" : "default" }}
            >
              <CardHeader>{recipe.title}</CardHeader>
              {recipe.image && <CardImage src={recipe.image} alt={recipe.title} />}

              {compact ? (
                <>
                  {isExpanded && (
                    <>
                      {recipe.ingredients && (
                        <Dropdown>
                          <DropdownButton
                            onClick={(e) => {
                              e.stopPropagation(); 
                              e.currentTarget.nextSibling.classList.toggle("open");
                            }}
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
                      )}

                      {recipe.instructions && (
                        <Dropdown>
                          <DropdownButton
                            onClick={(e) => {
                              e.stopPropagation();
                              e.currentTarget.nextSibling.classList.toggle("open");
                            }}
                          >
                            Directions
                          </DropdownButton>
                          <DropdownContent>
                            <ol>
                              {recipe.instructions.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </DropdownContent>
                        </Dropdown>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <CardText>Ingredients: {recipe.ingredients?.length || 0}</CardText>
                  <CardText>Steps: {recipe.instructions?.length || 0}</CardText>
                  {onSaveRecipe && (
                    <Button onClick={() => onSaveRecipe(recipe)}>Save Recipe</Button>
                  )}
                  <Button onClick={() => toggleExpand(recipe.id)}>
                    {isExpanded ? "Hide Details" : "More Details"}
                  </Button>

                  {isExpanded && (
                    <DetailsSection>
                      {recipe.description && <CardText>{recipe.description}</CardText>}
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
                      {recipe.ingredients && (
                        <Dropdown>
                          <DropdownButton
                            onClick={(e) =>
                              e.currentTarget.nextSibling.classList.toggle("open")
                            }
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
                      )}
                      {recipe.instructions && (
                        <Dropdown>
                          <DropdownButton
                            onClick={(e) =>
                              e.currentTarget.nextSibling.classList.toggle("open")
                            }
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
                      )}
                    </DetailsSection>
                  )}
                </>
              )}
            </CardContainer>
          );
        })}
    </FlexContainer>
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

// const DescriptionText = styled(CardText)`
//   display: -webkit-box;
//   -webkit-line-clamp: 3;   
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   min-height: 4.5em;       
// `;

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

// const RecipeCard = styled.div`
//   margin-bottom: 20px;
// `;

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