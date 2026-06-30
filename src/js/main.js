const searchInput = document.getElementById("search-input");
const categoriesGrid = document.getElementById("categories-grid");
const allRecipesBtn = document.getElementById("all-recipes-btn");
const areasContainer = document.getElementById("areas-container");
const recipesGrid = document.getElementById("recipes-grid");
const logMealBtn = document.getElementById("log-meal-btn");
const logMealModal = document.getElementById("log-meal-modal");
const cancelLogMeal = document.getElementById("cancel-log-meal");

const servingsInput = document.getElementById("meal-servings");
const increaseServings = document.getElementById("increase-servings");
const decreaseServings = document.getElementById("decrease-servings");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const headerTitle = document.getElementById("header-title");
const headerText = document.getElementById("header-text");
const searchBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const barcodeInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const productCategories = document.getElementById("product-categories");
const nutriButtons = document.querySelectorAll(".nutri-score-filter");
const productsGrid = document.getElementById("products-grid");
let currentNutrition = null;
let currentView = "grid";
let currentMeals = [];
let currentProducts = [];
let currentMeal = null;
let currentProduct = null;

import {
  getAreas,
  getCategories,
  getMeals,
  getMealsByArea,
  getMealsByCategory,
  getMealsById,
  getNutrition,
  getProductByBarcode,
  getProductCategories,
  getProductsByCategory,
  searchProducts,
} from "./api.js";
import {
  closeModal,
  displayAreas,
  displayCategories,
  displayCount,
  displayMealDetails,
  displayMeals,
  displayNutrations,
  displayProductCategories,
  displayProducts,
  displayProductsCount,
  fillLogMealModal,
  fillProductModal,
  openModal,
  openProductModal,
  showDetailsSection,
  showEmpty,
  showEmptyProducts,
  showLoading,
  showRecipesSection,
} from "./ui/components.js";

import * as FoodLog from "./foodlog.js";
import { addToFoodLog } from "./foodlog.js";
// toast alert
import { Toast } from "./foodlog.js";

// responsive sidebar
// Responsive Sidebar
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const menuBtn = document.getElementById("header-menu-btn");
const closeBtn = document.getElementById("sidebar-close-btn");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
  document.body.classList.add("overflow-hidden");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  document.body.classList.remove("overflow-hidden");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);

displayProductCategories;
async function allRecipes() {
  showLoading(recipesGrid);
  const data = await getMeals();
  currentMeals = data.results;
  displayMeals(currentMeals, currentView);
  if (data.results.length === 0) {
    showEmpty();
    return;
  }

  //   display category
  const category = await getCategories();
  displayCategories(category.results);
  //   diaplay areas
  const areas = await getAreas();
  displayAreas(areas.results);
  displayCount(data.results.length, " ");
}
allRecipes();


// events
function filterMeals(query, meals) {
  const q = query.toLowerCase().trim();

  return meals.filter((meal) => {
    return (
      meal.name?.toLowerCase().includes(q) ||
      meal.category?.toLowerCase().includes(q) ||
      meal.area?.toLowerCase().includes(q)
    );
  });
}
async function searchMeals() {
  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    displayMeals(currentMeals, currentView);
    displayCount(currentMeals.length, "");
    return;
  }

  showLoading(recipesGrid);

  let filtered = filterMeals(searchValue, currentMeals);

  if (filtered.length === 0) {
    const data = await getMeals(searchValue);
    filtered = data.results;
  }

  if (!filtered || filtered.length === 0) {
    showEmpty();
    displayCount(0, "");
    return;
  }

  displayMeals(filtered, currentView);
  displayCount(filtered.length, `for "${searchValue}"`);
}

searchInput.addEventListener("input", searchMeals);

categoriesGrid.addEventListener("click", async function (e) {
  const card = e.target.closest(".category-card");

  if (!card) return;

  const category = card.dataset.category;

  showLoading(recipesGrid);
  const meals = await getMealsByCategory(category);
  if (meals.length === 0) {
    showEmpty();
    return;
  }

  currentMeals = meals;
  displayMeals(currentMeals, currentView);
  displayCount(meals.length, category);
});

allRecipesBtn.addEventListener("click", allRecipes);

areasContainer.addEventListener("click", async function (e) {
  const button = e.target.closest("button");

  if (!button) return;

  document.querySelectorAll("#areas-container button").forEach((btn) => {
    btn.classList.remove("bg-emerald-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700");
  });

  button.classList.remove("bg-gray-100", "text-gray-700");
  button.classList.add("bg-emerald-600", "text-white");

  const area = button.dataset.area;
  showLoading(recipesGrid);
  if (area === "all") {
    const data = await getMeals();
    if (data.results.length === 0) {
      showEmpty();
      displayCount(0, "");
      return;
    }
    currentMeals = data.results;
    displayMeals(currentMeals, currentView);
    displayCount(data.results.length, " ");
  } else {
    const meals = await getMealsByArea(area);
    if (meals.length === 0) {
      showEmpty();
      displayCount(0, area);
      return;
    }
    currentMeals = meals;
    displayMeals(currentMeals, currentView);
    displayCount(meals.length, area);
  }
});


