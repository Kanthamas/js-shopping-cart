//// Select elements
const productFormEl = document.querySelector("#productForm");
const productNameEl = document.querySelector("#productName");
const priceEl = document.querySelector("#price");
const imgUrlEl = document.querySelector("#imgURL");
const errorMessageEl = document.querySelector("#errorMessage");

//// Initialize variables
const products = [];
let productId = 100;
let selectedProducts = [];
let countProuctsInCart = 0;

const defaultImgURL =
	"https://st4.depositphotos.com/2495409/19919/i/450/depositphotos_199193024-stock-photo-new-product-concept-illustration-isolated.jpg";

const mockData = [
	{
		id: 1,
		productName: "Chocolate Chips Cookies",
		price: 10.0,
		imgURL:
			"https://lovingitvegan.com/wp-content/uploads/2019/04/Vegan-Gluten-Free-Chocolate-Chip-Cookies-Square.jpg",
		isSelected: false,
	},
	{
		id: 2,
		productName: "Pizza Margherita",
		price: 25.99,
		imgURL:
			"https://previews.123rf.com/images/vankad/vankad1505/vankad150500023/39660932-pizza-margherita.jpg",
		isSelected: false,
	},
];

//// Handle form input to create a new item to the product dashboard.
//// Main function to handle Product Form
function handleFormSubmit() {
	productFormEl.addEventListener("submit", (event) => {
		event.preventDefault();
		createProduct();
		// console.log({ products });
	});
}

//// Create a new product object and push into products array
function createProduct() {
	// 1. get input data
	const productName = productNameEl.value.trim();
	const price = parseFloat(priceEl.value);
	const imgURL = imgUrlEl.value.trim() || defaultImgURL;

	// 2. verify data
	if (!isImageUrlValid(imgURL)) {
		errorMessageEl.textContent = `Please input valid image URL.
    \nOR leave it blank it use a default image URL.`;
		imgUrlEl.value = "";
		return;
	}

	// 3. create a new product object and add data
	const product = {
		id: productId++,
		isSelected: false,
		productName,
		price,
		imgURL,
	};

	// 4. push a new product object in products array
	products.push(product);
	resetForm();
	// console.log(`create a new product successfully.`);

	// 5. create a product card
	const card = createProductCard(product);

	// 6. render each product card in Product Dashboard
	renderCard("#productDisplay", card);

	// 7. if there is at least one product card in the product dashboard, the "Add to Cart" button display at the bottom of the section
	if (products) createAddToCardBtn();
}

//// Create "Add to Cart" button for Product Dashboard
function createAddToCardBtn() {
	const addToCartBtn = document.querySelector("#addToCartBtn");
	addToCartBtn.classList.remove("hidden");
	addToCartBtn.addEventListener("click", addToCart);
}

//// Handle user selection items from the product dashboard. Users can select multiple products at once.
// 8. when click "Add to Cart", the selected products are added to Cart section
function addToCart() {
	selectedProducts = filteredProducts();
	const selectedCards = selectedProducts.map((product) =>
		createSelectedProductCard(product)
	);
	renderCards("#cartDisplay", selectedCards);

	countProuctsInCart = selectedCards.length;
	// console.log(`countProuctsInCart (addToCart): ${countProuctsInCart} `);
	displayCalcFinalPriceBtn();
}

//// Filter selected products
function filteredProducts() {
	const checkboxChecked = document.querySelectorAll(
		`input[type="checkbox"]:checked`
	);

	// get ID from checked product
	const selectedProductIDs = Array.from(checkboxChecked).map(
		(element) => +element.id
	);

	// find selected products from products using ID
	const selectedProducts = products.filter((product) => {
		return selectedProductIDs.find((id) => id === product.id);
	});

	// change isSelected status from "false" to "true"
	selectedProducts.map((product) => {
		product.isSelected = true;
	});

	return selectedProducts;
}

// 10. when "Remove" clicked, that product card is removed from the cart
function removeProductFromCart(id) {
	const removedProduct = selectedProducts.find((product) => id === product.id);
	removedProduct.isSelected = false;

	const currentSelectedProducts = selectedProducts.filter(
		(product) => product.isSelected === true
	);
	const currentSelectedCart = currentSelectedProducts.map((product) =>
		createSelectedProductCard(product)
	);
	renderCards("#cartDisplay", currentSelectedCart);

	countProuctsInCart--;
	// console.log(
	// 	`countProuctsInCart (removeProductFromCart): ${countProuctsInCart} `
	// );

	displayCalcFinalPriceBtn();
}

