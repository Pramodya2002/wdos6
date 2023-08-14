// JavaScript code to handle user interactions and dynamically update the page

const guestsTable = document.getElementById("guestsTable");

const durationSelect = document.getElementById("time-duration");

const summaryTable = document.getElementById("summaryTable");

const date = document.getElementById("selected-date");

 

// Function to update the summary table based on user inputs

function updateSummaryTable() {

  // Get selected date from local storage

  // var getDate = localStorage.getItem("selectedDate") || "<current_date>";

  const selectedDuration = Array.from(durationSelect.selectedOptions);

  const selectedValues = selectedDuration.map((option) => option.value);

  const selectedDate = date?.value;

 

  // Get ticket quantities from local storage

  let ticketQuantities = {

    "SL Adult": localStorage.getItem("SL Adult") || "0",

    "SL Child": localStorage.getItem("SL Child") || "0",

    "Foreign Adult": localStorage.getItem("Foreign Adult") || "0",

    "Foreign Child": localStorage.getItem("Foreign Child") || "0",

    Infant: localStorage.getItem("Infant") || "0",

  };

 

  const peakHourList = [

    "10:00-11:00",

    "11:00-12:00",

    "12:00-13:00",

    "15:00-16:00",

    "16:00-17:00",

    "17:00-18:00",

  ];

 

  const peakHours = selectedDuration.filter((option) =>

    peakHourList.includes(option.value)

  );

  const normalHours = selectedDuration.filter(

    (option) => !peakHourList.includes(option.value)

  );

  var numOfPeakHours, numOfNormalHours;

  Boolean(Object.keys(peakHours))

    ? (numOfPeakHours = peakHours.length)

    : (numOfPeakHours = 0);

  Boolean(Object.keys(normalHours))

    ? (numOfNormalHours = normalHours.length)

    : (numOfNormalHours = 0);

 

  // Calculate charges for each ticket category

  let charges = {

    "SL Adult":

      ticketQuantities["SL Adult"] *

      (numOfPeakHours * 6 + numOfNormalHours * 4),

    "SL Child":

      ticketQuantities["SL Child"] *

      (numOfPeakHours * 3 + numOfNormalHours * 2),

    "Foreign Adult":

      ticketQuantities["Foreign Adult"] *

      (numOfPeakHours * 13 + numOfNormalHours * 10),

    "Foreign Child":

      ticketQuantities["Foreign Child"] *

      (numOfPeakHours * 8 + numOfNormalHours * 5),

    Infant: 0, // Infants (SL or Foreign) are free

  };

 

  // Calculate total payable amount

  let totalPayable = 0;

  for (const ticket in charges) {

    totalPayable += charges[ticket];

  }

 

  var hour1, hour2, hourStart, hourEnd;

 

  Boolean(Object.keys(selectedValues).length)

    ? (hour1 = selectedValues[0])

    : (hour1 = 0);

  Boolean(Object.keys(selectedValues).length)

    ? (hourStart = hour1.slice(0, 5))

    : (hourStart = localStorage.getItem("hourStart"));

  Boolean(Object.keys(selectedValues).length)

    ? (hour2 = selectedValues[selectedValues.length - 1])

    : (hour2 = 0);

  Boolean(Object.keys(selectedValues).length)

    ? (hourEnd = hour2.slice(6))

    : (hourEnd = "12.00");

 

  localStorage.setItem("hourStart", hourStart);

  localStorage.setItem("hourEnd", hourEnd);

 

  // Update the summary table

  summaryTable.innerHTML = `

    <tr>

      <td>Date</td>

      <td>${

        selectedDate ? selectedDate : localStorage.getItem("selectedDate")

      }</td>

    </tr>

    <tr>

      <td> Time</td>

      <td  id="times">${hourStart + "-" + hourEnd}</td>

    </tr>

    <tr>

      <td>Duration</td>

      <td id="durations">

      ${

        selectedValues.length +

        " hours " +

        numOfNormalHours +

        " normal " +

        numOfPeakHours +

        " peak"

      }</td>

    </tr>

    <tr>

      <td>Tickets</td>

      <td>Charges</td>

    </tr>

    ${Object.keys(charges)

      .map(

        (ticket) => `<tr><td>${ticket}</td><td>$${charges[ticket]}</td></tr>`

      )

      .join("")}

     

      <td>Total Payable</td>

      <td id="totals"> $${totalPayable}</td>

    </tr>

   

  `;

}

 

