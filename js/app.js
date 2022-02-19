const form = document.querySelector("#loan-form");
const loader = document.querySelector("#loader");
const output = document.querySelector("#output");
const btn = document.querySelector("button");

output.style.display = "none";
loader.style.display = "none";

form.addEventListener("submit", (e) => {
  loader.style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults(e) {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    loader.style.display = "none";
    output.style.display = "block";
    // setTimeout(removeLoader, 2000);

    // setTimeout(outputTime, 2000);
  } else {
    loader.style.display = "none";
    showError("Заполните все поля");
  }
}

function showError(error) {
  const errorMessage = document.createElement("div");

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errorMessage.className = "alert alert-danger";

  errorMessage.appendChild(document.createTextNode(error));
  heading.appendChild(errorMessage, card);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
