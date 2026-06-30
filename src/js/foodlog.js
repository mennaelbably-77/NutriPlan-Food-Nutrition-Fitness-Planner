export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end", 
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: false,

  color: "#fff",
  iconColor: "#fff",
  width: "auto",
  height: "auto",
  showClass: {
    popup: "swal2-show swal2-animate-bottom",
  },

  hideClass: {
    popup: "swal2-hide swal2-animate-bottom",
  },

  customClass: {
    popup: "rounded-toast small-toast",
  },
});

let foodLog = JSON.parse(localStorage.getItem("foodLog")) || [];
function saveFoodLog() {
  localStorage.setItem("foodLog", JSON.stringify(foodLog));
}


export function addToFoodLog(item) {
  const servings = item.servings || 1;

  const logItem = {
    logId: Date.now(),
    id: item.id || item.barcode,
    name: item.name,
    image: item.image || item.thumbnail,
    category: item.category || item.brand || "",

    calories:
      (item.nutrients?.calories || item.perServing?.calories || 0) * servings,

    protein:
      (item.nutrients?.protein || item.perServing?.protein || 0) * servings,

    carbs: (item.nutrients?.carbs || item.perServing?.carbs || 0) * servings,

    fat: (item.nutrients?.fat || item.perServing?.fat || 0) * servings,

    servings,
    type: item.barcode ? "Product" : "Recipe",

    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    date: new Date().toISOString(),
  };

  foodLog.push(logItem);

  saveFoodLog();

  renderFoodLog();
}

export function getFoodLog() {
  return JSON.parse(localStorage.getItem("foodLog")) || [];
}

export function renderFoodLog() {
  const today = new Date().toISOString().split("T")[0];

  const foodLog = getFoodLog().filter((item) => item.date.startsWith(today));
  const loggedItemsList = document.getElementById("logged-items-list");
  const loggedItemsCount = document.getElementById("logged-items-count");
  const clearBtn = document.getElementById("clear-foodlog");
  const date = document.getElementById("foodlog-date");

  date.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  loggedItemsList.textContent = "";

  loggedItemsCount.textContent = `Logged Items (${foodLog.length})`;
  if (foodLog.length === 0) {
    const empty = document.createElement("div");
    empty.className = "text-center py-12";

    // Circle
    const circle = document.createElement("div");
    circle.className =
      "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-utensils text-3xl text-gray-300";

    circle.append(icon);

    // Title
    const title = document.createElement("p");
    title.className = "text-gray-500 font-medium mb-2";
    title.textContent = "No food logged today";

    // Subtitle
    const subtitle = document.createElement("p");
    subtitle.className = "text-gray-400 text-sm mb-4";
    subtitle.textContent =
      "Start tracking your nutrition by logging meals or scanning products";

    // Buttons
    const buttons = document.createElement("div");
    buttons.className = "flex justify-center gap-3 flex-wrap";

    // Browse Recipes Button
    const recipesBtn = document.createElement("a");

    recipesBtn.className =
      "inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all";

    recipesBtn.innerHTML = `
    <i class="fa-solid fa-plus"></i>
    Browse Recipes
  `;

    // Scan Product Button
    const productBtn = document.createElement("a");
    productBtn.className =
      "nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all";
productBtn.dataset.section = "products-section";
    productBtn.innerHTML = `
    <i class="fa-solid fa-barcode"></i>
    Scan Product
  `;

    buttons.append(recipesBtn, productBtn);

    empty.append(circle, title, subtitle, buttons);
    recipesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector('[data-section="main-section"]').click();
});

productBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector('[data-section="products-section"]').click();
});

    loggedItemsList.append(empty);

    clearBtn.style.display = "none";

    // Reset Progress Bars
    const bars = document.querySelectorAll("#nutrition-progress > div");

    bars[0].querySelector("span:last-child").textContent = "0 / 2000 kcal";
    bars[0].querySelector(".bg-emerald-500").style.width = "0%";

    bars[1].querySelector("span:last-child").textContent = "0 / 50 g";
    bars[1].querySelector(".bg-blue-500").style.width = "0%";

    bars[2].querySelector("span:last-child").textContent = "0 / 250 g";
    bars[2].querySelector(".bg-amber-500").style.width = "0%";

    bars[3].querySelector("span:last-child").textContent = "0 / 65 g";
    bars[3].querySelector(".bg-purple-500").style.width = "0%";

    renderWeeklyChart();
    return;
  }

  clearBtn.style.display = "inline-block";

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  foodLog.forEach((item) => {
    totalCalories += Number(item.calories || 0);
    totalProtein += Number(item.protein || 0);
    totalCarbs += Number(item.carbs || 0);
    totalFat += Number(item.fat || 0);

    //  Card 
    const card = document.createElement("div");
    card.className =
      "flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all";

    // left
    const left = document.createElement("div");
    left.className = "flex items-center gap-4";

    const img = document.createElement("img");
    img.src = item.image;
    img.className = "w-14 h-14 rounded-xl object-cover";

    const info = document.createElement("div");

    const title = document.createElement("p");
    title.className = "font-semibold text-gray-900";
    title.textContent = item.name;

    const details = document.createElement("p");
    details.className = "text-sm text-gray-500";

    const serving = document.createElement("span");
    serving.textContent = `${item.servings} serving${item.servings > 1 ? "s" : ""}`;
    const dot = document.createElement("span");
    dot.className = "mx-1";
    dot.textContent = "•";

    const type = document.createElement("span");
    type.className = "text-emerald-600";
    type.textContent = item.type;
    details.append(serving, dot, type);

    const time = document.createElement("p");
    time.className = "text-xs text-gray-400 mt-1";

    time.textContent = item.time;

    info.append(title, details, time);

    left.append(img, info);

    // right

    const right = document.createElement("div");
    right.className = "flex items-center gap-4";

    const calories = document.createElement("div");
    calories.className = "text-right";

    const kcal = document.createElement("p");
    kcal.className = "text-lg font-bold text-emerald-600";
    kcal.textContent = Math.round(item.calories);

    const kcalText = document.createElement("p");
    kcalText.className = "text-xs text-gray-500";
    kcalText.textContent = "kcal";

    calories.append(kcal, kcalText);

    const macros = document.createElement("div");
    macros.className = "hidden md:flex gap-2 text-xs text-gray-500";

    const protein = document.createElement("span");
    protein.className = "px-2 py-1 bg-blue-50 rounded";
    protein.textContent = `${Math.round(item.protein)}g P`;

    const carbs = document.createElement("span");
    carbs.className = "px-2 py-1 bg-amber-50 rounded";
    carbs.textContent = `${Math.round(item.carbs)}g C`;

    const fat = document.createElement("span");
    fat.className = "px-2 py-1 bg-purple-50 rounded";
    fat.textContent = `${Math.round(item.fat)}g F`;

    macros.append(protein, carbs, fat);

    const removeBtn = document.createElement("button");
    removeBtn.className =
      "remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-trash";

    removeBtn.append(icon);

    removeBtn.addEventListener("click", () => {
      removeFoodItem(item.logId);
    });

    right.append(calories, macros, removeBtn);

    card.append(left, right);

    loggedItemsList.append(card);
  });

  //  Progress Bars 
  const bars = document.querySelectorAll("#nutrition-progress > div");

  bars[0].querySelector("span:last-child").textContent =
    `${Math.round(totalCalories)} / 2000 kcal`;
  bars[0].querySelector(".bg-emerald-500").style.width =
    `${Math.min(totalCalories / 20, 100)}%`;

  bars[1].querySelector("span:last-child").textContent =
    `${Math.round(totalProtein)} / 50 g`;
  bars[1].querySelector(".bg-blue-500").style.width =
    `${Math.min(totalProtein * 2, 100)}%`;

  bars[2].querySelector("span:last-child").textContent =
    `${Math.round(totalCarbs)} / 250 g`;
  bars[2].querySelector(".bg-amber-500").style.width =
    `${Math.min(totalCarbs / 2.5, 100)}%`;

  bars[3].querySelector("span:last-child").textContent =
    `${Math.round(totalFat)} / 65 g`;
  bars[3].querySelector(".bg-purple-500").style.width =
    `${Math.min(totalFat / 0.65, 100)}%`;
  renderWeeklyChart();
}

