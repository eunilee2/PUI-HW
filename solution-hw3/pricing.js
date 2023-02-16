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


for (let i=0; i<glazings.length; i++)
{
    let selected=glazings[i];
    let option=document.createElement('option');
    option.text=selected.select;
    option.value=selected.add;
    glazingOptions.add(option);
}

let sizeOptions=document.querySelector('#sizeOptions');

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
    const bunPrice=2.49;
    let displayPrice=document.querySelector('.price');
    let itemPrice=(bunPrice+glazingPrice)*sizePrice;
    let roundedPrice='$'+itemPrice.toFixed(2);

    displayPrice.innerText=roundedPrice;
}