recipesGrid.addEventListener("click", async function (e) {
  const card = e.target.closest(".recipe-card");

  if (!card) return;

  try {

    const mealId = card.dataset.mealId;

    const meal = await getMealsById(mealId);

    currentMeal = meal;

    displayMealDetails(meal);
    const detailLink = meal.name.toLowerCase().replace(/\s+/g, "-");

    history.pushState({}, "", `#meal/${detailLink}`);
    const nutrition = await getNutrition(meal);

    displayNutrations(nutrition);

    currentNutrition = nutrition;

    fillLogMealModal(meal, nutrition);

    showDetailsSection();

    logMealBtn.onclick = openLogMealModal;
  } catch (error) {
    console.log(error);
  }
});

const backBtn = document.getElementById("back-to-meals-btn");

backBtn.addEventListener("click", function () {
  history.pushState({}, "", "#home");
  showRecipesSection();
});

// log meal
function openLogMealModal() {
  logMealModal.classList.remove("hidden");
  logMealModal.classList.add("flex");
}

function closeLogMealModal() {
  logMealModal.classList.add("hidden");
  logMealModal.classList.remove("flex");
}
cancelLogMeal.addEventListener("click", closeLogMealModal);
logMealModal.addEventListener("click", function (e) {
  if (e.target === logMealModal) {
    closeLogMealModal();
  }
});

const confirmLogMeal = document.getElementById("confirm-log-meal");

confirmLogMeal.addEventListener("click", function () {
  const servings = Number(servingsInput.value);
    const calories = Math.round(currentNutrition.perServing.calories * servings);


  addToFoodLog({
    ...currentMeal,
    perServing: currentNutrition.perServing,
    servings,
  });

  Swal.fire({
  icon: "success",
  title: "Meal Logged!",
  html: `
    <b>${currentMeal.name}</b> (${servings} ${
      servings === 1 ? "serving" : "servings"
    }) has been added <br> to your daily log.<br>
    <span style="color:#16a34a">+${calories} calories</span>
  `,
  timer: 1500,
  showConfirmButton: false,
});
  closeLogMealModal();
});
function updateNutritionPreview() {
  const servings = Number(servingsInput.value);

  document.getElementById("modal-calories").textContent = Math.round(
    currentNutrition.perServing.calories * servings,
  );

  document.getElementById("modal-protein").textContent =
    Math.round(currentNutrition.perServing.protein * servings) + "g";

  document.getElementById("modal-carbs").textContent =
    Math.round(currentNutrition.perServing.carbs * servings) + "g";

  document.getElementById("modal-fat").textContent =
    Math.round(currentNutrition.perServing.fat * servings) + "g";
}

// increasing BTN
increaseServings.addEventListener("click", function () {
  servingsInput.stepUp();

  updateNutritionPreview();
});
// Decreasing BTN
decreaseServings.addEventListener("click", function () {
  if (Number(servingsInput.value) > 0.5) {
    servingsInput.stepDown();

    updateNutritionPreview();
  }
});
//  when user input
servingsInput.addEventListener("input", function () {
  if (Number(servingsInput.value) < 0.5) {
    servingsInput.value = 0.5;
  }

  updateNutritionPreview();
});

// view
gridViewBtn.addEventListener("click", () => {
  currentView = "grid";

  displayMeals(currentMeals, currentView);

  gridViewBtn.classList.add("bg-white", "shadow-sm");
  listViewBtn.classList.remove("bg-white", "shadow-sm");
});

listViewBtn.addEventListener("click", () => {
  currentView = "list";

  displayMeals(currentMeals, currentView);

  listViewBtn.classList.add("bg-white", "shadow-sm");
  gridViewBtn.classList.remove("bg-white", "shadow-sm");
});

// nav links
const routes = {
  "main-section": "#home",
  "products-section": "#products",
  "foodlog-section": "#foodlog",
};

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll(
  "#main-section, #products-section, #foodlog-section",
);

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Hide all sections
    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    // Show target section
    const target = document.getElementById(this.dataset.section);

    if (target) {
      target.classList.remove("hidden");
      history.pushState({}, "", routes[target.id]);

      if (target.id === "main-section") {
        headerTitle.textContent = "Meals & Recipes";
        headerText.textContent =
          "Discover healthy recipes tailored to your lifestyle.";
      }

      if (target.id === "products-section") {
        headerTitle.textContent = "Product Scanner";
        headerText.textContent = "Search packaged foods by name or barcode";
        showEmptyProducts();
      }

      if (target.id === "foodlog-section") {
        headerTitle.textContent = "Food Log";
        headerText.textContent = "Track your daily meals and nutrition.";
        FoodLog.renderFoodLog();
      }
    }

    // Active link UI
    navLinks.forEach((item) => {
      item.classList.remove("bg-emerald-50", "text-emerald-700");
      item.classList.add("text-gray-600");
    });

    this.classList.add("bg-emerald-50", "text-emerald-700");
    this.classList.remove("text-gray-600");

    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  });
});

