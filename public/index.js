// Funktion zur Generierung einer RFC4122 v4 UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.getElementById('generateBtn').addEventListener('click', async function () {
    // Generiere eine zufällige UUID und zeige sie im Modal an
    const uuid = generateUUID();
    document.getElementById('uuid').textContent = uuid;

    // Sende die UUID an die /send-uuid-Route
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

    // Verstecke den ursprünglichen Button
    document.getElementById('generateBtn').style.display = 'none';

    // Modal anzeigen
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();

    // Konfiguriere den Download-Button
    document.getElementById('downloadBtn').addEventListener('click', function () {
        window.location.href = '/product.exe';
    });
});
