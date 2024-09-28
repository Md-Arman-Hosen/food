
const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then (data => displayMeals(data.meals));
}
 
const displayMeals = (meals)=>{
    console.log(meals);

    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML= '';
    meals.forEach(meal => {
        // console.log(meal);

        const mealdiv = document.createElement('div');
        mealdiv.classList.add('col');
        mealdiv.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top p-2 rounded " alt="...">
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text overflow-y-scroll"style="height: 140px;">${meal.strInstructions}</p>
         
                <button onclick = "loadMealDetail(${meal.idMeal})"; type="button" class="btn btn-primary" data-bs-toggle="modal"    data-bs-target="#mealDetails">Details </button>
              </div>
        </div>
    `;
        
    mealsContainer.appendChild(mealdiv);
    });
}
const searchMeals=()=>{
    // console.log('btn-click')
 const searchText = document.getElementById('search-field').value;
 console.log(searchText);
 document.getElementById('search-field').value = '';
 loadMeals(searchText);
}

const loadMealDetail = idMeal => {
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then (data => displayMealsDetails(data.meals[0]))
    .catch (error=>console.log(error));
}
const displayMealsDetails = meal => {
    document.getElementById('mealDetailsLabel').innerHTML = meal.strMeal;
    document.getElementById('mealDetailsBody').innerHTML =
    `<img class = "img-fluid rounded " src="${meal.strMealThumb}">
    <p class="card-text overflow-y-scroll"style="height: 140px;">${meal.strInstructions}</p>
    <a href="${meal.strYoutube}">${meal.strMeal} Recipe-Video</a>`;


}

loadMeals('fish');