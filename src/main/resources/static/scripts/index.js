function signUpUser() {
    // Get form inputs
    const name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let balance = 0;
    // Create user object
    let user = {
        name: name,
        balance: balance,
        password: password


    };
    let url = 'http://localhost:8080/user/user?';
    url += 'name=' + name + '&balance=' + balance + '&password=' + password;
    // Send POST request to API
    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            // If user created successfully, show success message
            alert('User created successfully!');
            window.location.href = 'index.html';
        } else {
            // If there's an error, show error message
            alert('Failed to create user. Please try again.');
        }
    })
    .catch(error => {
        // If there's a network error, show error message
        console.error('Error:', error);
        alert('Failed to create user. Please check your internet connection and try again.');
    });
}

function login() {
    var loggedInUser = document.getElementById("loggedInUser");
    var loginBtn = document.getElementById("loginBtn");
    if (loginBtn.textContent === "Log Out") {
        // If the button text is "Log Out", perform logout action
        logout()
    } else {
        // Get the username entered by the user
        var name = prompt("Enter your username:");
        var password = prompt("Enter your password:");
        let url = 'http://localhost:8080/user/user?';
        url += 'name=' + name;
        // Make an API call to fetch the user by name
        fetch(url, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            if (user !== null && user.userPassword === password) {
                // User found and password matches, perform login action
                loggedInUser.textContent = "Logged in as: " + name;
                loginBtn.textContent = "Log Out";
                // Perform additional actions such as redirecting to a new page or setting user session
                sessionStorage.setItem("userName", user.userName);
                sessionStorage.setItem("userId", user.userId);
            } else {
                // User not found or password doesn't match, display error message
                alert('Invalid username or password.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors such as network issues or server errors
        });
    }
}
function logout() {
    loggedInUser.textContent = "";
    loginBtn.textContent = "Login";
    // Clear session storage or perform any additional logout actions
    sessionStorage.clear();
}


let shoes = [];

// Function to fetch shoes data from the backend
function fetchShoes() {
    fetch("http://localhost:8080/shoe/allshoes", {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        shoes = data;
        displayShoes(shoes);
    })
    .catch(error => console.error('Error fetching shoes:', error));
}

function createShoe(shoeData) {
    fetch("http://localhost:8080/shoe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
    })
        .then(response => {
            if (response.status === 201) {
                console.log("Shoe created successfully!");
                fetchShoes(); // Refresh shoe list after creation
            } else {
                console.error("Failed to create shoe:", response.status);
            }
        })
        .catch(error => console.error('Error creating shoe:', error));
}

