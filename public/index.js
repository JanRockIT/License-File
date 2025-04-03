function generateUUID() {
    // RFC4122 Version 4 compliant UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0;
        let v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    // Zufällige UUID generieren und anzeigen
    const uuid = generateUUID();
    document.getElementById('uuid').textContent = uuid;

    // Das Produkt-Feld anzeigen und mit Animation versehen
    const productBox = document.getElementById('productBox');
    productBox.style.display = 'block';
    productBox.classList.add('animate__fadeInUp');

    // Sende die UUID an den Server (Route: /send-uuid)
    try {
        const response = await fetch('https://license-file.onrender.com/send-uuid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ UUID: uuid })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("Fehler beim Registrieren der UUID: " + errorData.error);
            return;
        }
    } catch (error) {
        alert("Netzwerkfehler: " + error.message);
        return;
    }

    // Downloadbutton konfigurieren
    document.getElementById('downloadBtn').onclick = () => {
        window.location.href = '/product.exe';
    };
});
