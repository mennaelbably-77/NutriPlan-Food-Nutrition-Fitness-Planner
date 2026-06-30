const recipesGrid = document.getElementById("recipes-grid");
const categoriesGrid = document.getElementById("categories-grid");
const areasContainer = document.getElementById("areas-container");
const recipesCount = document.getElementById("recipes-count");
const detailImg = document.getElementById("detail-img");
const detailCategory = document.getElementById("detail-category");
const detailArea = document.getElementById("detail-area");
const detailBadge = document.getElementById("detail-4-badge");
const detailTitle = document.getElementById("detail-title");
const heroCalories = document.getElementById("hero-calories");
const heroServings = document.getElementById("hero-servings");
const ingredientsContainer = document.getElementById("ingredients-container");
const ingredientsCount = document.getElementById("ingredients-count");
const instructionsContainer = document.getElementById("instructions-container");
const detailTags = document.getElementById("detail-tags");
const detailVideo = document.getElementById("video-detail");

const caloriesPerServings = document.getElementById("calories-per-servings");
const logMealContainer = document.getElementById("log-meal-container");
const protien = document.getElementById("protein");
const carbs = document.getElementById("carbs");
const fat = document.getElementById("fat");
const fiber = document.getElementById("fiber");
const sugar = document.getElementById("sugar");

const recipesSection = document.getElementById("all-recipes-section");
const detailsSection = document.getElementById("meal-details");
const searchSection = document.getElementById("search-filters-section");
const categorySection = document.getElementById("meal-categories-section");

const headerTitle = document.getElementById("header-title");
const headerText = document.getElementById("header-text");
const productCategories = document.getElementById("product-categories");
const saturatedFat = document.getElementById("saturated-fat");
const cholesterol = document.getElementById("cholesterol");
const sodium = document.getElementById("sodium");
const proteinProgress = document.getElementById("protein-progress");
const carbsProgress = document.getElementById("carbs-progress");
const fatProgress = document.getElementById("fat-progress");
const fiberProgress = document.getElementById("fiber-progress");
const sugarProgress = document.getElementById("sugar-progress");
const saturatedFatProgress = document.getElementById("saturated-fat-progress");

