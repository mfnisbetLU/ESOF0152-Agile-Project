import axios from "axios";

function createRecipeOptions(value){
const Options = {
  method: 'GET',
  url: 'https://edamam-recipe-search.p.rapidapi.com/search',
  params: {value},
  headers: {
    'X-RapidAPI-Key': 'f4509876e7msh875d9e662afe170p18439bjsnf07d0ac0b68f',
    'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    }
    return Options;
};

// Handles the API requests
export function makeRecipeRequest(value) { 
    const options = createRecipeOptions(value);
    return axios.request(options)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }