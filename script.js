var products = [];
var targetValue = [];

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

function renderProducts(products) {
  const container = document.querySelector('.product-container');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.style.cursor='pointer'
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" width="100" />
      <h3>${product.title}</h3>
      <p>${product.price} $</p>
    `;

   
    card.addEventListener('click', () => {

      if (!targetValue.includes(product)) {
        targetValue.push(product);
        console.log("Added to cart:", product);
       var PreProduct=JSON.stringify (targetValue);

        localStorage .setItem("products",PreProduct)
      } else {
        console.log("Already in cart");
      }
      updateShoppingCartIcon();
    });

    container.appendChild(card);
  });
}

function updateShoppingCartIcon() {
  const shoppingCart = document.querySelector('.fa-shopping-cart');
  let counter = shoppingCart.querySelector('.cart-counter');

  if (!counter) {
    counter = document.createElement('span');
    counter.classList.add('cart-counter');
    shoppingCart.appendChild(counter);
  }

  if (targetValue.length > 0) {
    counter.textContent = targetValue.length;
    shoppingCart.classList.add('has-items');
  } else {
    counter.textContent = '';
    shoppingCart.classList.remove('has-items');
  }
}

const name = localStorage.getItem('name');
const nameUser = JSON.parse(name);
console.log("nameUser", nameUser);

if (nameUser) {
   user = document.querySelector('.user'); 
  
  user.innerHTML = `<h3>welcom ${nameUser}</h3>`;

}


search=document.querySelector('.search-input').addEventListener('keyup',function(e){
  const title = e.target.value.toLowerCase();


  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(title)
  );

 
  renderProducts(filteredProducts);
 
  
})
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






