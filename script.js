// Update these demo details before publishing.
const BUSINESS = {
  name: "DRIVEON",
  whatsapp: "910000000000", // Replace with the real number: country code + number, no + or spaces.
  phone: "+91 00000 00000",
  location: "Pune, Maharashtra"
};

// Sample cars and prices. Replace with verified client information.
const cars = [
  {id:1,name:"Maruti Swift",variant:"VXi · 2023",category:"Hatchback",price:1800,transmission:"Manual",fuel:"Petrol",seats:5,image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",description:"A compact, city-friendly hatchback for everyday plans and short getaways."},
  {id:2,name:"Hyundai i20",variant:"Sportz · 2023",category:"Hatchback",price:2200,transmission:"Manual",fuel:"Petrol",seats:5,image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",description:"A comfortable hatchback with a little extra space and style for your drive."},
  {id:3,name:"Honda City",variant:"VX · 2022",category:"Sedan",price:3000,transmission:"Automatic",fuel:"Petrol",seats:5,image:"https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80",description:"A refined sedan for relaxed city journeys and longer highway drives."},
  {id:4,name:"Hyundai Creta",variant:"SX · 2023",category:"SUV",price:3800,transmission:"Automatic",fuel:"Diesel",seats:5,image:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",description:"An SUV-style option with room for friends, family and weekend luggage."}
];

const carGrid = document.getElementById("carGrid");
const carSelect = document.getElementById("carSelect");
const whatsappLink = `https://wa.me/${BUSINESS.whatsapp}`;

function renderCars(filter = "All") {
  const visibleCars = filter === "All" ? cars : cars.filter(car => car.category === filter);
  carGrid.innerHTML = visibleCars.map(car => `
    <article class="car-card">
      <div class="car-image">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="car-category">${car.category.toUpperCase()}</span>
      </div>
      <div class="car-info">
        <div class="car-top"><div><h3>${car.name}</h3><span class="car-variant">${car.variant}</span></div>
          <div class="price">₹${car.price.toLocaleString("en-IN")} <small>/ day*</small></div></div>
        <div class="specs"><span>⚙ ${car.transmission}</span><span>⛽ ${car.fuel}</span><span>♙ ${car.seats} seats</span></div>
        <div class="card-actions"><button onclick="showCar(${car.id})">View details ↗</button><button class="enquire" onclick="enquireCar(${car.id})">Enquire now →</button></div>
      </div>
    </article>`).join("");
}

function showCar(id) {
  const car = cars.find(item => item.id === id);
  document.getElementById("dialogContent").innerHTML = `
    <div class="dialog-body"><img src="${car.image}" alt="${car.name}">
      <div class="dialog-text"><span class="eyebrow dark">${car.category.toUpperCase()}</span>
        <h2>${car.name}</h2><p>${car.description}</p>
        <div class="dialog-specs">Variant: ${car.variant}<br>Transmission: ${car.transmission}<br>Fuel: ${car.fuel}<br>Seats: ${car.seats}<br>Demo rate: ₹${car.price.toLocaleString("en-IN")} / day*</div>
        <p>*Sample price only. Availability, deposit, kilometre limit and all rental terms must be confirmed by the business.</p>
        <button class="button button-dark" onclick="enquireCar(${car.id})">Enquire on WhatsApp ↗</button>
      </div>
    </div>`;
  document.getElementById("carDialog").showModal();
}

function enquireCar(id) {
  const car = cars.find(item => item.id === id);
  const message = `Hi ${BUSINESS.name}, I'm interested in the ${car.name} (${car.variant}). Please share current availability, final rental price and rental conditions.`;
  window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest(".filter");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  renderCars(button.dataset.filter);
});

cars.forEach(car => {
  const option = document.createElement("option");
  option.value = car.name;
  option.textContent = car.name;
  carSelect.appendChild(option);
});

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const pickup = new Date(form.get("pickup"));
  const returning = new Date(form.get("return"));

  if (returning <= pickup) {
    document.getElementById("formStatus").textContent = "Return date and time must be after pickup.";
    return;
  }

  const message = [
    `Hello ${BUSINESS.name}, I'd like to enquire about a self-drive rental.`,
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Preferred car: ${form.get("car")}`,
    `Pickup: ${form.get("pickup").replace("T", " ")}`,
    `Return: ${form.get("return").replace("T", " ")}`,
    `Pickup location: ${form.get("location") || "Not specified"}`,
    `Additional message: ${form.get("message") || "None"}`,
    "Please confirm availability, final pricing and rental terms. I understand this is an enquiry, not a confirmed booking."
  ].join("\n");

  document.getElementById("formStatus").textContent = "Opening WhatsApp with your enquiry…";
  window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

document.getElementById("quickWhatsApp").href = whatsappLink;
document.getElementById("footerWhatsApp").href = whatsappLink;
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("dialogClose").addEventListener("click", () => document.getElementById("carDialog").close());
document.getElementById("carDialog").addEventListener("click", event => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));

renderCars();
