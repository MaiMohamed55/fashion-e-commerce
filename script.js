

const shopNowBtn = document.getElementById("shopNowBtn");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const emptyCart = document.getElementById("emptyCart");

const checkoutBtn = document.getElementById("checkoutBtn");

const searchInput = document.getElementById("searchInput");

const filterButtons = document.querySelectorAll(".filter-btn");

const products = document.querySelectorAll(".product-card");

const categoryCards = document.querySelectorAll(".category-card");

const noProducts = document.getElementById("noProducts");

const contactForm = document.getElementById("contactForm");

let cart = JSON.parse(localStorage.getItem("urbanStoreCart")) || [];

shopNowBtn.addEventListener("click", () => {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

});


function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}

cartBtn.addEventListener("click", openCart);


function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);


function saveCart() {

    localStorage.setItem(
        "urbanStoreCart",
        JSON.stringify(cart)
    );

}


document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const product = button.closest(".product-card");

        const name = product.dataset.name;

        const price = Number(product.dataset.price);

        const image = product.querySelector("img").src;


        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }


        saveCart();

        renderCart();

        openCart();

    });

});


function renderCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <span class="cart-item-price">
                    $${item.price}
                </span>

                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent = total.toFixed(2);


    if (cart.length === 0) {

        emptyCart.style.display = "flex";

    } else {

        emptyCart.style.display = "none";

    }

}


function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    renderCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();

}


function filterProducts(category) {

    let visibleProducts = 0;


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const category =
            button.dataset.filter;


        filterProducts(category);

    });

});


categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;


        // Update active filter

        filterButtons.forEach(btn => {

            btn.classList.remove("active");


            if (
                btn.dataset.filter === category
            ) {

                btn.classList.add("active");

            }

        });

        filterProducts(category);
        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


searchInput.addEventListener(
    "input",
    () => {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleProducts = 0;


        products.forEach(product => {

            const productName =
                product.dataset.name
                    .toLowerCase();


            if (
                productName.includes(searchValue)
            ) {

                product.style.display = "block";

                visibleProducts++;

            } else {

                product.style.display = "none";

            }

        });


        if (visibleProducts === 0) {

            noProducts.style.display = "block";

        } else {

            noProducts.style.display = "none";

        }

    }
);


contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        alert(
            "Thank you! Your message has been sent successfully."
        );


        contactForm.reset();

    }
);


checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Add a product first."
            );

            return;

        }


        alert(
            "Checkout is ready! This is a demo store."
        );

    }
);


renderCart();