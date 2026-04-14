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
    
    // Kunin ang mga details para sa message
    var name = form.Name.value;
    var address = form.Address.value;
    var total = document.getElementById('total-price').innerText;
    
    // Kunin lahat ng shades na may order
    var orderSummary = "";
    if(parseInt(document.getElementById('qty-Reine').value) > 0) orderSummary += `- Reine: ${document.getElementById('qty-Reine').value}\n`;
    if(parseInt(document.getElementById('qty-Queen').value) > 0) orderSummary += `- Queen: ${document.getElementById('qty-Queen').value}\n`;
    if(parseInt(document.getElementById('qty-Mademoiselle').value) > 0) orderSummary += `- Mademoiselle: ${document.getElementById('qty-Mademoiselle').value}\n`;
    if(parseInt(document.getElementById('qty-Dame').value) > 0) orderSummary += `- Dame: ${document.getElementById('qty-Dame').value}\n`;
    if(parseInt(document.getElementById('qty-Imperatrice').value) > 0) orderSummary += `- Imperatrice: ${document.getElementById('qty-Imperatrice').value}\n`;
    if(parseInt(document.getElementById('qty-Empress').value) > 0) orderSummary += `- Empress: ${document.getElementById('qty-Empress').value}\n`;

    if (orderSummary === "") {
        status.style.color = "red";
        status.innerHTML = "⚠️ Please select at least one shade.";
        return;
    }

    // I-format ang message na masesend sa'yo
    var finalMessage = `Hello Rouge Theory! I would like to order:\n\n${orderSummary}\nTotal: ₱${total}\n\nName: ${name}\nAddress: ${address}`;

    status.style.color = "#d4a373";
    status.innerHTML = "⏳ Sending Order...";

    // Send muna sa Formspree
    fetch(event.target.action, {
        method: form.method,
        body: new FormData(event.target),
        headers: { 'Accept': 'application/json' }
    }).then(() => {
        // ALERT sa customer
        alert("Order Summary Copied! Please SEND the message in the next screen to confirm your order.");
        
        // Buksan ang Messenger (Unfortunately, FB doesn't allow pre-filled text in m.me links anymore)
        // Pero as a workaround, pwede silang idirekta sa FB Profile mo or Page
        window.location.href = "https://m.me/andrea.garcia.348414";
    });
}

form.addEventListener("submit", handleSubmit);

// Timer
let time = 10799; 
setInterval(() => {
    let h = Math.floor(time / 3600), m = Math.floor((time % 3600) / 60), s = time % 60;
    document.getElementById('timer').innerHTML = `${h<10?'0':''}${h}:${m<10?'0':''}${m}:${s<10?'0':''}${s}`;
    if (time > 0) time--;
}, 1000);
