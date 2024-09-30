
const displayNav = () => {
    const navContainer = document.getElementById('nav-container');
    const navSection = document.createElement('div');
    navSection.innerHTML = `     
     <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">FoodBazz</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact Us</a>
              </li>
            </ul>
            <!-- search-container -->
            <div>
              <input class="px-2" type="text" name="" id="search-field" placeholder="search">
              <button onclick="searchMeals()" class="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </nav>
`;
    navContainer.appendChild(navSection);
}

const displayCarousel = () => {
    const carouselContainer = document.getElementById('carousel-container');
    const carouselSection = document.createElement('div');
    carouselSection.innerHTML = `
    <div  class="carousel-item active container-fluid">
    <img class="image-fluid w-100" src="image/banner_1.png" alt="...">
    <div class="carousel-caption">
      <h1 class="fs-1">Taste Our Delicious Best Foods</h1>
      <p>There are many variations of Foods available in this World.The world's diverse cuisine includes sushi from Japan, Italian pasta, Indian curry, Mexican tacos, French pastries, Middle Eastern falafel, and American burgers.</p>
      <div class="container-fluid">
        <input class="px-2 rounded" type="text" name="" id="search-field" placeholder="search">
        <button onclick="searchMeals()" class="btn btn-warning">Search</button>
      </div>
  </div>
</div>
    
    `;
    carouselContainer.appendChild(carouselSection);

}

const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
      .then(res => res.json())
      .then(data => displayMeals(data.meals));
}


const displayMeals = (meals) => {
    // console.log(meals);

    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
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
const searchMeals = () => {
    // console.log('btn-click')
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);
    document.getElementById('search-field').value = '';
    loadMeals(searchText);
}

const loadMealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealsDetails(data.meals[0]))
        .catch(error => console.log(error));
}
const displayMealsDetails = meal => {
    document.getElementById('mealDetailsLabel').innerHTML = meal.strMeal;
    document.getElementById('mealDetailsBody').innerHTML =
        `<img class = "img-fluid rounded " src="${meal.strMealThumb}">
    <p class="card-text overflow-y-scroll"style="height: 140px;">${meal.strInstructions}</p>
    <a href="${meal.strYoutube}">${meal.strMeal} Recipe-Video</a>`;


}
displayNav();
displayCarousel();
loadMeals('fish');