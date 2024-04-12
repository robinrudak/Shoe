const shoes = [
  {
    id: 1,
    gender: 'male',
    brand: 'Nike',
    style: 'sports',
    name: 'Nike Air Max',
    price: 80,
    inventory: [
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 2 }
    ]
  },
  {
    id: 2,
    gender: 'female',
    brand: 'Adidas',
    style: 'casual',
    name: 'Adidas Superstar',
    price: 70,
    inventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 }
    ]
  },
  {
    id: 3,
    gender: 'male',
    brand: 'Puma',
    style: 'formal',
    name: 'Puma Classic',
    price: 60,
    inventory: [
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 }
    ]
  },
  {
    id: 4,
    gender: 'female',
    brand: 'Nike',
    style: 'sports',
    name: 'Nike Flex',
    price: 90,
    inventory: [
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 }
    ]
  },
  {
    id: 5,
    gender: 'male',
    brand: 'Adidas',
    style: 'casual',
    name: 'Adidas Gazelle',
    price: 85,
    inventory: [
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 2 }
    ]
  },
  {
    id: 6,
    gender: 'female',
    brand: 'Puma',
    style: 'sports',
    name: 'Puma Ignite',
    price: 75,
    inventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 }
    ]
  },
  {
    id: 7,
    gender: 'male',
    brand: 'Nike',
    style: 'formal',
    name: 'Nike Tanjun',
    price: 70,
    inventory: [
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 }
    ]
  },
  {
    id: 8,
    gender: 'female',
    brand: 'Adidas',
    style: 'sports',
    name: 'Adidas Ultraboost',
    price: 100,
    inventory: [
      { size: 6, quantity: 2 },
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 }
    ]
  },
  {
    id: 9,
    gender: 'male',
    brand: 'Puma',
    style: 'casual',
    name: 'Puma Suede',
    price: 80,
    inventory: [
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 },
      { size: 10, quantity: 2 }
    ]
  },
  {
    id: 10,
    gender: 'female',
    brand: 'Nike',
    style: 'formal',
    name: 'Nike Revolution',
    price: 65,
    inventory: [
      { size: 7, quantity: 2 },
      { size: 8, quantity: 2 },
      { size: 9, quantity: 2 }
    ]
  },
];

let balance = 200;
const cart = [];

let getRequest = new XMLHttpRequest();
getRequest.open("GET", "http://localhost:8080/Shoes/all");
getRequest.responseType = "json";
getRequest.onload = function() {
  if (getRequest.status == 200){
    shoes = getRequest.response;
  } else {
    console.log("Oh, no!");
  }
};
getRequest.send();
function submitForm() {
  const name = document.getElementById('nameinput').value;
  const size = document.getElementById('sizeinput').value;
  const brand = document.getElementById('brandinput').value;
  const gender = document.getElementById('genderinput').value;
  const style = document.getElementById('styleinput').value;
  const photo = document.getElementById('photoinput').value;

  const formData = new URLSearchParams();
  formData.append('name', name);
  formData.append('size', size);
  formData.append('brand', brand);
  formData.append('gender', gender);
  formData.append('style', style);
  formData.append('photo', photo);

  const posturl = "http://localhost:8080/shoe?" + formData.toString();

  let postRequest = new XMLHttpRequest();
  postRequest.open("POST", posturl);
  postRequest.setRequestHeader("Content-Type", "application/json");
  postRequest.onload = function() {
    if (postRequest.status == 201) {
      console.log("POST request successful!");
    } else {
      console.log("Error:", postRequest.status);
    }
  };
  postRequest.send();
}

let putData = { /* Put your PUT request data here */ };


putButton.addEventListener("click", function(event) {
    let id = idToUpdate.value;

    let request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:8080/shoe" + id);
    request.setRequestHeader("Content-Type", "application/json");
    request.responseType = "json";
    request.onload = function() {
        if (request.status == 200) {
            console.log("PUT request successful!");
        } else {
            console.log("Error:", request.status);
        }
    };
    request.send();
});

let deleteRequest = new XMLHttpRequest();
deleteRequest.open("DELETE", "http://localhost:8080/shoe");
deleteRequest.responseType = "json";
deleteRequest.onload = function() {
  if (deleteRequest.status == 204) {
    console.log("DELETE request successful!");
  } else {
    console.log("Oh, no!");
  }
};
deleteRequest.send();

function filterShoes() {
  const gender = document.getElementById('gender').value;
  const brand = document.getElementById('brand').value;
  const style = document.getElementById('style').value;
  const size = document.getElementById('size-filter').value;

  let filteredShoes = shoes.filter(shoe =>
    (gender === 'all' || shoe.gender === gender) &&
    (style === 'all' || shoe.style === style) &&
    (size === 'all' || shoe.inventory.some(item => item.size === parseInt(size)))
  );

  if (brand !== 'all') {
    filteredShoes = filteredShoes.filter(shoe => shoe.brand === brand);
  }

  displayShoes(filteredShoes);
}

function displayShoes(shoes) {
  const shoeList = document.getElementById('shoe-list');
  shoeList.innerHTML = '';

  shoes.forEach(shoe => {
    const shoeItem = document.createElement('div');
    shoeItem.classList.add('shoe-item');
    let stockStatus = 'Size: ';
    if (shoe.inventory.every(item => item.quantity === 0)) {
      stockStatus = 'Out of Stock';
    }
    shoeItem.textContent = `${shoe.brand} - ${shoe.name} | Sizes: ${shoe.inventory.map(item => item.size).join(', ').replace(/,/g, ', ')} | Price: $${shoe.price} | ${stockStatus}`;
    const sizeDropdown = document.createElement('select');
    shoe.inventory.forEach(item => {
      const option = document.createElement('option');
      option.value = item.size;
      option.textContent = item.size;
      sizeDropdown.appendChild(option);
    });
    shoeItem.appendChild(sizeDropdown);
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => addToCart(shoe, sizeDropdown.value));
    shoeItem.appendChild(addButton);
    shoeList.appendChild(shoeItem);
  });
}

function addToCart(shoe, selectedSize) {
  const selectedInventory = shoe.inventory.find(item => item.size === parseInt(selectedSize));
  if (selectedInventory && selectedInventory.quantity > 0) {
    selectedInventory.quantity--;
    const selectedShoe = { ...shoe, selectedSize: parseInt(selectedSize) };
    cart.push(selectedShoe);
    updateCart();
  } else {
    alert('This size is not available for this shoe or it is out of stock.');
  }
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.brand} - ${item.name} | Size: ${item.selectedSize} | Price: $${item.price}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(index));
    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });

  const cartSection = document.getElementById('cart');
  cartSection.style.display = 'block';
}

function removeFromCart(index) {
  const removedShoe = cart[index];
  const removedInventory = removedShoe.inventory.find(item => item.size === removedShoe.selectedSize);
  removedInventory.quantity++;
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.price;
  });

  if (totalPrice > balance) {
    alert('Insufficient funds!');
    return;
  }

  balance -= totalPrice;
  cart.length = 0;
  updateCart();
  document.getElementById('balance-amount').textContent = balance;
  alert('Checkout successful!');
}

function populateSizeDropdown() {
  const sizeDropdown = document.getElementById('size-filter');
  const allSizes = shoes.flatMap(shoe => shoe.inventory.map(item => item.size));
  const uniqueSizes = [...new Set(allSizes)];

  uniqueSizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size;
    sizeDropdown.appendChild(option);
  });
}
populateSizeDropdown();
displayShoes(shoes);
