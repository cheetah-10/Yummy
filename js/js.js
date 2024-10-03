function displayInstructionsOfMeal(){
    let mealData=``;
    for(let i=0; i<allMeals.length; i++){
        mealData=`
        <div class="col-md-4">
        <div class="image">
          <img src="${allMeals[i].strMealThumb}" class="w-100 rounded-3" alt="">
          <div class="title text-white fw-bold fs-2">${allMeals[i].strMeal}</div>
        </div>
      </div>
     <div class="col-md-8">
      <div class="instructions text-white">
        <h2>Instructions</h2>
        <p>${allMeals[i].strInstructions}</p>
        <h3>Area : <span>${allMeals[i].strArea}</span></h3>
        <h3>Category : <span>${allMeals[i].strCategory}</span></h3>
        <h3>Recipes : </h3>
        <div class="recipes d-flex flex-wrap mt-3">
          <p class="px-2 py-1 me-3 rounded-2">ingeredient</p>
        </div>
        
        <h3>Tags :</h3>
        <div class="tags d-flex flex-wrap my-3">
          <p class="px-2 py-1 rounded-2">ingeredient</p>
        </div>
        <a class="bg-success text-white rounded-2 py-2 px-3 btn" href="${allMeals[i].strSource}">Source</a>
        <a class="bg-danger text-white rounded-2 py-2 px-3 btn" href="${allMeals[i].strYoutube}">Youtube</a>
      </div>
     </div>`
    }
    document.querySelector('.mealData').innerHTML=mealData;
    
    
}
 