function updateShoe(id, shoeData) {
    fetch(`http://localhost:8080/shoe/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shoeData),
    })
        .then(response => {
            if (response.status === 200) {
                console.log("Shoe updated successfully!");
                fetchShoes(); // Refresh shoe list after update
            } else {
                console.error("Failed to update shoe:", response.status);
            }
        })
        .catch(error => console.error('Error updating shoe:', error));
}

function deleteShoe(id) {
    let url = 'http://localhost:8080/shoe/shoe?id=';
    url += id
    fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status === 200) {
                console.log("Shoe deleted successfully!");
                fetchShoes(); // Refresh shoe list after deletion
            } else {
                console.error("Failed to delete shoe:", response.status);
            }
        })
        .catch(error => console.error('Error deleting shoe:', error));
}

function filterShoes() {
    // Get the filter criteria
    var gender = document.getElementById("gender").value;
    var brand = document.getElementById("brand").value;
    var style = document.getElementById("style").value;
    var sizeFilter = document.getElementById("size-filter").value;

    // Apply the filters to the shoes array based on the criteria
    var filteredShoes = shoes.filter(shoe => {
        if (gender !== "all" && shoe.shoeGender !== gender) return false;
        if (brand !== "all" && shoe.shoeBrand !== brand) return false;
        if (style !== "all" && shoe.shoeStyle !== style) return false;
        if (sizeFilter !== "all" && shoe.shoeSize !== parseInt(sizeFilter)) return false;
        return true;
    });

    // Display the filtered shoes
    displayShoes(filteredShoes);
}

// Function to populate the size filter dropdown based on available sizes
function populateSizeFilter() {
    var sizes = shoes.map(shoe => shoe.size);
    var uniqueSizes = Array.from(new Set(sizes));
    var sizeFilterSelect = document.getElementById("size-filter");
    sizeFilterSelect.innerHTML = "<option value='all'>All</option>"; // Reset size filter
    uniqueSizes.forEach(size => {
        var option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeFilterSelect.appendChild(option);
    });
}

// Call populateSizeFilter function to initially populate the size filter dropdown
populateSizeFilter();

function displayShoes(shoes) {
    // Implement display logic here
    var shoeList = document.getElementById("shoe-list");
    // Clear previous shoe list
    shoeList.innerHTML = "";
    // Iterate over the shoes and display each shoe
    shoes.forEach(shoe => {
        var shoeItem = document.createElement("div");
        shoeItem.textContent = `${shoe.shoeBrand} - ${shoe.shoeName} - Size: ${shoe.shoeSize}`;
        shoeList.appendChild(shoeItem);
    });
}

function addToCart(shoe) {
    // Check if the shoe is already in the cart
    var cartItems = document.getElementById("cart-items");
    var shoeAlreadyInCart = Array.from(cartItems.children).some(item => item.dataset.shoeId === shoe.id.toString());

    if (shoeAlreadyInCart) {
        alert("This shoe is already in your cart.");
        return;
    }

    // Create a new list item for the shoe
    var listItem = document.createElement("li");
    listItem.textContent = `${shoe.brand} - ${shoe.name} - Size: ${shoe.size}`;
    listItem.dataset.shoeId = shoe.id; // Set custom data attribute to store shoe ID
    cartItems.appendChild(listItem);

    // Enable checkout button
    var checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }
}


function removeFromCart(shoe) {
    var cartItems = document.getElementById("cart-items");
    var itemsToRemove = Array.from(cartItems.children).filter(item => item.dataset.shoeId === shoe.id.toString());

    if (itemsToRemove.length === 0) {
        alert("This shoe is not in your cart.");
        return;
    }

    // Remove the shoe from the cart
    itemsToRemove.forEach(item => cartItems.removeChild(item));

    // If the cart is empty, disable the checkout button
    if (cartItems.children.length === 0) {
        var checkoutBtn = document.getElementById("checkoutBtn");
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
        }
    }
}


function checkout() {
    // Get the cart items
    var cartItems = document.getElementById("cart-items").children;

    // Check if the cart is empty
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    // Perform checkout logic, such as processing payment, updating inventory, etc.
    // For simplicity, let's just display an alert message indicating successful checkout.
    alert("Thank you for your purchase! Your order has been successfully placed.");

    // Clear the cart
    var cart = document.getElementById("cart");
    if (cart) {
        cart.style.display = "none";
    }
    var cartItemsList = document.getElementById("cart-items");
    if (cartItemsList) {
        while (cartItemsList.firstChild) {
            cartItemsList.removeChild(cartItemsList.firstChild);
        }
    }

    // Disable the checkout button
    var checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.disabled = true;
    }
}

// Call fetchShoes function to initially load shoes data
fetchShoes();

function deleteUser() {
    let url = 'http://localhost:8080/user/user?id=';
    let userId = sessionStorage.getItem('userId');

    if (!userId) {
        console.error("No user id found in session storage");
        return;
    }

    url += userId;

    fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status === 200) {
                alert("User deleted successfully!");
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('userName');
                logout();
            } else {
                console.error("Failed to delete user:", response.status);
            }
        })
        .catch(error => console.error('Error deleting user:', error));
}
function changePassword() {
    let userId = sessionStorage.getItem('userId');
    let userName = sessionStorage.getItem('userName')
    if (!userId) {
        alert("No user signed in.");
        console.error("No user id found in session storage");
        return;
    } else {
        let url = 'http://localhost:8080/user/user?name=';
        url += userName;
        fetch(url, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then(user => {
            var password = prompt("Enter new password:");
            let url = 'http://localhost:8080/user/user?id=';
            url += user.userId + "&name=" + userName + "&balance=" + user.userBalance;
            url += "&password=" + password;
            fetch(url, {
                method: 'PUT'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                    alert("Something went wrong!")
                } else {
                    alert("Password has been changed!")
                }
            });
        });
    }
}