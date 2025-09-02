import axios from "axios";

/*
Create options makes a GET request from the Tasty API via RapidAPI
q: the search query
from/size: Page controls
tags: optional filters (like "under_30_minutes")
Dropped in favour of normalizing the data 
*/
// function createRecipeOptions(value) {
//   const options = {
//     method: "GET",
//     url: "https://tasty.p.rapidapi.com/recipes/list",
//     params: {
//       q: value,
//       from: 0,
//       size: 20,
//       tags: "under_30_minutes"
//     },
//     headers: {
//       "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
//       "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST_TASTY
//     }
//   };
//   return options;
// }


/*
* makeRecipeRequest calls createRecipeOptions and returns the API's response data
* response.data.results is the array of recipes from Tasty
* errors are logged and re-thrown for handling in the UI
*/
export async function makeRecipeRequest(value) {
  const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { q: value, from: 0, size: 20 },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST_TASTY
    }
  };

  try {
    const response = await axios.request(options);
    const recipes = normalizeTastyResponse(response.data);
    console.log("Normalized recipes:", recipes);
    return recipes;
  } catch (error) {
    console.error("Tasty API error:", error);
    throw new Error(`Unable to make recipe request: ${error.message}`);
  }
}

/*
* Normalize the response from the tasty API
* If another API has to be used for whatever reason write another normalizer function and use the same schema
* Saves some headache swapping between APIs 
*/

function normalizeTastyRecipe(recipe) {
  return {
    id: recipe.id?.toString() || recipe.canonical_id || "",
    title: recipe.name || "Untitled recipe",
    image: recipe.thumbnail_url || recipe.beauty_url || "",
    description: recipe.description || "",
    ingredients: recipe.sections?.flatMap(section =>
      section.components?.map(c => c.raw_text) || []
    ) || [],
    instructions: recipe.instructions?.map(step => step.display_text) || [],
    video: recipe.youtube_url || recipe.original_video_url || recipe.video_url || null
  };
}

/* Returns a map of the normalized response to display */ 
export function normalizeTastyResponse(apiResponse) {
  if (!apiResponse?.results) return [];

  return apiResponse.results.map(normalizeTastyRecipe);
}