import { addToFoodLog } from "../foodlog.js";
export function displayMeals(meals, view = "grid") {
  recipesGrid.textContent = "";

  if (view === "grid") {
    recipesGrid.className = "grid grid-cols-4 gap-5";
  } else {
    recipesGrid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";
  }

  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.dataset.mealId = meal.id;

    // LIST VIEW
    if (view === "list") {
      card.className =
        "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-row h-40";

// image
        const imageContainer = document.createElement("div");
      imageContainer.className = "relative overflow-hidden w-48 h-full";

      const image = document.createElement("img");
      image.src = meal.thumbnail;
      image.alt = meal.name;
      image.loading = "lazy";
      image.className =
        "w-full h-full object-cover transition-transform duration-300";

      // Search Icon
      const searchIcon = document.createElement("div");
      searchIcon.className =
        "absolute right-2 top-1/2 -translate-y-1/2 hidden z-30";

      searchIcon.innerHTML = `
        <div class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 7V4h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 17v3h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M20 17v3h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
      `;

      imageContainer.addEventListener("mouseenter", () => {
        searchIcon.classList.remove("hidden");
        image.classList.add("scale-105");
      });

      imageContainer.addEventListener("mouseleave", () => {
        searchIcon.classList.add("hidden");
        image.classList.remove("scale-105");
      });

      searchIcon.addEventListener("click", (e) => {
        e.stopPropagation();

        window.open(
          `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
            meal.name
          )}`,
          "_blank"
        );
      });

      imageContainer.append(image, searchIcon);

      //BODY 
      const body = document.createElement("div");
      body.className = "p-4 flex-1";

      const title = document.createElement("h3");
      title.className =
        "text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1";
      title.textContent = meal.name;

      const description = document.createElement("p");
      description.className = "text-xs text-gray-600 mb-3 line-clamp-2";
      description.textContent =
        meal.instructions.join(" ").slice(0, 170) + "...";

      const spacer = document.createElement("div");
      spacer.className = "flex-1";

      const footer = document.createElement("div");
      footer.className = "flex items-center justify-between text-xs";

      const category = document.createElement("div");
      category.className = "font-semibold text-gray-900";
      category.innerHTML = `
        <i class="fa-solid fa-utensils text-emerald-600"></i>
        <span>${meal.category}</span>
      `;

      const area = document.createElement("div");
      area.className = "font-semibold text-gray-500";
      area.innerHTML = `
        <i class="fa-solid fa-globe text-blue-500"></i>
        <span>${meal.area}</span>
      `;

      footer.append(category, area);

      body.append(title, description, spacer, footer);

      card.append(imageContainer, body);
      recipesGrid.append(card);

      return;
    }

    // GRID VIEW
    card.className =
      "recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group";

    // IMAGE CONTAINER
    const imageContain = document.createElement("div");
    imageContain.className = "relative h-48 overflow-hidden";

    const image = document.createElement("img");
    image.src = meal.thumbnail;
    image.alt = meal.name;
    image.loading = "lazy";
    image.className =
      "w-full h-full object-cover transition-transform duration-300";

    // Search Icon
    const searchIcon = document.createElement("div");
    searchIcon.className =
      "absolute right-2 top-1/2 -translate-y-1/2 hidden z-30";

    searchIcon.innerHTML = `
      <div class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 7V4h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 17v3h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M20 17v3h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    `;

    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();

      window.open(
        `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
          meal.name
        )}`,
        "_blank"
      );
    });

    imageContain.addEventListener("mouseenter", () => {
      searchIcon.classList.remove("hidden");
      image.classList.add("scale-110");
    });

    imageContain.addEventListener("mouseleave", () => {
      searchIcon.classList.add("hidden");
      image.classList.remove("scale-110");
    });

    // BADGES
    const badgesContainer = document.createElement("div");
    badgesContainer.className = "absolute bottom-3 left-3 flex gap-2";

    const categoryBadge = document.createElement("span");
    categoryBadge.className =
      "px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700";
    categoryBadge.textContent = meal.category;

    const areaBadge = document.createElement("span");
    areaBadge.className =
      "px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white";
    areaBadge.textContent = meal.area;

    badgesContainer.append(categoryBadge, areaBadge);

    imageContain.append(image, badgesContainer, searchIcon);

    // BODY
    const cardBody = document.createElement("div");
    cardBody.className = "p-4";

    const title = document.createElement("h3");
    title.className =
      "text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1";
    title.textContent = meal.name;

    const description = document.createElement("p");
    description.className = "text-xs text-gray-600 mb-3 line-clamp-2";
    description.textContent =
      meal.instructions?.[0] || "Delicious homemade recipe.";

    const bottomBadge = document.createElement("div");
    bottomBadge.className = "flex items-center justify-between text-xs";

    const categoryInfo = document.createElement("span");
    categoryInfo.className = "font-semibold text-gray-900";
    categoryInfo.innerHTML = `
      <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
      ${meal.category}
    `;

    const areaInfo = document.createElement("span");
    areaInfo.className = "font-semibold text-gray-500";
    areaInfo.innerHTML = `
      <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
      ${meal.area}
    `;

    bottomBadge.append(categoryInfo, areaInfo);

    cardBody.append(title, description, bottomBadge);

    card.append(imageContain, cardBody);

    recipesGrid.append(card);
  });
}
export function displayCategories(categories) {
  categoriesGrid.textContent = "";

  categories.slice(0, 12).forEach((category) => {
    const config = categoryConfig[category.name];

    const card = document.createElement("div");
    card.classList.add(
      "category-card",
      "bg-gradient-to-br",
      ...config.colors,
      "rounded-xl",
      "p-3",
      "border",
      "cursor-pointer",
      "transition-all",
      "group",
    );

    card.dataset.category = category.name;

    const container = document.createElement("div");
    container.classList.add("flex", "items-center", "gap-2.5");

    const iconBox = document.createElement("div");
    iconBox.classList.add(
      "w-9",
      "h-9",
      "rounded-lg",
      "flex",
      "items-center",
      "justify-center",
      "text-white",
      "bg-gradient-to-br",
      ...config.iconBox,
    );

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", config.icon);

    const title = document.createElement("h3");
    title.classList.add("text-sm", "font-bold", "text-gray-900");
    title.textContent = category.name;

    iconBox.append(icon);
    container.append(iconBox, title);
    card.append(container);

    categoriesGrid.append(card);
  });
}

