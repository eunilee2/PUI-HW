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

let glazingOptions=document.querySelector('#glazingOptions');
let sizeOptions=document.querySelector('#sizeOptions');
const glazingSelect=document.querySelector('select#glazingOptions');
const sizeSelect=document.querySelector('select#sizeOptions');


for (let i=0; i<glazings.length; i++)
{
    let selected=glazings[i];
    let option=document.createElement('option');
    option.text=selected.select;
    option.value=selected.add;
    if (option!=null){
        // glazingOptions.add(option);
        glazingSelect.appendChild(option);
    }
}

for (let i=0; i<sizes.length; i++)
{
    let selected=sizes[i];
    let option=document.createElement('option');
    option.text=selected.size;
    option.value=selected.multiply;
    // sizeOptions.add(option);
    if (option!=null){
        sizeSelect.appendChild(option);
    }
   
}

glazingOptions.addEventListener('change', onSelectValueChange);
sizeOptions.addEventListener('change', onSelectValueChange);

function onSelectValueChange(){
    const bunPrice=getPrice(rollType);
    let glazingPrice=parseFloat(glazingOptions.value);
    let sizePrice=parseFloat(sizeOptions.value);
    let displayPrice=document.querySelector('.price');
    let itemPrice=(bunPrice+glazingPrice)*sizePrice;
    let roundedPrice='$'+itemPrice.toFixed(2);

    displayPrice.innerText=roundedPrice;
}

//Add to cart

class Roll {

    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const rollCart=new Set();

function addNewRoll(rollType, rollGlazing, packSize, basePrice){
    console.log(glazingOptions);
    console.log(sizeOptions);
    const glazeSelectVal= glazingSelect.option[glazingSelect.selectedIndex].text;
    const sizeSelectVal=sizeSelect.option[sizeSelect.selectedIndex].text;
    const item=new Roll(rollType, glazeSelectVal, sizeSelectVal, getPrice());
    rollCart.add(item);
    console.log(item);
    console.log(rollCart);
    return rollCart;
}

console.log(rollCart);