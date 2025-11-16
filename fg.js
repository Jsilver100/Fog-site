const ham2 = document.getElementById('ham2')  
const links = document.getElementById('links')  
const bad = document.getElementById('bad')  
  
const cmenu = () => {  
  links.style.top = '-100vh'  
  bad.classList.remove('lactive')  
  ham2.classList.add('lactive')  
}  
  
const menu = () => {  
  links.style.top = '10vh'  
  bad.classList.add('lactive')  
  ham2.classList.remove('lactive')  
}  
  
ham2.addEventListener('click', menu)  
bad.addEventListener('click', cmenu)  
  
const slides = document.querySelectorAll('.video-slide');  
const segments = document.querySelectorAll('.progress-fill');  
let current = 0;  
let autoSlideTimeout;  
  
function resetAllSegments() {  
  segments.forEach(segment => {  
    segment.style.transition = 'none';  
    segment.style.width = '0%';  
  });  
}  
  
function animateCurrentSegment(duration) {  
  const segment = segments[current];  
  segment.style.transition = 'none';  
  segment.style.width = '0%';  
    
  setTimeout(() => {  
    segment.style.transition = `width ${duration * 1000}ms linear`;  
    segment.style.width = '100%';  
  }, 50);  
}  
  
function showVideo(index) {  
  slides.forEach((slide, i) => {  
    slide.classList.toggle('active', i === index);  
  });  
    
  const contents = document.querySelectorAll('.content');  
  contents.forEach((content, i) => {  
    content.classList.toggle('active', i === index);  
  });  
    
  resetAllSegments();  
    
  const video = slides[index].querySelector('video');  
    
  video.pause();  
  video.currentTime = 0;  
  video.load();  
    
  if (video.readyState >= 1) {  
    startProgress(video);  
  } else {  
    video.addEventListener('loadedmetadata', () => {  
      startProgress(video);  
    });  
  }  
}  
  
function startProgress(video) {  
  const duration = video.duration || 5;  
    
  setTimeout(() => {  
    video.play();  
    animateCurrentSegment(duration);  
  }, 3000);  
    
  clearTimeout(autoSlideTimeout);  
  autoSlideTimeout = setTimeout(() => {  
    nextVideo();  
  }, (duration * 1000) + 3000);  
}  
  
function nextVideo() {  
  current = (current + 1) % slides.length;  
  showVideo(current);  
}  
  
function startAutoSlide() {  
  clearTimeout(autoSlideTimeout);  
  showVideo(current);  
}  
  
let touchStartX = 0;  
let touchEndX = 0;  
  
function handleSwipe() {  
  if (touchEndX < touchStartX - 50) {  
    nextVideo();  
  } else if (touchEndX > touchStartX + 50) {  
    current = (current - 1 + slides.length) % slides.length;  
    showVideo(current);  
  }  
}  
  
document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {  
  touchStartX = e.changedTouches[0].screenX;  
});  
  
document.querySelector('.carousel-container').addEventListener('touchend', (e) => {  
  touchEndX = e.changedTouches[0].screenX;  
  handleSwipe();  
});  
  
startAutoSlide();  
  
const triangle = document.getElementById('triangle-down')  
const categ = document.querySelector('.categ')  
const nona = document.querySelector('.nona')  
  
categ.addEventListener('click', () => {  
  triangle.classList.toggle('triangle-toggle')  
  nona.classList.toggle('hidden')  
})  
  
let navlinks = document.querySelectorAll('header .links li a ')  
let sections = document.querySelectorAll('section')  
const prod = document.querySelectorAll('.prod')  
const product = document.getElementById('Products')  
  
window.addEventListener('scroll',  
  () => {  
    let currentSection = 'home'  
    sections.forEach(section =>  
    {  
      if (window.scrollY >= section.offsetTop - 100) {  
        currentSection = section.id;  
      }  
    })  
    navlinks.forEach(links => {  
      if (links.href.includes(currentSection)) {  
        document.querySelector('.active').classList.remove('active')  
        links.classList.add('active')  
      }  
    })  
  })  
  
const observer = new IntersectionObserver(  
  entries => {  
    entries.forEach(  
      entry => {  
        entry.target.classList.toggle('show', entry.isIntersecting)  
      }  
    )  
  }, {  
    threshold: .3,  
  }  
)  
  
prod.forEach(product => {  
  observer.observe(product)  
})  
  
navlinks.forEach(links => {  
  links.addEventListener('click', () => {  
    document.querySelector('.active').classList.remove('active')  
    links.classList.add('active')  
  })  
})  
  
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