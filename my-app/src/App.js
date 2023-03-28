import React from 'react';
import {useState} from 'react';
import { makeRequest } from './APIRecipe.js';
import { RecipeCards } from './RecipeCards.js';
import styled from 'styled-components'
//import { RenderLogo } from './Logo.js'
//import { makeRequest } from './APIRecipe'
import Header from './Header.js'


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
    <BackGround style={{ background: 'linear-gradient(to bottom,#EAEAEA, #DBDBDB, #F2F2F2, #ADA996)' }}>
      {/* <RenderLogo size={100}/> */}
      <Header/>     
        
        <RecipeInput placeholder="Search Item" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <SearchingSpan>Searching: {inputValue}</SearchingSpan>

        <Container>
        <Button onClick={() => {handleClick1(inputValue)}}>Get Results</Button>
        </Container>
        {responseData && <RecipeCards responseData={responseData} />}

    </BackGround>
  );
}

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
