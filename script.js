// --- QUANTITY UPDATER FUNCTION ---
function updateQty(shade, change) {
    const input = document.getElementById('qty-' + shade);
    let currentVal = parseInt(input.value);
    let newVal = currentVal + change;

    // Limit ang quantity: Hindi pwedeng bababa sa 0, at max 12 per shade
    if (newVal >= 0 && newVal <= 12) {
        input.value = newVal;
        calculateTotal();
    }
}

// --- TOTAL CALCULATOR ---
function calculateTotal() {
    let totalItems = 0;
    const qtyInputs = document.querySelectorAll('.qty-input');
    
    // Kunin ang sum ng lahat ng quantity
    qtyInputs.forEach(input => {
        totalItems += parseInt(input.value);
    });

    // Compute ang total price (₱180 per piece)
    let totalPrice = totalItems * 180;
    
    // I-update ang text sa screen
    document.getElementById('item-count').innerText = totalItems;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();
    
    // I-update ang hidden input para sa Formspree email
    document.getElementById('hidden-total').value = "₱" + totalPrice.toLocaleString();
}

// --- FORM SUBMISSION HANDLING ---
var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("status");
    var totalItems = parseInt(document.getElementById('item-count').innerText);

    // Validation: Dapat may laman ang order bago i-submit
    if (totalItems === 0) {
        status.style.color = "red";
        status.innerHTML = "⚠️ Please select at least one shade.";
        return;
    }

    var data = new FormData(event.target);
    status.style.color = "#d4a373";
    status.innerHTML = "⏳ Processing your order...";
    
    // I-send ang data sa Formspree
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.style.color = "green";
            status.innerHTML = "✅ Order Sent! Opening Messenger...";
            
            // Mag-wait ng 2 seconds bago i-redirect sa Messenger
            setTimeout(() => {
                window.location.href = "https://m.me/andrea.garcia.348414";
            }, 2000);
            
            form.reset();
            calculateTotal(); // I-reset din ang computation display
        } else {
            status.style.color = "red";
            status.innerHTML = "❌ Oops! There was a problem submitting your order.";
        }
    }).catch(error => {
        status.style.color = "red";
        status.innerHTML = "❌ Network error. Please check your connection.";
    });
}

form.addEventListener("submit", handleSubmit);

// --- COUNTDOWN TIMER ---
let time = 10799; // 2 hours, 59 minutes, 59 seconds in seconds
const timerElement = document.getElementById('timer');

setInterval(() => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    // Dagdagan ng leading zero kung single digit
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerHTML = `${hours}:${minutes}:${seconds}`;
    
    if (time > 0) {
        time--;
    }
}, 1000);