const API_BASE = window.location.origin;

// Modal handling
const modal = document.getElementById('mode-modal');
const autoBtn = document.getElementById('auto-btn');
const teleopBtn = document.getElementById('teleop-btn');
const modalTitle = document.getElementById('modal-title');
const modalOptions = document.querySelectorAll('.modal-option');

let currentModeType = '';

autoBtn.addEventListener('click', () => {
    currentModeType = 'auto';
    modalTitle.textContent = 'Select Auto Mode';
    modal.style.display = 'flex';
});

teleopBtn.addEventListener('click', () => {
    currentModeType = 'teleop';
    modalTitle.textContent = 'Select Teleop Mode';
    modal.style.display = 'flex';
});

modalOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        modalOptions.forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Example: Update values dynamically
// You can call these functions to update the dashboard
function updateConnectionStatus(status) {
    document.getElementById('connection-status').textContent = status;
}

function updatePingTime(time) {
    document.getElementById('ping-time').textContent = time;
}

function updateTelemetry(key, value) {
    const element = document.getElementById(`telemetry-${key}`);
    if (element) {
        element.textContent = `${key}: ${value}`;
    }
}

function updateArenaData(data) {
    if (data.offsetX !== undefined) document.getElementById('offset-x').textContent = `offsetX: ${data.offsetX}"`;
    if (data.offsetY !== undefined) document.getElementById('offset-y').textContent = `offsetY: ${data.offsetY}"`;
    if (data.mouseX !== undefined) document.getElementById('mouse-x').textContent = `mouseX: ${data.mouseX}"`;
    if (data.mouseY !== undefined) document.getElementById('mouse-y').textContent = `mouseY: ${data.mouseY}"`;
    if (data.heading !== undefined) document.getElementById('heading').textContent = `heading: ${data.heading}°`;
    if (data.flipX !== undefined) document.getElementById('flip-x').textContent = `flipX: ${data.flipX}`;
    if (data.flipY !== undefined) document.getElementById('flip-y').textContent = `flipY: ${data.flipY}`;
}

function updateTestVar(value) {
    document.getElementById('test-var').textContent = value.toFixed(2);
}

function updateBattery(voltage) {
    const batteryFill = document.getElementById('battery-fill');
    const batteryVoltage = document.getElementById('battery-voltage');

    const minVoltage = 10;
    const maxVoltage = 13;
    const percentage = Math.max(0, Math.min(100, ((voltage - minVoltage) / (maxVoltage - minVoltage)) * 100));

    batteryFill.style.width = percentage + '%';
    batteryVoltage.textContent = voltage.toFixed(1) + 'V';

    if (percentage > 60) {
        batteryFill.style.backgroundColor = '#4ade80';
    } else if (percentage > 30) {
        batteryFill.style.backgroundColor = '#fbbf24';
    } else {
        batteryFill.style.backgroundColor = '#ef4444';
    }
}

async function updateBatteryVoltage() {
    try {
        const response = await fetch(`${API_BASE}/api/batteryVoltage`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const { voltage } = await response.json();

        document.getElementById("battery-voltage").textContent =
            typeof voltage === "number"
                ? `${voltage.toFixed(2)} V`
                : "N/A";

        updateBattery(voltage);
    } catch (err) {
        console.error("Failed to fetch battery voltage:", err);
        document.getElementById("battery-voltage").textContent = "Error";
        document.getElementById("error").textContent = err.message;
    }
}

updateBatteryVoltage();
