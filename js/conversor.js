// include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/COP";
  
// for selecting different controls
const search = document.getElementById("oamount");
const convert = document.getElementById("convert");
const fromCurrecy = document.getElementById("sel1");
const toCurrecy = document.getElementById("sel2");
const finalValue = document.getElementById("finalValue");
const finalAmount = document.getElementById("finalAmount");
const btnClear = document.getElementById("clear");
let resultFrom = '';
let resultTo = '';
let searchValue = '';

  
// Event when currency is changed
fromCurrecy.addEventListener('change', (e) => {
    resultFrom = `${e.target.value}`;
});
  
// Event when currency is changed
toCurrecy.addEventListener('change', (e) => {
    resultTo = `${e.target.value}`;
});
  

// function for updating value
const updateValue = (e)=> {
    searchValue = e.target.value;
}
 
// function getresults
const getResults = () => {
    fetch(`${api}`)
        .then(data => {
            return data.json();
        }).then(displayResults);
}

// display results after convertion
const displayResults = (currency) => {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML = 
       ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}
  
// when user click on reset button
const clearVal = () => {
    document.getElementById("finalValue").innerHTML = "";
    finalAmount.style.display = "none";
    search.value = '';
    fromCurrecy.selectedIndex = 0;
    toCurrecy.selectedIndex = 0
};

// when user input something, it calls function updateValue 
search.addEventListener('input', updateValue);

// when user clicks, it calls function clearVal 
btnClear.addEventListener('click',clearVal)

// when user clicks, it calls function getresults 
convert.addEventListener("click",getResults);