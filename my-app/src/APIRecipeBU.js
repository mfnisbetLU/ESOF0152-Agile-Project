/**
 * This is the old APIRecipe function which returns an array of objects
 * I got it working but it might be hard to work with the way I implemented it
 * So this is here just incase of emergency
 */

import axios from "axios";
// q param is query text, in this case the value the user entered
// Can also take 'r' which is the recipe ID, that's how we'll use it to look up
// Handles the get request, should implement secrets
function createOptions(value){
const Options = {
  method: 'GET',
  url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
  params: {ingr: value},
  headers: {
    'X-RapidAPI-Key': '7692bae7cfmshac9d83a53f8151bp19f475jsn305a0583021f',
    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
  }
};
  return Options;
}

// Handles the API requests
// calls the createOptions function to get list of options
// Turns response into json object then seperates them by foodID into an array of objects
export function makeRequest(value) { 
  axios.request(createOptions(value)).then(function (response) {
    const jsonString = JSON.stringify(response.data, null, 4)
    const jsonObject = JSON.parse(jsonString);
    
    const result = {};
    
    jsonObject.hints.forEach((hint) => {
      const foodId = hint.food.foodId;
      
      if (!result[foodId]) {
        result[foodId] = {
          food: hint.food,
          measures: hint.measures,
          image: hint.food.image,
          label: hint.food.label,
          nutrients: hint.food.nutrients
        };
      } else {
        result[foodId].measures.push(...hint.measures);
      }
    });
      // Creates an array of objects from the result object
      const foodArray = Object.values(result);
      return foodArray;
    // Error handling
  }).catch(function (error) {
    console.error(error);
  });
}

