const productFormEl = document.querySelector("#productForm");
const productNameEl = document.querySelector("#productName");
const priceEl = document.querySelector("#price");
const imgUrlEl = document.querySelector("#imgURL");
const errorMessageEl = document.querySelector("#errorMessage");

const products = [];
let productId = 0;

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
		isSeleted: false,
		productName,
		price,
		imgURL,
	};

	// 4. push a new product object in products array
	products.push(product);
	resetForm();
	console.log(`create a new product successfully.`);

	// (// 5. + // 6.) invoke createProductcard(card) after successfully create a new product
	createProductCard(product);

	// 7. if there is at least one product card in the product dashboard, the "Add to Cart" button display at the bottom of the section
	if (products) createAddToCardBtn();
}

function handleFormSubmit() {
	productFormEl.addEventListener("submit", (event) => {
		event.preventDefault();
		createProduct();
		console.log(products);
	});
}


//// Create a product card template that used in (// 5. + // 6.)
// 5. create a product card
function createProductCard(product) {
	const productDisplay = document.querySelector("#productDisplay");
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

	// 6. render each product card in Product Dashboard
	productDisplay.appendChild(card);
}

// 8. when click "Add to Cart", the selected products are added to Cart section
function addToCart() {
	const selectedProducts = isProductSelected();
	selectedProducts.map((product) => (product.isSelected = true));

	selectedProducts.forEach((product) => createCartCard(product));
}
function createAddToCardBtn() {
	const addToCartBtn = document.querySelector("#addToCartBtn");
	addToCartBtn.classList.remove("hidden");
	addToCartBtn.addEventListener("click", addToCart);
}

//// Handle user selection items from the product dashboard. 
function productDashboard() {
	// 9. Users can select multiple products at once
	
}

function cart() {
	// 10. each selected product card includes "Remove" button
	// 11. when "Remove" clicked, that product card is removed from the cart
	// 12. if there is at least one selected product card in the cart, the "Calculate Final Price" button display at the bottom of the section
	// 13. when "Calculate Final Price" clicked, displays the total price
}

//// Main function
function shoppingCart() {
	handleFormSubmit();
	console.log(`shopping cart executed.`);
}

document.addEventListener("DOMContentLoaded", () => {
	shoppingCart();
	console.log(`scripts.js loaded, we're all good!`);
});

//// utility functions
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
