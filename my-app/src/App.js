import React from 'react';
import {useState} from 'react';
import { makeRequest } from './APIRecipe.js';
import styled from 'styled-components';
import { RenderLogo } from './Logo.js';
import { makeFoodRequest } from './APIFood.js';
import { makeRecipeRequest } from './APIRecipe.js';
import { FoodCards } from './FoodCards.js';
import { RecipeCards } from './RecipeCards.js';
import styled from 'styled-components'
import Header from './Header.js'


function App() {
  const [InputFoodValue, setInputFoodValue] = useState('');
  const [InputRecipeValue, setInputRecipeValue] = useState('');
  const [FoodResponseData, setFoodResponseData] = useState(null);
  const [RecipeResponseData, setRecipeResponseData] = useState(null);
  const [count, setCount] = React.useState(1);

  // Handles search button click
  // Stores the response data, when there is data renders the FoodCards component
  const handleClick1 = () => {
    makeFoodRequest(InputFoodValue)
      .then(response => {
        setFoodResponseData(response);
        console.log("Ingredient Data: ");
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Handles recipe button click
  // Can use saved ingredient
  const handleClick2 = () => {
    makeRecipeRequest(InputRecipeValue)
      .then(response => {
        setRecipeResponseData(response);
        console.log("Recipe Data: ");
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Handles quantity counter, if blank the value is 0
  // Only allows integers to be entered
  function handleCountChange(event) {
    const input = event.target.value;
    if (input === '') {
      setCount(0);
    } else if (/^\d+$/.test(input)) {
      const parsedValue = parseInt(input);
      const count = Math.min(parsedValue, 999999999);
      setCount(count);
    }
  }

  return (
    <BackGround style={{ background: 'linear-gradient(to bottom,#EAEAEA, #DBDBDB, #F2F2F2, #ADA996)' }}>
      {/* <RenderLogo size={100}/> */}   
        
        <RecipeInput placeholder="Search Item" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <SearchingSpan>Searching: {inputValue}</SearchingSpan>
      <Header>
      <RenderLogo size={100}/>
        <LogoText>
          Kitchen Treasures
        </LogoText>
        <RegularText>
          <div>
          <SearchingSpan>
            Search for ingredients:
            <ValueInput placeholder="apple" value={InputFoodValue} onChange={(e) => setInputFoodValue(e.target.value)}/>
          </SearchingSpan>
          </div>
          <div>
          <SearchingSpan>
            Search for recipes:
            <ValueInput placeholder="apple pie" value={InputRecipeValue} onChange={(e) => setInputRecipeValue(e.target.value)}/>
          </SearchingSpan>
          </div>
          <div>
            <SearchingSpan>
              Quantity:
              <ValueInput placeholder="1" value={count} onChange={handleCountChange} />
              <Button onClick={() => {handleClick1(InputFoodValue)}}>Search Ingredients</Button>
              <Button onClick={() => {handleClick2(InputRecipeValue)}}>Search Recipes</Button>
              <div>
                Saved Ingredient: {InputRecipeValue}
              </div>
            </SearchingSpan>
          </div>
          
        </RegularText>
        
        <SearchingSpan>
          <CardsWrapper>
            {FoodResponseData && <FoodCards FoodResponseData={FoodResponseData} amount={count} onSelectLabel={setInputRecipeValue}/>}
            {RecipeResponseData && <RecipeCards FoodResponseData={RecipeResponseData} amount={count} />}
        </CardsWrapper>
        </SearchingSpan>
      </Header>
    </BackGround>
  );
}

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const BackGround = styled.div`
min-height: 100vh;
background:linear-gradient(to bottom,#EAEAEA, #DBDBDB, #F2F2F2, #ADA996);
`

// const Header = styled.header`
//   background-color: green;
//   width: 500px;
// `

// const LogoText = styled.p`
//   color: white;
//   font-size: 20px;
//   font-family: Arial, Helvetica, sans-serif;
//   font-weight: bold;
//   padding-left: 10px;
//`


// const Header = styled.header`
//   background: green;
// `

// const Paragraph = styled.p`
//   color: white;
//   font-size: 20;
// `
=======
const Header = styled.header`
  background-color: green;
  min-width: 800px;
  padding-bottom: 10px;
`

const LogoText = styled.p`
  color: white;
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  padding-left: 10px;
`

const RegularText = styled.p`
color: white;
font-size: 20px;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
`

const Button = styled.button`
  background: black;
  border-radius: 3px;
  color: white;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 150px;
  height: 50px;
  alignItems: 'center',

`;

const SearchingSpan = styled.span`
color: black;
font-size: 20px;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
padding-left: 5px;
padding: 0.25em 2em;
width: 200px;
height: 80px;
cursor: pointer;
`;

const SearchingSpan = styled.span`
display: inline-block;
padding-left: 10px;
`

const ValueInput = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1.2em",
}))`
  font-size: 16px;
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

export default App;

