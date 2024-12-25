// Constants
const c = 299792458; // Speed of light in m/s

const destinations = [
    { label: 'Closest\nStarbucks', value: 0.5, unit: 'light milliseconds', description: '~150 kilometers' },
    { label: 'LA to\nNYC', value: 13.15, unit: 'light milliseconds', description: '~3,944 kilometers' },
    { label: 'Moon', value: 1.3, unit: 'light seconds', description: '~384,400 km' },
    { label: 'Sun', value: 8.3, unit: 'light minutes', description: '~150 million km' },
    { label: 'Edge of\nSolar System', value: 4.1, unit: 'light hours', description: '~18 billion km' },
    { label: '1 Light\nYear', value: 1, unit: 'light years', description: '~9.46 trillion km' },
    { label: 'Proxima\nCentauri', value: 4.2, unit: 'light years', description: '~40 trillion km' },
    { label: 'Edge of\nMilky Way', value: 100000, unit: 'light years', description: '100,000 light years' },
    { label: 'Andromeda\nGalaxy', value: 2500000, unit: 'light years', description: '2.5 million light years' }
];

function formatNumber(num) {
    return new Intl.NumberFormat().format(Math.round(num));
}

function calculateTimeDilation(velocity, distance, unit) {
    const velocityFraction = velocity / 100;
    const gamma = 1 / Math.sqrt(1 - velocityFraction * velocityFraction);
    
    // Convert distance to light-seconds
    let distanceInSeconds = distance;
    switch(unit) {
        case 'light milliseconds': distanceInSeconds = distance / 1000; break;
        case 'light minutes': distanceInSeconds = distance * 60; break;
        case 'light hours': distanceInSeconds = distance * 3600; break;
        case 'light years': distanceInSeconds = distance * 365.25 * 24 * 3600; break;
    }
    
    const properTime = distanceInSeconds / velocityFraction;
    const observerTime = properTime * gamma;
    
    return {
        gamma,
        properTime,
        observerTime,
        velocityInMetersPerSecond: velocityFraction * c
    };
}

function formatTime(seconds) {
    if (seconds < 0.001) return `${(seconds * 1000000).toFixed(1)} microseconds`;
    if (seconds < 1) return `${(seconds * 1000).toFixed(1)} milliseconds`;
    if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
    if (seconds < 31557600) return `${(seconds / 86400).toFixed(1)} days`;
    return `${(seconds / 31557600).toFixed(1)} years`;
}

function updateDisplay() {
    const velocity = parseFloat(document.getElementById('velocitySlider').value);
    const destinationIndex = parseInt(document.getElementById('distanceSlider').value);
    const destination = destinations[destinationIndex];
    
    const results = calculateTimeDilation(velocity, destination.value, destination.unit);
    
    document.getElementById('velocityValue').textContent = velocity.toFixed(12);
    document.getElementById('distanceDisplay').textContent = `${destination.value} ${destination.unit}`;
    document.getElementById('effectsDistance').textContent = `${destination.value} ${destination.unit}`;
    document.getElementById('travelerTime').textContent = formatTime(results.properTime);
    document.getElementById('observerTime').textContent = formatTime(results.observerTime);
    document.getElementById('timeDilation').textContent = results.gamma.toFixed(3);
    document.getElementById('timeDifference').textContent = formatTime(results.observerTime - results.properTime);
    
    document.getElementById('metersPerSecond').textContent = `${formatNumber(results.velocityInMetersPerSecond)} m/s`;
    document.getElementById('kilometersPerSecond').textContent = `${formatNumber(results.velocityInMetersPerSecond / 1000)} km/s`;
    document.getElementById('kilometersPerHour').textContent = `${formatNumber(results.velocityInMetersPerSecond * 3.6)} km/h`;
    document.getElementById('lightSpeedPercent').textContent = `${velocity.toFixed(12)}%`;
    document.getElementById('remainingToC').textContent = (1 - velocity/100).toExponential(12);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('velocitySlider').addEventListener('input', updateDisplay);
    document.getElementById('distanceSlider').addEventListener('input', updateDisplay);
    updateDisplay();
});
