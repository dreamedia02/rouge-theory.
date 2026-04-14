// --- QUANTITY UPDATER ---
function updateQty(shade, change) {
    const input = document.getElementById('qty-' + shade);
    let currentVal = parseInt(input.value);
    let newVal = currentVal + change;

    // Limit: 0 to 12 items per shade
    if (newVal >= 0 && newVal <= 12) {
        input.value = newVal;
        calculateTotal();
    }
}

// --- TOTAL CALCULATOR ---
function calculateTotal() {
    let totalItems = 0;
    const qtyInputs = document.querySelectorAll('.qty-input');
    
    qtyInputs.forEach(input => {
        totalItems += parseInt(input.value);
    });

    let totalPrice = totalItems * 180;
    
    document.getElementById('item-count').innerText = totalItems;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();
    document.getElementById('hidden-total').value = "₱" + totalPrice.toLocaleString();
}

// --- MODAL CONTROL ---
function showModal() {
    document.getElementById('customModal').style.display = 'flex';
}

function closeAndRedirect() {
    // Redirect sa Messenger ni Andrea
    window.location.href = "https://m.me/andrea.garcia.348414";
}

// --- FORM SUBMISSION ---
var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("status");
    var totalItems = parseInt(document.getElementById('item-count').innerText);

    // Validation
    if (totalItems === 0) {
        status.style.color = "red";
        status.innerHTML = "⚠️ Please select at least one shade.";
        return;
    }

    status.style.color = "#d4a373";
    status.innerHTML = "⏳ Processing your order...";

    var data = new FormData(event.target);

    // Send to Formspree
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "✅ Order Saved!";
            showModal(); // Ipakita ang aesthetic pop-up
            form.reset();
            calculateTotal();
        } else {
            status.style.color = "red";
            status.innerHTML = "❌ Error sending order. Please try again.";
        }
    }).catch(error => {
        status.style.color = "red";
        status.innerHTML = "❌ Connection error.";
    });
}

form.addEventListener("submit", handleSubmit);

// --- COUNTDOWN TIMER ---
let time = 10799; 
const timerElement = document.getElementById('timer');

setInterval(() => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    timerElement.innerHTML = `${h}:${m}:${s}`;
    
    if (time > 0) time--;
}, 1000);
