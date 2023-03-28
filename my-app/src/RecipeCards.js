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
    <CardHeader>{hint.food.label}</CardHeader>
    <CardImage
      src={hint.food.image || "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}
      alt={hint.food.label}
    />
    <Table>
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calories</td>
          <td>{hint.food.nutrients.ENERC_KCAL.toFixed(2)} kcal</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>{hint.food.nutrients.FAT.toFixed(2)} grams</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>{hint.food.nutrients.PROCNT.toFixed(2)} grams</td>
        </tr>
        <tr>
          <td>Carbs</td>
          <td>{hint.food.nutrients.CHOCDF.toFixed(2)} grams</td>
        </tr>
      </tbody>
    </Table>
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {measuresWithQuantity.map((measure, index) => (
          <tr key={index}>
            <td>{measure.label}</td>
            <td>{measure.quantity}</td>
            <td>{measure.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
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

// const CardText = styled.p`
//   font-size: 20px;
//   padding-left: 30px;
// `

const  Table = styled.table`
border-collapse: collapse;
width: 100%;

th,
td {
  border: 1px solid;
  padding: 10px;
  text-align: center;
}

th {
  background-color: solid black;
  text-align: center;

}
`;


const CardContainer = styled.div`
  background-color: #D8D9CF;
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