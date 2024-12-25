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

const velocityMarks = [
    { label: '0%', value: 0 },
    { label: '80%', value: 80 },
    { label: '99%', value: 99 },
    { label: '100%', value: 99.999999999999 }
];

// Transform functions for velocity slider
function transformSliderToVelocity(sliderPos) {
    if (sliderPos <= 25) {
        return (sliderPos * 99.9999) / 25;
    } else {
        const localPos = (sliderPos - 25) / 75;
        return 99.9999 + localPos * (99.999999999999 - 99.9999);
    }
}

function transformVelocityToSlider(velocityPercent) {
    if (velocityPercent <= 99.9999) {
        return (velocityPercent * 25) / 99.9999;
    } else {
        return 25 + ((velocityPercent - 99.9999) * 75) / (99.999999999999 - 99.9999);
    }
}

// Formatting functions
function formatTime(seconds) {
    if (!isFinite(seconds)) return "∞";
    if (isNaN(seconds)) return "undefined";
    if (seconds === 0) return "0 seconds";

    const absSeconds = Math.abs(seconds);
    if (absSeconds < 0.001) return `${(seconds * 1000000).toFixed(1)} microseconds`;
    if (absSeconds < 1) return `${(seconds * 1000).toFixed(1)} milliseconds`;
    if (absSeconds < 60) return `${seconds.toFixed(1)} seconds`;
    if (absSeconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
    if (absSeconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
    if (absSeconds < 31557600) return `${(seconds / 86400).toFixed(1)} days`;
    return `${Math.round(seconds / 31557600).toLocaleString()} years`;
}

function formatDistance(value, unit) {
    if (unit === 'light milliseconds') return `${value.toFixed(1)} light milliseconds`;
    if (unit === 'light seconds') return `${value.toFixed(1)} light seconds`;
    if (unit === 'light minutes') return `${value.toFixed(1)} light minutes`;
    if (unit === 'light hours') return `${value.toFixed(1)} light hours`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} million light years`;
    if (value >= 1000) return `${(value / 1000