const hash = window.location.hash;

if (hash === "#products") {
  document.querySelector('[data-section="products-section"]').click();
} else if (hash === "#foodlog") {
  document.querySelector('[data-section="foodlog-section"]').click();
} else {
  document.querySelector('[data-section="main-section"]').click();
}

// products
async function loadProducts() {
  showLoading(productsGrid);
  const data = await searchProducts(productSearchInput.value);
  const products = data.results;

  if (products.length === 0) {
    showEmptyProducts();
    displayProductsCount(0);
    return;
  }

  currentProducts = products; 
  displayProducts(products);
  displayProductsCount(products.length, productSearchInput.value);
}

searchBtn.addEventListener("click", loadProducts);

productSearchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    loadProducts();
  }
});

const modal = document.getElementById("product-detail-modal");

// close button
document.querySelector(".close-product-modal").addEventListener("click", () => {
  closeModal(modal);
});

// click outside
modal.addEventListener("click", (e) => {
  if (e.target.id === "product-detail-modal") {
    closeModal(modal);
  }
});

async function lookupBarcode() {
  showLoading(productsGrid);
  const barcode = barcodeInput.value.trim();

  if (!barcode) return;

  try {
    const product = await getProductByBarcode(barcode);

    if (!product) {
      showEmptyProducts();
      displayProductsCount(0);
      return;
    }

    currentProducts = [product];

    displayProducts(currentProducts);
    displayProductsCount(1, barcode);
  } catch (error) {
    console.log(error);

    showEmptyProducts();
    displayProductsCount(0);
  }
}
lookupBarcodeBtn.addEventListener("click", lookupBarcode);

barcodeInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    lookupBarcode();
  }
});

async function loadProductCategories() {
  const categories = await getProductCategories();

  displayProductCategories(categories);
}

loadProductCategories();

productCategories.addEventListener("click", async (e) => {
  const btn = e.target.closest(".product-category-btn");
  if (!btn) return;

  nutriButtons.forEach((button) => {
    button.classList.remove("ring-2", "ring-gray-900");
  });

  nutriButtons[0].classList.add("ring-2", "ring-gray-900");
  document.querySelectorAll(".product-category-btn").forEach((button) => {
    button.classList.remove("shadow-xl", "scale-105", "brightness-110");
  });

  btn.classList.add("shadow-xl", "scale-105", "brightness-110");

  showLoading(productsGrid);

  try {
    const products = await getProductsByCategory(btn.dataset.category);

    currentProducts = products;
    displayProducts(products);
    displayProductsCount(products.length, btn.textContent.trim());
  } catch (error) {
    console.error(error);
    showEmptyProducts();
    displayProductsCount(0, btn.textContent.trim());
  }
});

nutriButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    nutriButtons.forEach((button) => {
      button.classList.remove("ring-2", "ring-gray-900");
    });

    btn.classList.add("ring-2", "ring-gray-900");

    const grade = btn.dataset.grade;

    if (grade === "") {
      displayProducts(currentProducts);
      displayProductsCount(currentProducts.length);
      return;
    }

    const filtered = currentProducts.filter(
      (product) =>
        product.nutritionGrade &&
        product.nutritionGrade.toLowerCase() === grade,
    );

    displayProducts(filtered);
    displayProductsCount(filtered.length, grade.toUpperCase());
  });
});


productsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");

  if (!card) return;

  const barcode = card.dataset.barcode;

  currentProduct = currentProducts.find((p) => p.barcode === barcode);

  openProductModal(currentProduct);
});
const productAddBtn = document.getElementById("product-add-btn");

productAddBtn.onclick = () => {
  if (!currentProduct) return;

  addToFoodLog({
    ...currentProduct,
    servings: 1,
  });
  FoodLog.renderFoodLog();
  Toast.fire({
    title: `${currentProduct.name} logged to your daily intake! 📝`,
    background: "#16916c",
    color: "#fff",
  });
};


// loading
window.addEventListener("load", function () {
  console.log("window loaded");

  const loader = document.getElementById("app-loading-overlay");
  console.log(loader);

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
});

document.querySelectorAll(".close-product-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(modal);
  });
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal(modal);
  }
});