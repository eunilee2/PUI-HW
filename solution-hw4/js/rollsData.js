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
headerElement.innerText=rollType+' Cinnamon Roll';

const rollImage=document.querySelector('#rollImage');
rollImage.src='./assets/'+rollType+'-cinnamon-roll.jpg';

const priceElement=document.querySelector('#priceElement');
console.log(priceElement);
const priceObj=rolls[rollType];
console.log(priceObj);
const bunPrice=priceObj['basePrice'];
priceElement.innerText='$'+bunPrice;

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

for (let i=0; i<glazings.length; i++)
{
    let selected=glazings[i];
    let option=document.createElement('option');
    option.text=selected.select;
    option.value=selected.add;
    glazingOptions.add(option);
}

for (let i=0; i<sizes.length; i++)
{
    let selected=sizes[i];
    let option=document.createElement('option');
    option.text=selected.size;
    option.value=selected.multiply;
    sizeOptions.add(option);
}

glazingOptions.addEventListener('change', onSelectValueChange);
sizeOptions.addEventListener('change', onSelectValueChange);

function onSelectValueChange(){
    let glazingPrice=parseFloat(glazingOptions.value);
    let sizePrice=parseFloat(sizeOptions.value);
    let displayPrice=document.querySelector('.price');
    let itemPrice=(bunPrice+glazingPrice)*sizePrice;
    let roundedPrice='$'+itemPrice.toFixed(2);

    displayPrice.innerText=roundedPrice;
}