// 12-1. when "Calculate Final Price" clicked, displays the total price
//// Create "Calculate Final Price" button for Cart
function createCalcFinalPriceBtn() {
	const calcFinalPriceBtn = document.querySelector("#calcFinalPriceBtn");
	const displayFinalPriceEl = document.querySelector("#displayFinalPrice");

	calcFinalPriceBtn.classList.remove("hidden");
	displayFinalPriceEl.classList.remove("hidden");
	displayFinalPriceEl.textContent = "";

	calcFinalPriceBtn.addEventListener("click", () => {
		const finalPrice = calcFinalPrice();
		displayFinalPriceEl.textContent = `You have to pay ${formatCurrency(
			finalPrice
		)}`;
	});
}

// 11. if there is at least one selected product card in the cart, the "Calculate Final Price" button display at the bottom of the section
function displayCalcFinalPriceBtn() {
	countProuctsInCart > 0
		? createCalcFinalPriceBtn()
		: removeCalcFinalPriceBtn();
}

// 12-2. when "Calculate Final Price" clicked, displays the total price
function calcFinalPrice() {
	let finalPrice = 0;

	if (countProuctsInCart > 0) {
		finalPrice = selectedProducts
			.filter((product) => product.isSelected === true)
			.reduce((acc, curr) => acc + curr.price, 0);
	}
	return finalPrice;
}

// 12-3. when "Calculate Final Price" clicked, displays the total price
function removeCalcFinalPriceBtn() {
	const calcFinalPriceBtn = document.querySelector("#calcFinalPriceBtn");
	const displayFinalPriceEl = document.querySelector("#displayFinalPrice");

	calcFinalPriceBtn.classList.add("hidden");
	displayFinalPriceEl.classList.add("hidden");
	displayFinalPriceEl.textContent = "";
}

//// Main function
function productDashboard() {
	handleFormSubmit();
}

document.addEventListener("DOMContentLoaded", () => {
	productDashboard();

	// console.log(`scripts.js loaded, we're all good!`);
});

//// Utility functions
function isImageUrlValid(imgURL) {
	const input = new URL(imgURL);
	const isValid = /\.(jpg|jpeg}png|gif)$/.test(input.pathname);
	if (isValid) errorMessageEl.textContent = "";
	return isValid;
}

function resetForm() {
	productNameEl.value = "";
	priceEl.value = "";
	imgUrlEl.value = "";
	errorMessageEl.textContent = "";
}

function formatCurrency(number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number);
}

//// Render a new card (appendChild) ////
function renderCard(parentNode, cardFn) {
	const parentContainer = document.querySelector(`${parentNode}`);
	parentContainer.appendChild(cardFn);
}

//// Render cards ////
function renderCards(parentNode, cards) {
	const parentContainer = document.querySelector(`${parentNode}`);
	parentContainer.innerHTML = "";
	cards.forEach((card) => parentContainer.appendChild(card));
}

//// Create a product card template ////
function createProductCard(product) {
	const card = document.createElement("li");

	card.className = "flex gap-8 py-4 pl-8 mx-4 mb-4 border border-gray-500";
	card.innerHTML = `
		<input
			type="checkbox"
			class="self-center w-6 h-6 accent-orange-500/75"
			id="${product.id}"
		/>
		<div class="w-[100px] border border-slate-300">
			<img
				src="${product.imgURL}"
				alt="${product.productName}"
				class="object-cover w-full aspect-square"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-bold">${product.productName}</h3>
			<p class="text-lg font-medium">Price: ${formatCurrency(product.price)}</p>
		</div>
  `;
	return card;
}

//// Create a product card template ////
// 9. each selected product card includes "Remove" button
function createSelectedProductCard(product) {
	const card = document.createElement("li");
	card.setAttribute("id", `${product.id}`);
	card.className = "flex gap-8 py-4 pl-8 mx-4 mb-4 border border-gray-500";
	card.innerHTML = `
		<div class="w-[100px] border border-slate-300" ">
			<img
				src="${product.imgURL}"
				alt="${product.productName}"
				class="object-cover w-full aspect-square"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-bold">${product.productName}</h3>
			<p class="text-lg font-medium">Price: ${formatCurrency(product.price)}</p>
				<button class="removeBtn px-4 py-2 mb-2 font-bold text-white bg-red-500 rounded-md hover:bg-slate-600 w-fit" onclick="removeProductFromCart(${
					product.id
				})"
			>Remove
			</button>
		</div>
  `;
	return card;
}
