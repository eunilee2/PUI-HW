let bunPrice=2.49;

function glazingChange(element){
    glazingValue=document.querySelector('#glazingOptions');
    priceChange=glazingValue.options[glazingValue.selectedIndex].value;
}

document.querySelector('.priceChange').content=priceChange;