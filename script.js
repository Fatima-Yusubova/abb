function accordion(event) {
  let clickedElement = event.target 
  let header = clickedElement.closest(".flex")
  let content = header.nextElementSibling
  let arrow = header.querySelector("#arrow  img")


  if (content.style.display === "block") {
    content.style.display = "none"
    arrow.style.transform = "rotate(0deg)" 
  } else {
    content.style.display = "block"
    arrow.style.transform = "rotate(180deg)"
  }
}

const down = document.getElementById('down')
const bar=document.getElementById('bar');
const mark=document.getElementById('mark')
const main = document.querySelector('main')


function bars(){
  if (down.classList.contains("left-full")) {
    down.classList.remove("left-full");
    bar.style.display = "none";
    mark.style.display = "block";
    main.style.display = "none";
  } else {
    down.classList.add("left-full");
    bar.style.display = "block";
    mark.style.display = "none";
    main.style.display = "block";
  }
}


  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const inp1=document.getElementById('inp1')
  const btn1=document.getElementById('btn1')



  inp1.onchange = function(){
   if (inp1.checked) {btn1.classList.add("active")} 
  else{btn1.classList.remove('active')}
}

const loanAmount = document.getElementById("loanAmount")
const loanTerm = document.getElementById("loanTerm")
const loanRate = document.getElementById("interestRate")
const monthlyPayment = document.getElementById('monthlyPayment')
const totalPayment = document.getElementById('totalPayment')
const amount=document.getElementById('amount')
const month=document.getElementById('month')
const percent=document.getElementById('percent')


function updateInput(slider){
 const min=slider.min
 const max=slider.max
 const value=slider.value
 const percentage=((value-min)/(max-min)*100)
 slider.style.setProperty("--percentage", percentage + "%")


 if (slider.id === "loanAmount") amount.innerHTML = slider.value + "AZN";
 else if (slider.id === "loanTerm") month.innerHTML = slider.value + "month";
 else if (slider.id === "interestRate") percent.innerHTML = slider.value + "%";


}


loanAmount.addEventListener("input", () => {
  updateInput(loanAmount)
  calcLoan();
})
updateInput(loanAmount);


loanTerm.addEventListener('input' , () =>{
updateInput(loanTerm)
calcLoan();
})
updateInput(loanTerm)


loanRate.addEventListener('input' , () =>{
  updateInput(loanRate)
  calcLoan();
})
updateInput(loanRate)


function calcLoan(){
  
const principal = Number(loanAmount.value);
const term = Number(loanTerm.value);
const annualRate = Number(loanRate.value);

  const monthlyRate=annualRate/100/12
 let monthlyPay;
  if(monthlyRate>0){
   monthlyPay=principal*monthlyRate*Math.pow(1+monthlyRate, term)/(Math.pow(1+monthlyRate,term)-1)
  }else{
    monthlyPay=principal/term
  }

  const totalPay=monthlyPay*term
  console.log(totalPay)
  console.log(monthlyPay)

  monthlyPayment.innerHTML = monthlyPay.toFixed(2) + "₼"
  totalPayment.innerHTML = totalPay.toFixed(2) + "₼" 
}
calcLoan()

const sellinp=document.getElementById('sellinp')
const sellselect=document.getElementById('sellselect')
const getinp = document.getElementById("getinp")
const getselect = document.getElementById("getselect")


const usdToAzn = 1.7020;
const eurToAzn = 1.7828;
const rubToAzn = 2.0100;

function convertCurrency(event) {
let fromInput
let fromSelect
let toInput
let toSelect;

 if (event.target.id === "sellinp") {
        fromInput = sellinp;
        fromSelect = sellselect;
        toInput = getinp;
        toSelect = getselect;
    } 
  
    else {
        fromInput = getinp;
        fromSelect = getselect;
        toInput = sellinp;
        toSelect = sellselect;
    }

    let fromCurrency = fromSelect.value; 
    let toCurrency = toSelect.value; 
    let amount = parseFloat(fromInput.value); 

if (amount) { 
  let amountInAzn = 0;
 let convertedAmount = 0;


  if (fromCurrency === "USD") {
 amountInAzn = amount * usdToAzn;
 } else if (fromCurrency === "EUR") {
 amountInAzn = amount * eurToAzn;
} else if (fromCurrency === "RUB") {
  amountInAzn = amount * rubToAzn;
 } else {
   amountInAzn = amount; 
    }  
   if (toCurrency === "USD") {
 convertedAmount = amountInAzn / usdToAzn;
 } else if (toCurrency === "EUR") {
   convertedAmount = amountInAzn / eurToAzn;
 } else if (toCurrency === "RUB") {
   convertedAmount = amountInAzn / rubToAzn;
 } else {
  convertedAmount = amountInAzn; 
   }

  toInput.value = convertedAmount.toFixed(2);
 } else {
 toInput.value = "";
    }
}


function updateSelects(event) {

if (changedSelect === "sellselect") {
 let selectedCurrency = sellselect.value;
 if (selectedCurrency !== "AZN") {
 getselect.value = "AZN";
    }
} else if (changedSelect === "getselect") {
    let selectedCurrency = getselect.value;
    if (selectedCurrency !== "AZN") {
sellselect.value = "AZN";
    }
}

    convertCurrency(event); 
}

sellinp.addEventListener("input", convertCurrency);
getinp.addEventListener("input", convertCurrency);
sellselect.addEventListener("change", updateSelects);
getselect.addEventListener("change", updateSelects);
