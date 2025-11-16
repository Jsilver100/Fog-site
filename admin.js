import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuAzy2cMVJs3kL6Bcw21FO28IIgAYL9BI",
  authDomain: "fog-shop-29ca8.firebaseapp.com",
  projectId: "fog-shop-29ca8",
  storageBucket: "fog-shop-29ca8.appspot.com",
  messagingSenderId: "337261074067",
  appId: "1:337261074067:web:4c170aadb8e4d195821f66",
  measurementId: "G-SY9SP77LM8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadForm = document.getElementById("uploadForm");
const productList = document.getElementById("productList");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();

  if (!name || !price || !image) return alert("Fill all fields");

  await addDoc(collection(db, "products"), { name, price, image });
  uploadForm.reset();
  loadProducts();
});

async function loadProducts() {
  productList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "products"));
  snapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.className = "product-item";

    div.innerHTML = `
      <div><strong>${product.name}</strong></div>
      <div>₦${product.price}</div>
      <img src="${product.image}" />
      <div class="action-buttons">
        <button class="edit-btn" onclick="editProduct('${id}', '${product.name}', '${product.price}', '${product.image}')">Edit</button>
        <button class="delete-btn" onclick="deleteProduct('${id}')">Delete</button>
      </div>
    `;

    productList.appendChild(div);
  });
}

window.deleteProduct = async (id) => {
  if (confirm("Delete this product?")) {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  }
};

window.editProduct = async (id, name, price, image) => {
  const newName = prompt("Edit name:", name);
  const newPrice = prompt("Edit price:", price);
  const newImage = prompt("Edit image URL:", image);

  if (!newName || !newPrice || !newImage) {
    alert("All fields are required");
    return;
  }

  await updateDoc(doc(db, "products", id), {
    name: newName,
    price: newPrice,
    image: newImage
  });

  loadProducts();
};

loadProducts();