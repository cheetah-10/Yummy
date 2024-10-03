/// <reference types="../@types/jquery"/>
let rowData = document.getElementById('rowData');

function openNav() {
  $('.side-nav-menu').animate({ left: 0 }, 500)
  $('.open-close-icon').removeClass('fa-align-justify ')
  $('.open-close-icon').addClass('fa-2x fa-x')
  let time = 500;
  for (let i = 0; i < 5; i++) {
    $('.links li').eq(i).animate({ top: 0 }, time)
    time = time + 100
  }
}
closeNav();
function closeNav() {
  let navTabWidth = $('.nav-tap').outerWidth();
  $('.side-nav-menu').animate({ left: -navTabWidth }, 500)
  $('.open-close-icon').removeClass('fa-2x fa-x')
  $('.open-close-icon').addClass('fa-align-justify ')
  $('.links li').animate({ top: 300 }, 500)
}


$('.nav-header .open-close-icon').on('click', function () {

  if ($('.side-nav-menu').css('left') == '0px') {
    closeNav();
  }
  else {
    openNav();
  }

})

/////////////////////////////////////////////////////


let allMeals = [];
async function searchByName(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  let data = await response.json();
  allMeals = data.meals;
  displayMeals(allMeals)
}
searchByName("");


function displayMeals(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 col-sm-6 col-md-4">
            <div onclick=getmealDetails('${arr[i].idMeal}') class="meal position-relative overflow-hidden rounded-2">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center justify-content-center">
                  <h3 class="">${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>`
  }
  rowData.innerHTML = cartoona;
}


async function getCategory() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let data = await response.json();
  // console.log(data.categories);
  displayCategory(data.categories);
}
function displayCategory(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
                <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                <div class="meal-layer position-absolute text-center">
                  <h3 class="">${arr[i].strCategory}</h3>
                  <p>${arr[i].strCategoryDescription.split(" ").slice(0, 10).join(" ")}</p>
                </div>
            </div>
        </div>`
  }
  rowData.innerHTML = cartoona;
}


async function getArea() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data = await response.json()
  // console.log(data.meals);
  displayArea(data.meals);
}
function displayArea(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
      <div onclick=getAreaMeals('${arr[i].strArea}') class="rounded-2 text-center">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3 class="">${arr[i].strArea}</h3>
      </div>

        
      </div>`
  }
  rowData.innerHTML = cartoona;
}


async function getIngredients() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let data = await response.json()
  // console.log(data.meals);
  displayIngredients(data.meals.slice(0,20));
}
function displayIngredients(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div onclick=getIngredientsMeals('${arr[i].strIngredient}') class="rounded-2 text-center">
         <i class="fa-solid fa-drumstick-bite fa-4x"></i>
         <h3 class="">${arr[i].strIngredient}</h3>
         <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
      </div>`
  }
  rowData.innerHTML = cartoona;
}




async function getCategoryMeals(category){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let data = await response.json();
  // console.log(data.meals);
  displayMeals(data.meals)
}

async function getAreaMeals(area){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let data = await response.json();
  // console.log(data.meals);
  displayMeals(data.meals)
}
async function getIngredientsMeals(Ingredients){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`)
  let data = await response.json();
  // console.log(data.meals);
  displayMeals(data.meals)
}


async function getmealDetails(mealID){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  let data = await response.json();
  displayMealDetails(data.meals[0])
}

function displayMealDetails(meal){
  let cartoona=`
        <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
      </div>
      <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          <li class="alert alert-info m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-info m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-info m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-info m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-info m-2 p-1">1 whole Chicken</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
          <li class="alert alert-danger m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-danger m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-danger m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-danger m-2 p-1">1 whole Chicken</li>
          <li class="alert alert-danger m-2 p-1">1 whole Chicken</li>
        </ul>

        <a href="${meal.strSource}" class="btn btn-success">Source</a>
        <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

      </div>`;
  rowData.innerHTML=cartoona;

}


function showSearchInput() {
  let cartoona =`

    <div class="row py-5">
      <div class="col-md-6">
        <input class="form-control bg-transparent" placeholder="Search by name" type="text">
      </div>
      <div class="col-md-6">
        <input class="form-control bg-transparent" placeholder="Search by first litter" type="text">
      </div>
    </div>
  `
  getElementById('searchContainer').innerHTML=cartoona;
  rowData.innerHTML='';
}









/////validation\\\\\\\
let nameInput = document.querySelector('#validName')
let emailInput = document.querySelector('#validEmail')
let phoneInput = document.querySelector('#validPhone')
let ageInput = document.querySelector('#validAge')
let passInput = document.querySelector('#validPass')
let repassInput = document.querySelector('#repass')

function validFotm(element) {
    let regex = {
        validName: /^[A-Za-z\s]+$/,
        validEmail: /^[a-zA-Z]+[0-9]*[@](gmail.com)$/,
        validPhone: /^01[0125][0-9]{8}$/,
        validAge: /^(1[6-9]|[2-9][0-9])$/,
        validPass: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }
    else {
        console.log('no match');
        element.classList.add('border-danger');
        element.nextElementSibling.classList.remove('opacity-0')
    }

    if (element.value == "") {
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }

}
function checkPass() {
    if (passInput.value == repassInput.value) {
        repassInput.classList.remove('border-danger');
        repassInput.nextElementSibling.classList.add('opacity-0')
    }
    else {
        repassInput.classList.add('border-danger');
        repassInput.nextElementSibling.classList.remove('opacity-0')
    }

    if (element.value == "") {
        element.classList.remove('border-danger');
        element.nextElementSibling.classList.add('opacity-0')
    }
}



function clearInputs() {
    nameInput.value = ""
    emailInput.value = ''
    phoneInput.value = ''
    ageInput.value = ''
    passInput.value = ''
    repassInput.value = ''

}

$(document).ready(function() {
  $('#contact i').on('click', function() {
      showHide();
  });

  function showHide() {
      var $icon = $('#contact i');
      var $input = $('#contact #validPass');
      
      if ($icon.hasClass('fa-eye')) {
          $icon.removeClass('fa-eye').addClass('fa-eye-slash');
          $input.attr('type', 'password');
      } else {
          $icon.removeClass('fa-eye-slash').addClass('fa-eye');
          $input.attr('type', 'text');
      }
  }
});