// icon and color of iconbox
const categoryConfig = {
  Beef: {
    icon: "fa-drumstick-bite",
    colors: [
      "from-rose-50",
      "to-red-50",
      "border-rose-200",
      "hover:border-rose-400",
    ],
    iconBox: ["from-rose-400", "to-red-500"],
  },

  Chicken: {
    icon: "fa-drumstick-bite",
    colors: [
      "from-amber-50",
      "to-orange-50",
      "border-amber-200",
      "hover:border-amber-400",
    ],
    iconBox: ["from-amber-400", "to-orange-500"],
  },
  Lamb: {
    icon: "fa-drumstick-bite",
    colors: [
      "from-amber-50",
      "to-orange-50",
      "border-amber-200",
      "hover:border-amber-400",
    ],
    iconBox: ["from-amber-400", "to-orange-500"],
  },

  Dessert: {
    icon: "fa-cake-candles",
    colors: [
      "from-pink-50",
      "to-rose-50",
      "border-pink-200",
      "hover:border-pink-400",
    ],
    iconBox: ["from-pink-400", "to-rose-500"],
  },

  Seafood: {
    icon: "fa-fish",
    colors: [
      "from-cyan-50",
      "to-blue-50",
      "border-cyan-200",
      "hover:border-cyan-400",
    ],
    iconBox: ["from-cyan-400", "to-blue-500"],
  },

  Pasta: {
    icon: "fa-bowl-food",
    colors: [
      "from-amber-50",
      "to-orange-50",
      "border-amber-200",
      "hover:border-amber-400",
    ],
    iconBox: ["from-amber-400", "to-orange-500"],
  },

  Pork: {
    icon: "fa-bacon",
    colors: [
      "from-rose-50",
      "to-red-50",
      "border-rose-200",
      "hover:border-rose-400",
    ],
    iconBox: ["from-rose-400", "to-red-500"],
  },

  Side: {
    icon: "fa-plate-wheat",
    colors: [
      "from-green-50",
      "to-emerald-50",
      "border-green-200",
      "hover:border-green-400",
    ],
    iconBox: ["from-green-400", "to-emerald-500"],
  },

  Starter: {
    icon: "fa-utensils",
    colors: [
      "from-teal-50",
      "to-cyan-50",
      "border-teal-200",
      "hover:border-teal-400",
    ],
    iconBox: ["from-teal-400", "to-cyan-500"],
  },

  Miscellaneous: {
    icon: "fa-bowl-rice",
    colors: [
      "from-slate-50",
      "to-gray-50",
      "border-slate-200",
      "hover:border-slate-400",
    ],
    iconBox: ["from-slate-400", "to-gray-500"],
  },

  Vegan: {
    icon: "fa-leaf",
    colors: [
      "from-emerald-50",
      "to-green-50",
      "border-emerald-200",
      "hover:border-emerald-400",
    ],
    iconBox: ["from-emerald-400", "to-green-500"],
  },

  Vegetarian: {
    icon: "fa-seedling",
    colors: [
      "from-lime-50",
      "to-green-50",
      "border-lime-200",
      "hover:border-lime-400",
    ],
    iconBox: ["from-lime-400", "to-green-500"],
  },
};
export function displayAreas(areas) {
  areasContainer.textContent = "";

  //  All Cuisines Button 
  const allBtn = document.createElement("button");

  allBtn.classList.add(
    "px-4",
    "py-2",
    "bg-emerald-600",
    "text-white",
    "rounded-full",
    "font-medium",
    "text-sm",
    "whitespace-nowrap",
    "hover:bg-emerald-700",
    "hover:scale-110",
    "transition",
    "duration-300",
    "ease-in-out",
  );

  allBtn.textContent = "All Cuisines";
  allBtn.dataset.area = "all";

  areasContainer.append(allBtn);

areas.slice(0, 13).forEach((area) => {
      const button = document.createElement("button");

    button.classList.add(
      "px-4",
      "py-2",
      "bg-gray-100",
      "text-gray-700",
      "rounded-full",
      "font-medium",
      "text-sm",
      "whitespace-nowrap",
      "hover:bg-gray-200",
      "hover:scale-110",
      "transition",
      "duration-300",
      "ease-in-out",
    );

    button.textContent = area.name;
    button.dataset.area = area.name;

    areasContainer.append(button);
  });
}

