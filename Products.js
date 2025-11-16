// Navigation Menu
const ham2 = document.getElementById('ham2');
const links = document.getElementById('links');
const bad = document.getElementById('bad');

const cmenu = () => {
  links.style.top = '-100vh';
  bad.classList.remove('lactive');
  ham2.classList.add('lactive');
};

const menu = () => {
  links.style.top = '10vh';
  bad.classList.add('lactive');
  ham2.classList.remove('lactive');
};

ham2.addEventListener('click', menu);
bad.addEventListener('click', cmenu);

// Toggle Category Dropdown
const triangle = document.getElementById('triangle-down');
const categ = document.querySelector('.categ');
const nona = document.querySelector('.nona');

if (categ && triangle && nona) {
  categ.addEventListener('click', () => {
    triangle.classList.toggle('triangle-toggle');
    nona.classList.toggle('hidden');
  });
}

// Scroll Spy for nav highlighting
let navlinks = document.querySelectorAll('header .links li a');
let sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop) {
      currentSection = section.id;
    }
  });
  
  navlinks.forEach(link => {
    if (link.href.includes(currentSection)) {
      document.querySelector('.active')?.classList.remove('active');
      link.classList.add('active');
    }
  });
});

// Intersection Observer for product fade-in
const prod = document.querySelectorAll('.prod');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, {
  threshold: 0.1
});

prod.forEach(product => {
  observer.observe(product);
});

// Cart Functionality
const produc = document.querySelector('.product')  
const cart = document.querySelector('.cart')  
const carticon = document.querySelector('.cart-icon')  
const addcart = document.querySelectorAll('.addcart')
const cancelcart = document.querySelector('#cancelcart')
const cartsuccess = document.querySelector('.cartsuccess')
const proceed = document.querySelector('.proceed')
let prodimg = document.querySelector('.prodimg')

function remproceed() {
  let cartDetail = document.querySelector('.cart-details')
  const emptycart = document.querySelector('.emptycart')
  if (produc.contains(cartDetail)) {
    emptycart.style.opacity = '0'
    proceed.style.opacity = '1';
  } else {
    emptycart.style.opacity = '1'
    proceed.style.opacity = '0';
  }
}

carticon.addEventListener('click', () => {  
  remproceed()
  cart.classList.toggle('showcart')  
  
})  
cancelcart.addEventListener('click', () => {
  cart.classList.remove('showcart')
})
  
addcart.forEach(carts => {  
  carts.addEventListener('click',  
    event => {
      
      const productElement = event.target.closest('.prod')
      addToCart(productElement)
      cartsuccess.style.transform = 'translateY(0)'
      setTimeout(() => {
      cartsuccess.style.transform = 'translateY(-100%)'},3000)
    
    }  
  )  
})  
  
const updateCartQuantity = () => {  
  const cartQuantity = document.querySelector('.cart-quantity')  
  const cartItems = document.querySelectorAll('.cart-details')  
  cartQuantity.textContent = cartItems.length  
}  
  
const totalupdate = () => {  
  const totalprice = document.querySelector('.totalprice')  
  const cartBoxes = produc.querySelectorAll('.cart-details')  
  let total = 0  
  
  cartBoxes.forEach(cartBox => {  
    const priceElement = cartBox.querySelector('.price')  
    const quantityElement = cartBox.querySelector('.cartnum')  
  
    if (!priceElement || !quantityElement) return  
  
    const pricer = parseFloat(priceElement.textContent.replace(/[^\d.]/g, '').replace(/,/g, ''))  
    const quantity = parseInt(quantityElement.textContent)  
  
    total += pricer * quantity  
  })  
  
  totalprice.textContent = `Total: ₦ ${total.toLocaleString()}`  
}  
  
const saveCartToLocalStorage = () => {  
  const items = []  
  document.querySelectorAll('.cart-details').forEach(cartBox => {  
    items.push({  
      img: cartBox.querySelector('img').src,  
      title: cartBox.querySelector('.product-title').textContent,  
      price: cartBox.querySelector('.price b').textContent,  
      quantity: cartBox.querySelector('.cartnum').textContent  
    })  
  })  
  localStorage.setItem('cartItems', JSON.stringify(items))  
}  
  
const loadCartFromLocalStorage = () => {  
  const storedItems = JSON.parse(localStorage.getItem('cartItems')) || []  
  storedItems.forEach(item => {  
    const fakeProd = document.createElement('div')  
    fakeProd.innerHTML = `<img src="${item.img}"><h3>${item.title}</h3><p>${item.price}</p>`  
    const prodElement = fakeProd  
    addToCart(prodElement, parseInt(item.quantity))  
  })  
}  
  
