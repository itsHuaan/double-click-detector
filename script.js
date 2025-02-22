let detectKey = null;
let lastPressTime = 0;
let pressCount = 0;
let doubleClickCount = 0;
let doubleClickThreshold = 100; // Default double-click threshold in milliseconds
let isChangingTime = false;

document.addEventListener("keydown", function (event) {
    if (isChangingTime) return; // Ignore key presses if changing time

    const currentTime = performance.now();

    // If no key is being detected, set the key and update UI
    if (!detectKey) {
        detectKey = event.key;
        document.getElementById("instruction").innerText = `Detecting: "${detectKey}"`;
        document.getElementById("resetKey").style.display = "block";
    }

    // If the pressed key matches the detected key
    if (event.key === detectKey) {
        pressCount++;
        document.getElementById("pressCount").innerText = pressCount;

        // Calculate time difference since the last press
        let timeDiff = currentTime - lastPressTime;

        // Log the time difference
        let logText = (timeDiff / 1000).toFixed(8); // Convert to seconds
        if (timeDiff <= doubleClickThreshold) {
            logText += " (double click)";
            document.querySelector(".neumorphic-box").style.boxShadow = "inset 6px 6px 10px rgba(255, 0, 0, 0.2), inset -6px -6px 10px rgba(255, 255, 255, 0.5)";
            setTimeout(() => {
                document.querySelector(".neumorphic-box").style.boxShadow = "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)";
            }, 100);
            doubleClickCount++;
            document.getElementById("doubleClickCount").innerText = doubleClickCount;
        }

        lastPressTime = currentTime;

        // Add log to the time logs
        document.getElementById("timeLogs").innerHTML += `<p>${logText}</p>`;
        document.getElementById("timeLogs").scrollTop = document.getElementById("timeLogs").scrollHeight;
    }
});

// Reset functionality
document.getElementById("resetKey").addEventListener("click", resetAll);

// Toggle time input container visibility
document.getElementById("changeTime").addEventListener("click", function () {
    const timeInputContainer = document.getElementById("timeInputContainer");
    if (timeInputContainer.style.display === "block") {
        timeInputContainer.style.display = "none";
        isChangingTime = false;
    } else {
        timeInputContainer.style.display = "block";
        isChangingTime = true;
    }
});

// Save new double-click threshold
document.getElementById("saveTime").addEventListener("click", function () {
    let newTime = document.getElementById("timeInput").value;
    if (newTime !== null && !isNaN(newTime) && newTime > 0) {
        doubleClickThreshold = parseInt(newTime);
    }
    document.getElementById("timeInputContainer").style.display = "none";
    isChangingTime = false;
    resetAll();
});

// Reset all values and UI
function resetAll() {
    detectKey = null;
    lastPressTime = 0;
    pressCount = 0;
    doubleClickCount = 0;
    document.getElementById("instruction").innerText = "Press the key you want to detect";
    document.getElementById("resetKey").style.display = "none";
    document.querySelector(".neumorphic-box").style.boxShadow = "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)";
    document.getElementById("pressCount").innerText = "0";
    document.getElementById("doubleClickCount").innerText = "0";
    document.getElementById("timeLogs").innerHTML = "";
}