// show loading
export function showLoading(container) {
  container.textContent = "";

  const loading = document.createElement("div");
  loading.classList.add(
    "col-span-full",
    "flex",
    "items-center",
    "justify-center",
    "py-12",
  );

  const spinner = document.createElement("div");
  spinner.classList.add(
    "animate-spin",
    "rounded-full",
    "h-12",
    "w-12",
    "border-b-2",
    "border-emerald-600",
  );

  loading.append(spinner);
  container.append(loading);
}

// show empty
export function showEmpty() {
  recipesGrid.textContent = "";

  const container = document.createElement("div");
  container.classList.add(
    "col-span-full",
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "py-12",
    "text-center",
  );

  const iconContainer = document.createElement("div");
  iconContainer.classList.add(
    "w-16",
    "h-16",
    "bg-gray-100",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "mb-4",
  );

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-search", "text-gray-400", "text-2xl");

  const title = document.createElement("p");
  title.classList.add("text-gray-500", "text-lg");
  title.textContent = "No recipes found";

  const text = document.createElement("p");
  text.classList.add("text-gray-400", "text-sm", "mt-2");
  text.textContent = "Try searching for something else";

  iconContainer.append(icon);
  container.append(iconContainer, title, text);

  recipesGrid.append(container);
}
export function displayCount(count, title) {
  recipesCount.textContent = `Showing ${count}${title} recipes`;
}

// meal details
export function displayMealDetails(detail) {
  detailImg.src = detail.thumbnail;
  detailImg.alt = detail.name;
  detailCategory.textContent = detail.category;
  detailArea.textContent = detail.area;
  detailTitle.textContent = detail.name;
  //   tags
  displayTags(detail.tags);

  // ingredients
  displayIngredients(detail.ingredients);
  //   instructions
  displayInstructions(detail.instructions);
  // video
  if (detail.youtube) {
    detailVideo.src = detail.youtube.replace("watch?v=", "embed/");
  } else {
    detailVideo.src = "";
  }
}
export function displayIngredients(ingredients) {
  ingredientsContainer.textContent = "";
  ingredientsCount.textContent = `${ingredients.length} items`;

  ingredients.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className =
      "ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300";

    const span = document.createElement("span");
    span.className = "text-gray-700";

    const measure = document.createElement("span");
    measure.className = "font-medium text-gray-900";
    measure.textContent = item.measure;

    span.append(measure);
    span.append(" " + item.ingredient);

    card.append(checkbox);
    card.append(span);

    ingredientsContainer.append(card);
  });
}

export function displayInstructions(instructions) {
  instructionsContainer.textContent = "";
  instructions.forEach((instruction, index) => {
    const card = document.createElement("div");
    card.className =
      "flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors";
    const number = document.createElement("div");
    number.className =
      "w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0";
    number.textContent = index + 1;
    const paragraph = document.createElement("p");
    paragraph.className = "text-gray-700 leading-relaxed pt-2";
    paragraph.textContent = instruction;
    card.append(number, paragraph);
    instructionsContainer.append(card);
  });
}
export function displayTags(tags) {
  detailTags.textContent = "";
  if (!tags || tags.length === 0) {
    return;
  }
  tags.forEach((tag) => {
    const span = document.createElement("span");

    span.className =
      "px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full";

    span.textContent = tag;

    detailTags.append(span);
  });
}
export function displayNutrations(nutration) {
  const perServing = nutration.perServing;

  caloriesPerServings.textContent = Math.round(perServing.calories);

  protien.textContent = `${Math.round(perServing.protein)}g`;

  carbs.textContent = `${Math.round(perServing.carbs)}g`;

  fat.textContent = `${Math.round(perServing.fat)}g`;

  fiber.textContent = `${Math.round(perServing.fiber)}g`;

  sugar.textContent = `${Math.round(perServing.sugar)}g`;

  heroCalories.textContent = `${Math.round(perServing.calories)} cal/serving`;


  saturatedFat.textContent = `${Math.round(perServing.saturatedFat)}g`;

  cholesterol.textContent = `${Math.round(perServing.cholesterol)}mg`;

  sodium.textContent = `${Math.round(perServing.sodium)}mg`;

  // Progress Bar
  proteinProgress.style.width = `${Math.min((perServing.protein / 50) * 100, 100)}%`;

carbsProgress.style.width = `${Math.min((perServing.carbs / 300) * 100, 100)}%`;

fatProgress.style.width = `${Math.min((perServing.fat / 65) * 100, 100)}%`;

fiberProgress.style.width = `${Math.min((perServing.fiber / 25) * 100, 100)}%`;

sugarProgress.style.width = `${Math.min((perServing.sugar / 50) * 100, 100)}%`;

saturatedFatProgress.style.width = `${Math.min((perServing.saturatedFat / 20) * 100, 100)}%`;
 
}

