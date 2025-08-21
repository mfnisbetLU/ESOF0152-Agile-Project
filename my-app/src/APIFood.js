import axios from "axios";
/*
* Create options makes a GET request from the edamam API
* ingr: value is the search value, the categories can be used to filter
* RapidAPI is the service used to make the call, the key and host header is required
* Internal function, used by the makeFoodRequests function
*/

function createOptions(value){
  const Options = {
    method: 'GET',
    url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
    params: {
      app_id: process.env.REACT_APP_EDAMAM_API_ID,
      app_key: process.env.REACT_APP_EDAMAM_API_KEY,
      ingr: value,
      'category[0]': 'generic-foods',
      'health[0]': 'alcohol-free',
      'nutrition-type': 'cooking'
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST_EDAMAM
    }
  };
  return Options;
}
/*
* makeFoodRequest is a public function that calls createOptions to make an array of hints with the request
* response.data holds the array of hints which is all the values of the API
* Automatic error handling, prints to console on error
* Returns the response.data to the app.js component
*/
export function makeFoodRequest(value) {
  const options = createOptions(value);
  return axios.request(options)
    .then(response => {
      console.log("Edamam Food API response:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Edamam Food API error:", error);
      throw error;
    });
}