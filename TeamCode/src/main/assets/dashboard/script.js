const API_BASE = window.location.origin;

async function updateBatteryVoltage() {
    try {
        const response = await fetch(`${API_BASE}/api/batteryVoltage`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const { voltage } = await response.json();

        document.getElementById("batteryVoltage").textContent =
            typeof voltage === "number"
                ? `${voltage.toFixed(2)} V`
                : "N/A";

    } catch (err) {
        console.error("Failed to fetch battery voltage:", err);
        document.getElementById("batteryVoltage").textContent = "Error";
        document.getElementById("error").textContent = err.message;
    }
}


setInterval(updateBatteryVoltage, 1000);
updateBatteryVoltage();
