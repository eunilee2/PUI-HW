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
const rollType = params.get(‘roll’);
console.log(rollType);



const headerElement=document.querySelector('#headerElement');
headerElement.innerText=rollType+' Cinnamon Roll';

const rollImage=document.querySelector('#rollImage');
rollImage.src='./assets/'+rollType+'-cinnamon-roll.jpg';