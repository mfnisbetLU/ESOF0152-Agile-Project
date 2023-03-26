import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import { RenderLogo } from './Logo.js';
import { makeRequest } from './APIRecipe.js';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  // Handles search button click
  const handleClick1 = () => {
    makeRequest(inputValue)
      .then(response => {
        setResponseData(response);
        console.log("Response Data: ");
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <BackGround>
      <Header>
      <RenderLogo size={100}/>
        <LogoText>
          Recipe Getter
        </LogoText>
      
        <RecipeInput placeholder="apple" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <SearchingSpan>Searching: {inputValue}</SearchingSpan>

        <Container>
        <Button onClick={() => {handleClick1(inputValue)}}>Get Results</Button>
        </Container>

        {responseData && responseData.hints.map((hint, index) => (
          <div key={index}>
            <h2>{hint.food.label}</h2>
            <img src={hint.food.image} alt={hint.food.label} />
            <ul>
              {hint.measures.map((measure, index) => (
                <li key={index}>
                  {measure.label}: {measure.quantity} {measure.unit}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </Header>
    </BackGround>
  );
}

const BackGround = styled.div`
background-color: #7AEF68;
min-height: 2160px;
`

const Header = styled.header`
  background-color: green;
  width: 500px;
`

const LogoText = styled.p`
  color: white;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-left: 10px;
`

const Button = styled.button`
  background: white;
  font-size: 20px;
  border-radius: 3px;
  border: 2px solid red;
  color: red;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 150px;
  height: 50px;
`;

const SearchingSpan = styled.span`
color: white;
font-size: 20px;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
padding-left: 5px;
`

const Container = styled.div`
  text-align: center;
`

const RecipeInput = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1.2em",
}))`
  font-size: 16px;
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

export default App;
