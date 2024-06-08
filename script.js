const productsData = [
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
const products = [];
const defaultImgURL =
	"https://st4.depositphotos.com/2495409/19919/i/450/depositphotos_199193024-stock-photo-new-product-concept-illustration-isolated.jpg";

const productFormEl = document.querySelector("#productForm");
const productNameEl = document.querySelector("#productName");
const priceEl = document.querySelector("#price");
const imgURLEl = document.querySelector("#imgURL");
const errorMessageEl = document.querySelector("#errorMessage");

const isImageUrlValid = (imgURL) => {
	const input = new URL(imgURL);
	const isValid = /\.(jpg|jpeg}png|gif)$/.test(input.pathname);
	if (isValid) errorMessageEl.textContent = "";
	return isValid;
};

const formatCurrency = (number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number);
};

const resetForm = () => {
	productNameEl.value = "";
	priceEl.value = "";
	imgURLEl.value = "";
	errorMessageEl.textContent = "";
};

const createProductData = () => {
	const productName = productNameEl.value.trim();
	const price = parseFloat(priceEl.value.trim());

	let imgURL = imgURLEl.value.trim() || defaultImgURL;

	if (!isImageUrlValid(imgURL)) {
		errorMessageEl.textContent = `Please input valid image URL.`;
		imgURLEl.value = "";
		return;
	}

	let productId = 1;
	const product = {
		id: productId++,
		productName,
		price,
		imgURL,
		isSelected: false,
	};

	products.push(product);
	resetForm();

	createProductCard(product);
};

const createProductCard = (product) => {
	const productDisplay = document.querySelector("#productDisplay");
	const card = document.createElement("li");
	card.className = "flex gap-8 py-4 pl-8 mx-4 mb-4 border border-gray-500";

	card.innerHTML = `
		<input
			type="checkbox"
			class="self-center w-6 h-6 accent-orange-500/75"
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

	productDisplay.appendChild(card);
	createAddToCardBtn();
};

const createAddToCardBtn = () => {
	const addToCartBtn = document.querySelector("#addToCartBtn");
	addToCartBtn.classList.remove("hidden");
	console.log("add to cart");
};

const shoppingCart = () => {
	productFormEl.addEventListener("submit", (event) => {
		event.preventDefault();

		createProductData();

		console.log(products);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	console.log(`script.js loaded`);
	shoppingCart();
});