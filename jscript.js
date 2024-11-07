const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

// Current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Object to store symptoms data
let symptomsData = {};

// Function to render the calendar
function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevLastDay = new Date(currentYear, currentMonth, 0);

  const firstDayIndex = firstDay.getDay();
  const lastDayDate = lastDay.getDate();
  const lastDayIndex = lastDay.getDay();
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 6 - lastDayIndex;

  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let daysHTML = "";

  // Display previous month's days
  for (let x = firstDayIndex; x > 0; x--) {
    daysHTML += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // Display current month's days
  for (let i = 1; i <= lastDayDate; i++) {
    const isToday =
      i === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
        ? "today"
        : "";
    daysHTML += `<div class="day ${isToday}" data-day="${i}">${i}</div>`;
  }

  // Display next month's days
  for (let j = 1; j <= nextDays; j++) {
    daysHTML += `<div class="day next">${j}</div>`;
  }

  daysContainer.innerHTML = daysHTML;
  toggleTodayButton();

  // Add event listeners to each day
  const dayElements = daysContainer.querySelectorAll(".day:not(.prev):not(.next)");
  dayElements.forEach(day => {
    day.addEventListener("click", () => openSymptomInput(day.dataset.day));
  });
}

// Function to open symptom input for a specific day
function openSymptomInput(day) {
  const selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;

  // Get existing symptoms or set as empty
  const existingSymptoms = symptomsData[selectedDate] || "";
  
  const inputSymptoms = prompt(
    `Enter symptoms for ${months[currentMonth]} ${day}, ${currentYear}:`,
    existingSymptoms
  );

  if (inputSymptoms !== null) {  // Update if user didn't cancel
    symptomsData[selectedDate] = inputSymptoms;
    alert(`Symptoms saved for ${months[currentMonth]} ${day}, ${currentYear}`);
  }
}

function toggleTodayButton() {
  if (
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

// Event listeners
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

todayBtn.addEventListener("click", () => {
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  renderCalendar();
});

// Initial render
renderCalendar();