export function showDetailsSection() {
  recipesSection.classList.add("hidden");

  searchSection.classList.add("hidden");
  categorySection.classList.add("hidden");

  headerTitle.textContent = "Recipe Details";
  headerText.textContent = "View full recipe information and nutrition facts";

  detailsSection.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function showRecipesSection() {
  detailsSection.classList.add("hidden");

  recipesSection.classList.remove("hidden");

  searchSection.classList.remove("hidden");
  categorySection.classList.remove("hidden");

  headerTitle.textContent = "Meals & Recipes";
  headerText.textContent =
    "Discover delicious and nutritious recipes tailored for you";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// log meal
export function fillLogMealModal(meal, nutrition) {
  document.getElementById("modal-image").src = meal.thumbnail;

  document.getElementById("modal-image").alt = meal.name;

  document.getElementById("modal-title").textContent = meal.name;

  document.getElementById("modal-calories").textContent =
    nutrition.perServing.calories;

  document.getElementById("modal-protein").textContent =
    nutrition.perServing.protein + "g";

  document.getElementById("modal-carbs").textContent =
    nutrition.perServing.carbs + "g";

  document.getElementById("modal-fat").textContent =
    nutrition.perServing.fat + "g";

  document.getElementById("meal-servings").value = 1;
}

// product scanner
const productsGrid = document.getElementById("products-grid");

function getNutriColor(grade) {
  switch ((grade || "").toLowerCase()) {
    case "a":
      return "bg-green-500";
    case "b":
      return "bg-lime-500";
    case "c":
      return "bg-yellow-500";
    case "d":
      return "bg-orange-500";
    case "e":
      return "bg-red-600";
    default:
      return "bg-gray-400";
  }
}

function getNovaColor(nova) {
  switch (Number(nova)) {
    case 1:
      return "bg-green-600";
    case 2:
      return "bg-lime-500";
    case 3:
      return "bg-yellow-500";
    case 4:
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
}
export function displayProducts(products) {
  productsGrid.innerHTML = "";

  productsGrid.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5";

  products.forEach((product) => {
console.log(product.novaGroup, typeof product.novaGroup);

    const card = document.createElement("div");
    card.className =
      "product-card relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer";
    card.dataset.barcode = product.barcode || "";

    //  CLICK (MODAL + GOOGLE SEARCH) 
    card.addEventListener("click", () => {
      openProductModal(product);
    });

    // VISUAL SEARCH ICON
    const searchIcon = document.createElement("div");
 searchIcon.className =
  "absolute right-2 top-1/2 -translate-y-1/2 hidden z-30";
  searchIcon.innerHTML = `
<div class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M4 7V4h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 7V4h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M4 17v3h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 17v3h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
  </svg>
</div>
`;

    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();

      const query = `${product.name || ""} ${product.brand || ""}`;

      window.open(
        `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`,
        "_blank",
      );
    });

    // IMAGE 
    const imageContainer = document.createElement("div");
    imageContainer.className =
  "relative h-40 bg-gray-100 overflow-hidden";
  const img = document.createElement("img");
    imageContainer.addEventListener("mouseenter", () => {
      searchIcon.classList.remove("hidden");
      img.classList.add("scale-110");
    });

    imageContainer.addEventListener("mouseleave", () => {
      searchIcon.classList.add("hidden");
      img.classList.remove("scale-110");
    });
    img.src = product.image || "";
    img.alt = product.name || "Product";
    img.loading = "lazy";
   img.className =
  "absolute inset-0 m-auto w-full h-full object-contain transition-transform duration-300";
   // Nutri-score badge
    const nutriBadge = document.createElement("div");
    nutriBadge.className = `absolute top-2 left-2 ${getNutriColor(
      product.nutritionGrade,
    )} text-white text-xs font-bold px-2 py-1 rounded uppercase`;
    nutriBadge.textContent = `Nutri-Score ${product.nutritionGrade || "-"}`;

    // NOVA badge
    const novaBadge = document.createElement("div");
   novaBadge.className = `absolute top-2 right-2 z-40 ${getNovaColor(
  product.novaGroup,
)} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center`;  novaBadge.title = `NOVA ${product.novaGroup || "-"}`;
    novaBadge.textContent = product.novaGroup || "-";

    imageContainer.append(img, nutriBadge, novaBadge, searchIcon);
    //CONTENT 
    const content = document.createElement("div");
    content.className = "p-4";

    const brand = document.createElement("p");
    brand.className = "text-xs text-emerald-600 font-semibold mb-1 truncate";
    brand.textContent = product.brand || "Unknown brand";

    const name = document.createElement("h3");
    name.className =
      "font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors";
    name.textContent = product.name || "Unknown product";

    // meta row
    const meta = document.createElement("div");
    meta.className = "flex items-center gap-3 text-xs text-gray-500 mb-3";

    const kcal = document.createElement("span");
    kcal.innerHTML = `<i class="fa-solid fa-fire mr-1"></i>${
      product.nutrients?.calories || 0
    } kcal/100g`;

    meta.append(kcal);

    //  MINI NUTRITION
    const nutritionGrid = document.createElement("div");
    nutritionGrid.className = "grid grid-cols-4 gap-1 text-center";

    const n = product.nutrients || {};

    const proteinBox = document.createElement("div");
    proteinBox.className = "bg-emerald-50 rounded p-1.5";
    proteinBox.innerHTML = `
      <p class="text-xs font-bold text-emerald-700">${
        formatGram(n.protein) || 0
      }</p>
      <p class="text-[10px] text-gray-500">Protein</p>
    `;

    const carbsBox = document.createElement("div");
    carbsBox.className = "bg-blue-50 rounded p-1.5";
    carbsBox.innerHTML = `
      <p class="text-xs font-bold text-blue-700">${formatGram(n.carbs) || 0}</p>
      <p class="text-[10px] text-gray-500">Carbs</p>
    `;

    const fatBox = document.createElement("div");
    fatBox.className = "bg-purple-50 rounded p-1.5";
    fatBox.innerHTML = `
      <p class="text-xs font-bold text-purple-700">${formatGram(n.fat) || 0}</p>
      <p class="text-[10px] text-gray-500">Fat</p>
    `;

    const sugarBox = document.createElement("div");
    sugarBox.className = "bg-orange-50 rounded p-1.5";
    sugarBox.innerHTML = `
      <p class="text-xs font-bold text-orange-700">${formatGram(n.sugar) || 0}</p>
      <p class="text-[10px] text-gray-500">Sugar</p>
    `;

    nutritionGrid.append(proteinBox, carbsBox, fatBox, sugarBox);

    content.append(brand, name, meta, nutritionGrid);

    card.append(imageContainer, content);

    productsGrid.append(card);
  });
}

export function showEmptyProducts() {
  productsGrid.innerHTML = "";
  productsGrid.className = "grid grid-cols-1";
  // container
  const empty = document.createElement("div");
  empty.className = "col-span-full flex justify-center items-center py-12";

  // text center
  const content = document.createElement("div");
  content.className = "text-center";

  // circle
  const circle = document.createElement("div");
  circle.className =
    "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4";

  // icon
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-box-open text-3xl text-gray-400";

  // title
  const title = document.createElement("p");
  title.className = "text-gray-500 text-lg mb-2";
  title.textContent = "No products to display";

  // subtitle
  const subtitle = document.createElement("p");
  subtitle.className = "text-gray-400 text-sm";
  subtitle.textContent = "Search for a product or browse by category";

  circle.appendChild(icon);
  content.append(circle, title, subtitle);
  empty.appendChild(content);

  productsGrid.appendChild(empty);
}

const productsCount = document.getElementById("products-count");

export function displayProductsCount(count, searchValue = "") {
  if (count == -1) {
    productsCount.textContent = "Search for products to see results";
  } else if (count == 0) {
    productsCount.textContent = `No products found for ${searchValue}`;
  } else {
    productsCount.textContent = `Found ${count} products for "${searchValue}"`;
  }
}

// product modal
const modal = document.getElementById("product-detail-modal");

export function openModal(modal) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeModal(modal) {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
export function formatGram(value) {
  if (value == null) return "0 g";
  return `${Number(value).toFixed(1).replace(".0", "")} g`;
}

export function fillProductModal(product) {
  document.getElementById("product-modal-img").src = product.image;

  document.getElementById("product-modal-brand").textContent =
    product.brand || "Unknown Brand";

  document.getElementById("product-modal-name").textContent =
    product.name || "Unknown";

  document.getElementById("modal-nova-icon").textContent = product.novaGroup;
  document.getElementById("modal-nutri-icon").textContent =
    product.nutritionGrade;

  const n = product.nutrients || {};
  // ===== CALORIES =====
  document.getElementById("product-modal-calories").textContent =
    formatGram(n.calories) || 0;

  // ===== MACROS =====
  document.getElementById("product-modal-protein").textContent = formatGram(
    n.protein,
  );

  document.getElementById("product-modal-carbs").textContent = formatGram(
    n.carbs,
  );

  document.getElementById("product-modal-fat").textContent = formatGram(n.fat);

  document.getElementById("product-modal-sugar").textContent = formatGram(
    n.sugar,
  );

  document.getElementById("product-modal-fiber").textContent = formatGram(
    n.fiber,
  );

  document.getElementById("product-modal-salt").textContent = formatGram(
    n.sodium,
  ); 
  document.getElementById("product-modal-saturated").textContent = formatGram(
    n.saturatedFat || 0,
  );

  
  document.getElementById("protein-bar").style.width =
    Math.min((n.protein || 0) * 2, 100) + "%";

  document.getElementById("carbs-bar").style.width =
    Math.min((n.carbs || 0) * 1.5, 100) + "%";

  document.getElementById("fat-bar").style.width =
    Math.min((n.fat || 0) * 2, 100) + "%";

  document.getElementById("sugar-bar").style.width =
    Math.min((n.sugar || 0) * 2, 100) + "%";
}
export function openProductModal(product) {
  fillProductModal(product);

  openModal(modal);
}

const fixedCategories = [
  {
    id: "breakfast-cereals",
    name: "Breakfast Cereals",
    icon: "fa-wheat-awn",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "fa-bottle-water",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: "fa-cookie",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "dairies",
    name: "Dairy Products",
    icon: "fa-cheese",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: "fa-apple-whole",
    gradient: "from-red-500 to-rose-500",
  },
  {
    id: "vegetables",
    name: "Vegetables",
    icon: "fa-carrot",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "breads",
    name: "Breads",
    icon: "fa-bread-slice",
    gradient: "from-amber-600 to-yellow-500",
  },
  {
    id: "meats",
    name: "Meats",
    icon: "fa-drumstick-bite",
    gradient: "from-red-600 to-rose-600",
  },
  {
    id: "fishes",
    name: "Frozen Foods",
    icon: "fa-snowflake",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "sauces",
    name: "Sauces & Condiments",
    icon: "fa-jar",
    gradient: "from-orange-500 to-red-500",
  },
];

export function displayProductCategories(categories) {
  productCategories.innerHTML = "";

  fixedCategories.forEach((category) => {
    const btn = document.createElement("button");

    btn.className = `
    product-category-btn
    flex-shrink-0
    px-5
    py-3
    rounded-xl
    font-semibold
    text-white
    bg-gradient-to-r
    ${category.gradient}
    hover:shadow-lg
    hover:scale-105
    transition-all
    duration-300
  `;

    btn.dataset.category = category.id;

    btn.innerHTML = `
    <i class="fa-solid ${category.icon} mr-2"></i>
    ${category.name}
  `;

    productCategories.append(btn);
  });
}
