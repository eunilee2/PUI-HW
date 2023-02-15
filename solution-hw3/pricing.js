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
let index=0;

for (index<glazings.length; index++;)
{
    let selected=glazings[index];
    let option=document.createElement('option');
    option.text=selected.select;
    option.value=selected.add;
    glazingOptions.add(option);
}

for (index<sizes.length; index++;)
{
    let selected=sizes
}



function onSelectValueChange(){
    letglazingPrice=parseFloat(glazingOptions.value);

}