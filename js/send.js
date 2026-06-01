document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const formStatus = params.get("status");

    const messageBox = document.getElementById("form-message");

    if (!messageBox || !formStatus) return;

    const messages = {
        success: {
            text: "✅ Zpráva byla úspěšně odeslána.",
            color: "green"
        },
        error: {
            text: "❌ Chyba při odesílání zprávy.",
            color: "red"
        },
        email: {
            text: "⚠️ Neplatný email.",
            color: "orange"
        },
        empty: {
            text: "⚠️ Vyplňte všechna pole.",
            color: "orange"
        }
    };

    const result = messages[formStatus];

    if (result) {
        messageBox.textContent = result.text;
        messageBox.style.color = result.color;
    }

});