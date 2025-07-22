var products = [];
var targetValue = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    AllProducts(products);
  });
/////////////////// hamada product
function AllProducts(products) {
   container = document.querySelector('.product-container');
  container.innerHTML = '';

 for ( i = 0; i < products.length; i++) {
  const product = products[i];

  const card = document.createElement('div');
  card.style.cursor = 'pointer';
  card.className = 'product-card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" width="100" />
    <h3>${product.title}</h3>
    <p>${product.price} $</p>
  `;

  card.addEventListener('click', () => {
    if (!targetValue.includes(product)) {
      targetValue.push(product);
      console.log("Hamada add to cart:", product);

      var productChange = JSON.stringify(targetValue);
      localStorage.setItem("products", productChange);
    } else {
      console.log("Hamada in cart");
    }

    update();
  });

  container.appendChild(card);
}

}
////////////////// card 
function update() {
   cart = document.querySelector('.fa-shopping-cart');
  let counter = cart.querySelector('.cart-counter');
  console.log("counter",counter);
  

  if (!counter) {
    counter = document.createElement('span');
    counter.classList.add('cart-counter');
    cart.appendChild(counter);
  }

  if (targetValue.length > 0) {
    counter.textContent = targetValue.length;
    cart.classList.add('has-items');
  } else {
    counter.textContent = '';
    cart.classList.remove('has-items');
  }
}
////////////////// show name
 name = localStorage.getItem('name');
 nameUser = JSON.parse(name);
console.log("nameUser", nameUser);

if (nameUser) {
   user = document.querySelector('.user'); 
  
  user.innerHTML = `<h3>welcom ${nameUser}</h3>`;

}

/////////////////// search
search=document.querySelector('.search-input').addEventListener('keyup',function(e){

   title = e.target.value.toLowerCase();


 let searchProduct = [];

for (let i = 0; i < products.length; i++) {
  const product = products[i];

  if (product.title.toLowerCase().includes(title)) {
    searchProduct.push(product);
  }
}


 
  AllProducts(searchProduct);
 
  
})
///////////// dark mode, light mode
document.querySelector('.fa-moon').addEventListener('click', function() {
  
  if (document.body.classList.contains('dark-mode')) {
    
    document.body.classList.remove('dark-mode');
    document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black'; 
   

  } else {
    document.body.classList.add('dark-mode');
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  }
});






