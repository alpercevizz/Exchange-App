const data = {
    USD: {EUR:0.82, GBP: 0.74, CHF:0.89, TRY:7.57},
    EUR: {USD:1.23, GBP:0.91, CHF:1.09, TRY:9.23},
    GBP: {USD:1.35, EUR:1.10, CHF: 1.21, TRY:10.29},
    CHF: {USD:1.12, EUR:0.92, GBP:0.83, TRY:8.51},
    TRY: {USD:0.13, EUR:0.11, GBP:0.097, CHF:0.12}
};



const currencyKeys = Object.keys(data);

function createCurrencyElements(elements,root,inputName) {
    for(let i =0; i<elements.length; i++) {
        const currencyKeyDiv    = document.createElement("div");
        const currencyKeyInput  = document.createElement("input");
        currencyKeyInput.setAttribute("type","radio");
        currencyKeyInput.setAttribute("name",inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value",elements[i]);
    
        const currencyKeyLabel  = document.createElement("label");
        currencyKeyLabel.setAttribute("for",inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];
    
        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){
    let fromTarget = document.querySelector("input[name = 'currency_from']:checked");
    let toTarget = document.querySelector("input[name = 'currency_to']:checked");
    
    const amount = document.querySelector("input[name='amount']").value;

    const currencyResult = document.querySelector("#currency-result");

    if(fromTarget && toTarget) {
        fromTarget = fromTarget.value;
        toTarget = toTarget.value;
    

        if(fromTarget == toTarget) {
            currencyResult.innerHTML = "Aynı para birimlerini seçtiniz. Lütfen dönüşüm yapmak için farklı para birimleri seçiniz!";
        }
        
        else if(isNaN(amount) || amount == "") {
            currencyResult.innerHTML = "Lütfen Bir Sayı Giriniz!";
        } 
        else{

        const currentCurrencyObject = data[fromTarget];
        const resultforOne = currentCurrencyObject[toTarget];
        const result = amount * resultforOne;

        
        currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget; 
        }

    }    
    else{
        if(!fromTarget && !toTarget) {
            currencyResult.innerHTML = "Lütfen dönüşüm yapmak istediğiniz para birimlerini seçiniz!";
        }

        else if(!fromTarget) {
            currencyResult.innerHTML = "Hangi para birimini dönüştürmek istediğinizi seçiniz!";
        }

        else if(!toTarget) {
             currencyResult.innerHTML = "Hangi para birimine dönüştürmek istediğinizi seçiniz!";
        }
    }   

});