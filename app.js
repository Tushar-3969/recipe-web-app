const SearchBox=document.querySelector(".SearchBox");
const btn=document.querySelector(".btn");
const recipeContainer=document.querySelector(".recipe-container");
const recipeDetailsContent=document.querySelector(".recipedetails-content");
const recipeCloseBtn=document.querySelector(".recipe-close-btn");



//function to get recipes
const fetchRecipes= async (query)=>{
     recipeContainer.innerHTML="<h2>Fetching recipes..</h2>";
     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
     const response= await data.json();
     
     recipeContainer.innerHTML="";
     response.meals.forEach((meal)=>{
         const recipeDiv=document.createElement("div");
         recipeDiv.classList.add("recipe");
         recipeDiv.innerHTML=`
             <img src="${meal.strMealThumb}">
             <h3>${meal.strMeal}</h3>
             <p><span>${meal.strArea}</span> Dish</P>
             <p>Belongs to <span>${meal.strCategory}</span> Category</P>
         `
         const button = document.createElement(`button`);
         button.textContent="view Recipe";
         recipeDiv.appendChild(button);
     //     Adding Eventlistener to recipe button
        button.addEventListener("click",()=>{
          openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
});
};

// function to fetch ingredients and measurments
const fetchIngredients=(meal)=>{
    let ingredientsLists =""
    for(let i=1;i<=20;i++){
       const ingredient = meal[`strIngredient${i}`];
       if(ingredient){
          const measure= meal[`strMeasure${i}`];
           ingredientsLists += `<li>${measure} ${ingredient}</li>`
       }else{
          break;
       }
    }
    return ingredientsLists;
}

const openRecipePopup = (meal)=>{
     recipeDetailsContent.innerHTML=`
         <h2 class="recipeName">${meal.strMeal}</h2>
         <h3>Ingredents:</h3>
         <ul class="ingredinetList">${fetchIngredients(meal)}</ul>
          <div class="recipeInstructions">
             <h3>Instructions:</h3>
             <p>${meal.strInstructions}</p>
         </div>
     `
     recipeDetailsContent.parentElement.style.display="block";
 }

recipeCloseBtn.addEventListener("click",()=>{
     recipeDetailsContent.parentElement.style.display="none";
 });
btn.addEventListener("click",(e)=>{
     e.preventDefault();
     const searchInput=SearchBox.value.trim();
     if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box...</h2>`;
        return;
     }
     fetchRecipes(searchInput);
});

