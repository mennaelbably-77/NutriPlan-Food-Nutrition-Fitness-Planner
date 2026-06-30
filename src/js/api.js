const baseUrl = "https://nutriplan-api.vercel.app/api";
export async function getMeals(searchTerm = "") {
  let res = await fetch(
    `${baseUrl}/meals/search?q=${searchTerm}&page=1&limit=25`,
  );
  let data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch(`${baseUrl}/meals/categories`);
  const data = await res.json();
  return data;
}
export async function getMealsByCategory(category) {
  const res = await fetch(
    `${baseUrl}/meals/filter?category=${category}&page=1&limit=25`,
  );

  const data = await res.json();

  return data.results;
}
export async function getAreas() {
  const res = await fetch(`${baseUrl}/meals/areas`);
  const data = await res.json();
  return data;
}
export async function getMealsByArea(area) {
  const res = await fetch(`${baseUrl}/meals/filter?area=${area}&limit=25`);
  const data = await res.json();
  return data.results;
}

export async function getMealsById(id) {
  const res = await fetch(`${baseUrl}/meals/${id}`);
  const data = await res.json();
  return data.result;
}
const apiKey = "jdaAVsaz7DS3xQtSeHQKV6Re54qYSahEpbQyOOBc";

 export async function getNutrition(meal) {
  const ingredients = meal.ingredients.map((item) => {
    return `${item.measure} ${item.ingredient}`;
  });

  const res = await fetch(`${baseUrl}/nutrition/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      recipeName: meal.name,
      ingredients: ingredients,
    }),
  });

  const data = await res.json();

  return data.data;
}

// product section
 export async function searchProducts(query = "") {
  const response = await fetch(
    `${baseUrl}/products/search?q=${query}&page=1&limit=24`
  );

  const data = await response.json();

  return data;
}

export async function getProductByBarcode(barcode) {
  const res = await fetch(`${baseUrl}/products/barcode/${barcode}`);
  const data = await res.json();

  return data.result;
}

// product category
export async function getProductCategories() {
  const res = await fetch(`${baseUrl}/products/categories`);
  const data = await res.json();

  return data.results;
}

export async function getProductsByCategory(category) {
  const res = await fetch(`${baseUrl}/products/category/${category}`);
  const data = await res.json();

  return data.results;
}