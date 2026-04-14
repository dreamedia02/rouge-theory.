function updateQty(shade, change) {
    const input = document.getElementById('qty-' + shade);
    let currentVal = parseInt(input.value);
    let newVal = currentVal + change;
    if (newVal >= 0 && newVal <= 12) {
        input.value = newVal;
        calculateTotal();
    }
}

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

var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("status");
    var totalItems = parseInt(document.getElementById('item-count').innerText);

    if (totalItems === 0) {
        status.style.color = "red";
        status.innerHTML = "⚠️ Please select at least one shade.";
        return;
    }

    var data = new FormData(event.target);
    status.style.color = "#d4a373";
    status.innerHTML = "⏳ Sending Order to Facebook...";
    
    // 1. Send muna sa Formspree (para may email backup ka)
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        // 2. Kahit mag-error or success ang email, i-redirect natin sa Messenger
        status.style.color = "green";
        status.innerHTML = "✅ Order Processed! Opening Messenger...";
        
        setTimeout(() => {
            // Dideretso sa inbox mo
            window.location.href = "https://m.me/andrea.garcia.348414";
        }, 1500);
        
    }).catch(error => {
        // Backup redirect kung may network error
        window.location.href = "https://m.me/andrea.garcia.348414";
    });
}

form.addEventListener("submit", handleSubmit);

// Timer function
let time = 10799; 
setInterval(() => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;
    document.getElementById('timer').innerHTML = `${h<10?'0':''}${h}:${m<10?'0':''}${m}:${s<10?'0':''}${s}`;
    if (time > 0) time--;
}, 1000);
