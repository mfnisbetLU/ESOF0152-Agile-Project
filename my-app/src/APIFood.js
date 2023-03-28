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
export function makeFoodRequest(value) { 
  const options = createOptions(value);
  return axios.request(options)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}