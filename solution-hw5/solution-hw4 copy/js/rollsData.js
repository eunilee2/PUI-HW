//Updating Detail Page

const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

const cart=[];

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
console.log(rollType);


const headerElement=document.querySelector('#headerElement');
if (headerElement){
    headerElement.text=rollType+' Cinnamon Roll';
};


const rollImage=document.querySelector('#rollImage');
if(rollImage){
rollImage.src='./assets/'+rollType+'-cinnamon-roll.jpg';
};

const priceElement=document.querySelector('#priceElement');
console.log(priceElement);
const priceObj=rolls[rollType];
console.log(priceObj);

function getPrice(){
    for (var roll in rolls){
        if (roll==rollType){
            const bunPrice=priceObj.basePrice;
            return bunPrice;
        }
    }
}

if (priceElement){
    priceElement.innerText='$'+getPrice();
}



//From original js/pricing.js file
let glazings=[
    {select:'Keep original', add:0.00},
    {select:'Sugar milk', add:0.00},
    {select:'Vanilla milk', add:0.50},
    {select:'Double chocolate', add:1.50}
]

let sizes=[
    {size:1,multiply:1},
    {size:3,multiply:3},
    {size:6,multiply:5},
    {size:12,multiply:10},
]

let chooseGlaze=document.querySelector('#glazingOptions');
let chooseSize=document.querySelector('#sizeOptions');
const glazingSelect=document.querySelector('select#glazingOptions');
const sizeSelect=document.querySelector('select#sizeOptions');


for (let i=0; i<glazings.length; i++)
{
    let selected=glazings[i];
    let option=document.createElement('option');
    option.text=selected.select;
    option.value=selected.add;
    if (option!=null){
        chooseGlaze.add(option);
        // glazingSelect.appendChild(option);
    }
}

for (let i=0; i<sizes.length; i++)
{
    let selected=sizes[i];
    let option=document.createElement('option');
    option.text=selected.size;
    option.value=selected.multiply;
    if (option!=null){
        chooseSize.add(option);
        // sizeSelect.appendChild(option);
    }
   
}

chooseGlaze.addEventListener('change', onSelectValueChange);
chooseSize.addEventListener('change', onSelectValueChange);

function onSelectValueChange(){
    const bunPrice=getPrice(rollType);
    let glazingPrice=parseFloat(chooseGlaze.value);
    let sizePrice=parseFloat(chooseSize.value);
    let displayPrice=document.querySelector('.price');
    let itemPrice=(bunPrice+glazingPrice)*sizePrice;
    let roundedPrice='$'+itemPrice.toFixed(2);

    displayPrice.innerText=roundedPrice;
}

// Updating Cart

document.querySelector('#checkout').addEventListener('click', updateCart);

function updateCart(){
    let glazeIndex=chooseGlaze.selectedIndex;
    let glazeChoice=glazeOptions[glazeIndex];

    let sizeIndex=choosePack.selectedIndex;
    let sizeChoice=sizeOptions[sizeIndex];

    let choiceRoll= new Roll(rollType, glazeChoice.glaze, sizeChoice.size, 
        rollPrice);
    cart.push(choiceRoll);
}


//Add to cart

class Roll {

    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        let glazingPrice=parseFloat(chooseGlaze.value);
        let sizePrice=parseFloat(chooseSize.value);
        this.itemPrice=(basePrice+glazingPrice)*sizePrice;
    }
}

const rollCart=new Set();

function addNewRoll(rollType, rollGlazing, packSize, basePrice){
    const item=new Roll(rollType, rollGlazing, packSize, basePrice);
    rollCart.add(item);
    return item;
}

function editCart(roll){
    const cart=document.querySelector('#cartEditor');
    const clone =template.content.cloneNode(true);
    roll.element.clone.querySelector('#rollItem')

    function deleteRoll(){
        roll.element.remove(roll);
        rollCart.delete(roll);
        updatePrice();
    }

    const removeButton=roll.element.querySelector('#delete');
    removeButton.addEventListender('click', deleteRoll);

    const cartAll=document.querySelector('#cartAll');
    cartAll.append(roll.element);
    updateCartPage(roll);
    updatePrice();
}

function updatePrice(){
    let totalPrice=document.getElementById("rollPrice");
    let totalPriceVal=0;
    if (cart.size==0){
        totalPrice.innerHTML=='$0.00';
    }
    else{
        for (const roll of rollCart){
            totalPriceVal+=Number(roll.itemPrice);
            let totalPriceText="$"+Number(totalPriceVal.toFixed(2));
            totalPrice.innerHTML=totalPriceText;
        }
    }
}

function updateCartPage(roll){
    const rollImg=roll.element.querySelector('#rollImg');
    rollImg.src="assets/"+rolls[roll.type]+".jpg";

    const rollName=roll.element.querySelector('#rollName');
    rollName.innerHTML=roll.type+" Cinnamon Roll";

    const rollGlazing=roll.element.querySelector('#rollGlazing');
    rollGlazing.innerHTML="Glazing: "+roll.glazing;

    const rollSize=roll.element.querySelector('#rollSize');
    rollSize.innerHTML="Pack Size: "+roll.size;

    const rollPrice=roll.element.querySelector('#rollPrice');
    rollPrice.innerHTML="Glazing: "+roll.itemPrice;

    updatePrice();
}

addNewRoll("Original", "Sugar Milk", "1", 2.49);
addNewRoll("Walnut", "Vanilla Sugar", "12", 3.94);
addNewRoll("Raisin", "Sugar Milk", "3", 2.99);
addNewRoll("Apple", "Original", "3", 3.49);

for (const roll of rollCart){
    editCart(roll);
}