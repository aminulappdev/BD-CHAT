// autorefresh.js
function autoRefresh() {
    // Reload the page after every 5 seconds (5000 milliseconds)
    setTimeout(function () {
        location.reload();
    }, 2000); // Adjust the interval as needed
}

// Call the autoRefresh function when the window is loaded
window.onload = autoRefresh;