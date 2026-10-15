/*
 * SIMPLO STORE — boutique électronique de démonstration.
 * Configurez votre numéro WhatsApp et vos produits avant publication.
 */
const WHATSAPP_NUMBER = "237655331025"; // WhatsApp officiel Simplo Store.

const products = [
  {id:1,name:"iPhone 18 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Nouveauté",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:2,name:"iPhone 18 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Nouveauté",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:3,name:"iPhone 17 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Premium",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:4,name:"iPhone 17 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Premium",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:5,name:"iPhone 17 Air",category:"iPhone",price:null,emoji:"📱",tag:"Design",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:6,name:"iPhone 16 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:7,name:"iPhone 16 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:8,name:"iPhone 16",category:"iPhone",price:null,emoji:"📱",tag:"Populaire",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:9,name:"iPhone 16e",category:"iPhone",price:null,emoji:"📱",tag:"Essentiel",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:10,name:"iPhone 15 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:11,name:"iPhone 15 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:12,name:"iPhone 15 Plus",category:"iPhone",price:null,emoji:"📱",tag:"Grand écran",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:13,name:"iPhone 15",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:14,name:"iPhone 14 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:15,name:"iPhone 14 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:16,name:"iPhone 14 Plus",category:"iPhone",price:null,emoji:"📱",tag:"Grand écran",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:17,name:"iPhone 14",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:18,name:"iPhone 13 Pro Max",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:19,name:"iPhone 13 Pro",category:"iPhone",price:null,emoji:"📱",tag:"Pro",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:20,name:"iPhone 13",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:21,name:"iPhone 12",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:22,name:"iPhone 11",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:23,name:"iPhone XR",category:"iPhone",price:null,emoji:"📱",tag:"Petit budget",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."},
  {id:24,name:"iPhone XS",category:"iPhone",price:null,emoji:"📱",tag:"Classique",description:"Prix, capacité et disponibilité à confirmer auprès de la boutique."}
];

let activeCategory = "Tous";
let cart = [];
let toastTimeout;
const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");

function formatPrice(value) {
  return value == null ? "Prix à confirmer" : new Intl.NumberFormat("fr-FR", {maximumFractionDigits:0}).format(value) + " FCFA";
}
function filteredProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  return products.filter(p =>
    (activeCategory === "Tous" || p.category === activeCategory) &&
    [p.name,p.category,p.description,p.tag].some(value => value.toLocaleLowerCase("fr").includes(query))
  );
}
function renderProducts() {
  const shown = filteredProducts();
  if (!shown.length) {
    grid.innerHTML = '<div class="empty-state">Aucun produit trouvé. Essayez un autre mot-clé.</div>';
    return;
  }
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-art"><span class="product-tag">${p.tag}</span><span class="product-emoji" aria-hidden="true">${p.emoji}</span></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
        <div class="product-bottom"><span class="price">${formatPrice(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Ajouter ${p.name} au panier">+</button></div>
      </div>
    </article>`).join("");
}
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}
function addToCart(id) {
  const item = cart.find(entry => entry.id === id);
  if (item) item.quantity++;
  else cart.push({id,quantity:1});
  updateCart();
  notify("Ajouté à votre panier.");
}
function updateCart() {
  cartCount.textContent = cart.reduce((sum,item) => sum + item.quantity, 0);
  const container = document.querySelector("#cartItems");
  if (!cart.length) container.innerHTML = '<div class="cart-empty">Votre panier est encore vide.</div>';
  else container.innerHTML = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `<div class="cart-line"><div><p>${p.name}</p><small>${formatPrice(p.price)} / unité</small></div>
      <div class="quantity-controls"><button data-change="${p.id}" data-delta="-1" aria-label="Retirer une unité">−</button><span>${item.quantity}</span><button data-change="${p.id}" data-delta="1" aria-label="Ajouter une unité">+</button></div></div>`;
  }).join("");
  const hasUnknownPrice = cart.some(item => products.find(p => p.id === item.id).price == null);
  const total = cart.reduce((sum,item) => sum + (products.find(p => p.id === item.id).price || 0) * item.quantity, 0);
  document.querySelector("#cartTotal").textContent = hasUnknownPrice ? "À confirmer sur WhatsApp" : formatPrice(total);
}
function changeQuantity(id,delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.quantity += delta;
  cart = cart.filter(entry => entry.quantity > 0);
  updateCart();
}
function orderOnWhatsApp() {
  if (!cart.length) { notify("Ajoutez d'abord un produit au panier."); return; }
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER) || WHATSAPP_NUMBER === "237000000000") {
    notify("Configurez votre numéro WhatsApp dans script.js.");
    return;
  }
  const lines = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `• ${p.name} x${item.quantity} — prix à confirmer`;
  });
  const message = `Bonjour Simplo Store ! Je souhaite connaître le prix et la disponibilité de :\n${lines.join("\n")}\n\nMerci de confirmer les capacités, couleurs et prix en FCFA. Je peux passer à la boutique située à l’Avenue Kennedy.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

document.querySelector("#filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter").forEach(el => el.classList.toggle("active", el === button));
  renderProducts();
});
searchInput.addEventListener("input",renderProducts);
grid.addEventListener("click",event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(Number(button.dataset.add));
});
document.querySelector("#cartButton").addEventListener("click",() => document.querySelector("#cartDialog").showModal());
document.querySelector("#closeCart").addEventListener("click",() => document.querySelector("#cartDialog").close());
document.querySelector("#cartItems").addEventListener("click",event => {
  const button = event.target.closest("[data-change]");
  if (button) changeQuantity(Number(button.dataset.change),Number(button.dataset.delta));
});
document.querySelector("#checkoutButton").addEventListener("click",orderOnWhatsApp);
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contactLink").href = `https://wa.me/${WHATSAPP_NUMBER}`;
renderProducts();
updateCart();
