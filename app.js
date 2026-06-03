let products = JSON.parse(localStorage.getItem('products')) || [
{name:'Hamburguesa',price:120},
{name:'Pizza',price:180},
{name:'Refresco',price:35}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function save(){
localStorage.setItem('products',JSON.stringify(products));
localStorage.setItem('cart',JSON.stringify(cart));
}

function toast(msg){
const t=document.getElementById('toast');
t.innerText=msg;
t.style.display='block';
setTimeout(()=>t.style.display='none',2500);
}

function renderProducts(){
const div=document.getElementById('products');
div.innerHTML='';
products.forEach((p,i)=>{
div.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>$${p.price}</p>
<button class="primary" onclick="addToCart(${i})">Agregar al carrito</button>
</div>`;
});
}

function addToCart(i){
cart.push(products[i]);
save();
toast('Producto agregado');
}

function show(id){
['home','cartView','adminLogin','adminPanel'].forEach(x=>
document.getElementById(x).classList.add('hidden')
);
document.getElementById(id).classList.remove('hidden');
}

function openCart(){
show('cartView');
renderCart();
}

function renderCart(){
let total=0;
const div=document.getElementById('cartItems');
div.innerHTML='';

cart.forEach((p,i)=>{
total+=p.price;

div.innerHTML+=`
<div class="item">
<span>${p.name} - $${p.price}</span>
<button onclick="removeItem(${i})">❌</button>
</div>`;
});

document.getElementById('total').innerText='Total: $'+total;
}

function removeItem(i){
cart.splice(i,1);
save();
renderCart();
}

function finishPurchase(){
cart=[];
save();
show('home');
toast('Compra realizada');
}

function showAdminLogin(){

show('adminLogin');

if(/Android|iPhone|iPad/i.test(navigator.userAgent)){
document.getElementById('desktopLogin').style.display='none';
document.getElementById('mobileLogin').style.display='block';
}else{
document.getElementById('desktopLogin').style.display='block';
document.getElementById('mobileLogin').style.display='none';
}

}

function fingerprintLogin(){

if(confirm('¿Huella reconocida?')){
openAdmin();
}else{
toast('No eres administrador');
}

}

function passwordLogin(){

if(document.getElementById('password').value === 'admin123'){
openAdmin();
}else{
toast('Contraseña incorrecta');
}

}

function openAdmin(){
show('adminPanel');
renderAdmin();
}

function renderAdmin(){

const div=document.getElementById('adminProducts');

div.innerHTML='<h3>Productos registrados</h3>';

products.forEach((p,index)=>{

div.innerHTML+=`
<div class="item">
<span>${p.name} - $${p.price}</span>
<button onclick="deleteProduct(${index})">🗑️</button>
</div>`;

});

}

function deleteProduct(i){

products.splice(i,1);

save();
renderProducts();
renderAdmin();

}

function addProduct(){

const name=document.getElementById('name').value;
const price=Number(document.getElementById('price').value);

if(!name || !price){
toast('Completa los campos');
return;
}

products.push({
name,
price
});

save();
renderProducts();
renderAdmin();

document.getElementById('name').value='';
document.getElementById('price').value='';

toast('Producto agregado');

}

renderProducts();
