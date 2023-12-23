const BaseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const selectAll = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selectAll) {
  for (let country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;
    if (select.name === "from" && country === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && country === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}
const updateAmount = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
  }
  const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
  const data = await fetch(URL);
  const response = await data.json();
  let rate = response[toCurr.value.toLowerCase()];
  let finalAmount = rate * amountValue;
  msg.innerHTML = `${amountValue} ${fromCurr}=${finalAmount} ${toCurr}`;
};

const updateFlag = (elememt) => {
  let currCode = elememt.value;
  let currenyCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${currenyCode}/flat/64.png`;
  let img = elememt.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateAmount();
});

window.addEventListener("load", () => {
  updateAmount();
});
