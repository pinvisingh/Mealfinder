const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");
function searchMeal(e) {
  e.preventDefault();
  single_mealEl.innerHTML = "";
  const term = search.value;
  console.log(term);
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal" id="meal1">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"  id="name" name="jadu"/>
              <div class="meal-info"  data-mealID="${meal.idMeal}">
                <button id="bag-btn" onclick="addmore">
                  favorite
                </button>
                <div id="dishName">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
            </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }

 
}

function addmore(){
  let name = document.getElementById("dishname").value;
  if(name !=""){
    let box=document.getElementById('box');

    let li = document.createElement('li');
    li.textcontent =name;

    box.appendChild(li);
  }
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}
function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
    </div>
  </div>`;
}
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});



// for my favorite list
// function getMealById2(mealID2) {
  // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID2}`)
    // .then((res) => res.json())
    // .then((data) => {
      // console.log(data);
      // const favmeal = data.meals[0];
      // addMealToDOM2(favmeal);
    // });
// }

function addMealToDOM2(favmeal){
  // const dishname=document.createElement("div");
  // dishname.classList.add("favorite-container");
  // dishname.innerHTML = 
              // <div class="dishname">${favmeal.strMeal}</div>;
// 
}
const fav = document.getElementById("bag-btn");
fav.addEventListener('submit', function(){
      console.log(hi);
});
  // const name = e.path.find((item) => {
  //   if (item.classList) {
  //     return item.classList.contains("meal-info");
  //   } else {
  //     return false;
  //   }
  // });
  // if (name) {
  //   const mealID2 = name.getAttribute("data-mealID");
  //   getMealById2(mealID2);
  // }




// mealsEl.addEventListener("click", (e) => {
  // const name = e.path.find((item) => {
    // if (item.classList) {
      // return item.classList.contains("meal-info");
    // } else {
      // return false;
    // }
  // });
  // if (name) {
    // const mealID2 = name.getAttribute("data-mealID");
    // getMealById2(mealID2);
  // }
// });