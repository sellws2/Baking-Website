
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://bokfydvnukbsveefvbbt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJva2Z5ZHZudWtic3ZlZWZ2YmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MjIzMzgsImV4cCI6MjA3NjI5ODMzOH0.QHMHbQbgxU0_9vGEkYp2xeKxk-HImPvtFB_PAsFud4s';
const supabase = createClient(supabaseUrl, supabaseKey);

//-----------------------------------------------------------------------------------------------//

//Fetch recipe details based on recipe ID from database
async function getRecipeFromDB(ID) {
  //Fetch data from the "recipe" table in Supabase
  let { data: recipe, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', ID)
    .single();
  //Error handling
  if (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }

  return recipe;
}

//Display recipe on the detail page
async function displayRecipeDetail() {
  const recipeID = localStorage.getItem('storedRecipeID');
  const recipe = await getRecipeFromDB(recipeID);

  if (!recipe) {
    document.getElementById('recipeDetailContainer').innerHTML = '<p>Recipe not found.</p>';
    return;
  }

  let container = document.getElementById('recipeDetailContainer');
  container.innerHTML = `
    <div class="recipeTitle">
      <h1>${recipe.title}</h1>
    </div>
    <div class="recipeDesc">
      <p>${recipe.description}</p>
    </div>
    <div class="recipeImg">
      <img src="/Assignment 2.2/Images/${recipe.image}">
    </div>
    <div class="recipeIngre">
      <p id="recipeHeading">Ingredients</p>
      <p>${recipe.ingredients}</p>
    </div>
    <div class="recipeInstr">
      <p id="recipeHeading">Instructions</p>
      <p>${recipe.instructions}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  displayRecipeDetail();
});

