
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
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions}</p>
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
 loadMeals(searchText);
}

loadMeals('fish');