const addToCart = (prod, quantityOverride = 1) => {  
  const prodimg = prod.querySelector('img').src  
  const prodTitle = prod.querySelector('h3').textContent  
  const prodPrice = prod.querySelector('p').textContent  
  const carterror = document.querySelector('.carterror')  
  const cartitems = produc.querySelectorAll('.product-title')  
  
  for (let item of cartitems) {  
    if (item.textContent === prodTitle) {  
      cartsuccess.style.display = 'none'
      carterror.style.transform = 'translateY(0)'  
      setTimeout(() => {  
        carterror.style.transform = 'translateY(-100%)'  
      }, 3000)  
      return  
      
    }  
    else{
      cartsuccess.style.display = 'block'
    }
  }  
  
  const cartBox = document.createElement('div')  
  cartBox.classList.add('cart-details')  
  cartBox.innerHTML = `  
    <img class='prodimg' srcset="" src="${prodimg}" alt="">  
    <div class="quantity">  
      <h3 class='product-title'>${prodTitle}</h3>  
      <span class="price">  
        <b>${prodPrice}</b><span>  
          <img srcset="" class="deleteprod" src="/F.O.G project/files/icons8-delete-400.png" alt="">  
        </span>  
      </span>  
      <div class="increment">  
        <button id='decrease' type="submit">-</button>  
        <span class='cartnum'>${quantityOverride}</span>  
        <button id='increase' type="submit">+</button>  
      </div>  
    </div>  
  `  
  
  produc.appendChild(cartBox);
updateCartCount(1);
updateCartQuantity();
totalupdate();
saveCartToLocalStorage();
remproceed(); 
  
  cartBox.querySelector('.deleteprod').addEventListener('click', () => {  
    cartBox.remove();
   remproceed();
   updateCartCount(-1)
    updateCartQuantity()  
    totalupdate()  
    saveCartToLocalStorage()  
  })  
  
  const decreaseBtn = cartBox.querySelector('#decrease')
const increaseBtn = cartBox.querySelector('#increase')
const cartnum = cartBox.querySelector('.cartnum')
proceed.addEventListener('click', () => {
  produc.innerHTML = `<h3> Congratulations You have Successfully ordered ✅</h3> <br> ${prodTitle}`
  setTimeout(() => {
  localStorage.clear()
    location.reload()
  },3000)
  
    
  }
  
)
if (parseInt(cartnum.textContent) === 1) {
  decreaseBtn.style.background = 'grey';
} else {
  decreaseBtn.style.background = 'red';
}
decreaseBtn.addEventListener('click', () => {
  
  let quantity = parseInt(cartnum.textContent)
  if (quantity > 1) {
  quantity--
  cartnum.textContent = quantity
  updateCartCount(-1); // ✅ decrement the cart badge count
  decreaseBtn.style.background = quantity === 1 ? 'grey' : 'red'
  totalupdate()
  saveCartToLocalStorage()
  

  }
})

increaseBtn.addEventListener('click', () => {
  let quantity = parseInt(cartnum.textContent)
  quantity++
  cartnum.textContent = quantity
  updateCartCount(1); // ✅ increment the cart badge count
  decreaseBtn.style.background = 'red'
  totalupdate()
  saveCartToLocalStorage()
})

}  
  
// Load cart from storage on page load  
window.addEventListener('DOMContentLoaded', loadCartFromLocalStorage)
 let cartItemCount = 0;

let updateCartCount = change => {
  const cartBadge = document.querySelector('.cart-quantity');
  
  cartItemCount += change;
  cartBadge.textContent = cartItemCount;
  
  // Always show badge if there's 1 or more items
  if (cartItemCount >= 1) {
    cartBadge.style.visibility = 'visible';
  } else {
    cartBadge.style.visibility = 'hidden';
  }
  
  
  
};

document.getElementById('searchInput').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const products = document.querySelectorAll('.prod');

  products.forEach(product => {
    const title = product.querySelector('.product-title')?.innerText.toLowerCase();

    if (title.includes(searchTerm)) {
      product.style.display = 'block'; // show match
    } else {
      product.style.display = 'none'; // hide others
    }
  });
});
const renderProducts = () => {
  const productList = document.querySelector('.product-list');
  const products = JSON.parse(localStorage.getItem('products')) || [];
  
  productList.innerHTML = '';
  
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'prod';
    div.innerHTML = `
      <img src="${product.imgsrc}" alt="${product.name}">
      <h3 class="product-title">${product.name}</h3>
      <p>₦${product.price}</p>
      <button onclick="addToCart('${product.name}', ${product.price}, '${product.imgsrc}')">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
};

window.addEventListener('DOMContentLoaded', () => {
  loadCartFromLocalStorage();
});