export function removeFoodItem(logId) {
  foodLog = foodLog.filter((item) => item.logId !== logId);

  saveFoodLog();

  renderFoodLog();
  renderWeeklyChart();

  Toast.fire({
    title: "Item removed from logged",
    background: "#4747e8",
  });
}

const clearBtn = document.getElementById("clear-foodlog");

clearBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Clear Today's Log?",
    text: "This will remove all logged food items for today.",
    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",

    reverseButtons: false,

    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      foodLog = [];

      saveFoodLog();

      renderFoodLog();
      renderWeeklyChart();

      Swal.fire({
        icon: "success",
        title: "cleared!",
        text: "Your daily log has been cleared.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
});

export function renderWeeklyChart() {
  const container = document.getElementById("weekly-chart");
  const weeklyAverageEl = document.getElementById("weekly-average");
  const weeklyItemsEl = document.getElementById("weekly-items");
  const goalDaysEl = document.getElementById("goal-days");

  if (!container) return;

  container.textContent = "";

  const foodLog = getFoodLog();

  let weekCalories = 0;
  let totalItems = 0;
  let goalCounter = 0;

  const getDateKey = (dateStr) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateKey = date.toISOString().split("T")[0];

    const dayItems = foodLog.filter((item) => {
      if (!item.date) return false;
      return getDateKey(item.date) === dateKey;
    });

    const totalCalories = dayItems.reduce(
      (sum, item) => sum + Number(item.calories || 0),
      0,
    );

    weekCalories += totalCalories;
    totalItems += dayItems.length;

    if (totalCalories >= 1800 && totalCalories <= 2200) {
      goalCounter++;
    }

    const card = document.createElement("div");
    card.className = "text-center";

    if (i === 0) {
      card.classList.add("bg-indigo-100", "rounded-xl", "py-2");
    }

    const dayName = document.createElement("p");
    dayName.className = "text-xs text-gray-500 mb-1";
    dayName.textContent = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const dayNumber = document.createElement("p");
    dayNumber.className = "text-sm font-medium text-gray-900";
    dayNumber.textContent = date.getDate();

    const caloriesWrapper = document.createElement("div");
    caloriesWrapper.className =
      totalCalories > 0 ? "mt-2 text-emerald-600" : "mt-2 text-gray-300";

    const calories = document.createElement("p");
    calories.className = "text-lg font-bold";
    calories.textContent = Math.round(totalCalories);

    const kcal = document.createElement("p");
    kcal.className = "text-xs";
    kcal.textContent = "kcal";

    caloriesWrapper.append(calories, kcal);

    card.append(dayName, dayNumber, caloriesWrapper);

    if (dayItems.length > 0) {
      const items = document.createElement("p");
      items.className = "text-xs text-gray-400 mt-1";
      items.textContent = `${dayItems.length} item${
        dayItems.length > 1 ? "s" : ""
      }`;

      card.append(items);
    }

    container.append(card);
  }

  const weeklyAverage = Math.round(weekCalories / 7);

  if (weeklyAverageEl) {
    weeklyAverageEl.textContent = `${weeklyAverage} kcal`;
  }

  if (weeklyItemsEl) {
    weeklyItemsEl.textContent = `${totalItems} items`;
  }

  if (goalDaysEl) {
    goalDaysEl.textContent = `${goalCounter} / 7`;
  }
}