durationSelect.addEventListener("click", function (event) {

  event.preventDefault();

});

 

// Add an event listener to the select element to handle multiple selections using the Shift key

let lastSelectedIndex = null;

 

// Function to handle changes in the duration selection

durationSelect.addEventListener("change", (event) => {

  updateSummaryTable();

});

 

date.addEventListener("change", () => {

  localStorage.setItem("selectedDate", date?.value);

  updateSummaryTable();

});

 

// Function to handle changes in ticket quantities

guestsTable.addEventListener("change", (event) => {

  const ticketType = event.target.dataset.ticketType;

  const ticketQuantity = event.target.value;

  localStorage.setItem(ticketType, ticketQuantity);

  updateSummaryTable();

});

 

// Function to handle initial page load

function onPageLoad() {

  // Check if the selected date exists in local storage

  const selectedDate = localStorage.getItem("selectedDate");

  if (selectedDate) {

    // Update the calendar with the selected date

    // Code to update the calendar will be added here

  } else {

    // If no selected date in local storage, set current date

    localStorage.setItem("selectedDate", "<current_date>");

  }

 

  // Populate the guests table with initial ticket quantities

  guestsTable.innerHTML = `

    <tr>

      <td>SL Adult</td>

      <td><input type="number" data-ticket-type="SL Adult" value="${

        localStorage.getItem("SL Adult") || 0

      }"></td>

    </tr>

    <tr>

      <td>SL Child</td>

      <td><input type="number" data-ticket-type="SL Child" value="${

        localStorage.getItem("SL Child") || 0

      }"></td>

    </tr>

    <tr>

      <td>Foreign Adult</td>

      <td><input type="number" data-ticket-type="Foreign Adult" value="${

        localStorage.getItem("Foreign Adult") || 0

      }"></td>

    </tr>

    <tr>

      <td>Foreign Child</td>

      <td><input type="number" data-ticket-type="Foreign Child" value="${

        localStorage.getItem("Foreign Child") || 0

      }"></td>

    </tr>

    <tr>

      <td>Infant</td>

      <td>Free</td>

    </tr>

  `;

 

  // Populate the duration drop-down menu with options

  // Code to generate duration options will be added here

 

  // Update the summary table on initial page load

  updateSummaryTable();

}

 

// Call onPageLoad function on initial page load

onPageLoad();

 

// Function to store the inputs in session storage

function storetableToSession() {

    // Get the values from the input fields

    const timesele = document.getElementById('times');

    const totalsele = document.getElementById('totals');

    const durationsele = document.getElementById('durations');

 

    const times = timesele.textContent;

    const totals = totalsele.textContent;

    const durations = durationsele.textContent;

   

 

    // Store the values in session storage

    sessionStorage.setItem('time', times);

    sessionStorage.setItem('total', totals);

    sessionStorage.setItem('duration', durations);

   

  }

 

   // Selecting form and input elements
const form = document.querySelector("form");
const passToggleBtn = document.getElementById("pass-toggle-btn");
// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}
// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();
    // Retrieving input elements
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmemail");
    const phoneInput = document.getElementById("phone");
    const genderInput = document.getElementById("gender");
    // Getting trimmed values from input fields
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const confirmemail = confirmEmailInput.value.trim();
    const gender = genderInput.value;
    const phone = phoneInput.value.trim();
    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const confirmEmailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());
    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (!confirmEmailPattern.test(confirmemail)) {
        showError(confirmEmailInput, "Confirm your email address");
    }
    if (gender === "") {
        showError(genderInput, "Select your gender");
    }
    if (phone === "") {
        showError(phoneInput, "Enter your mobile number");
    }

    


   
    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;
    // Submitting the form
    form.submit();
}

// Handling form submission event
form.addEventListener("submit", handleFormData);

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
