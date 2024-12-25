document.addEventListener('DOMContentLoaded', function() {
    const c = 299792458; // Speed of light in m/s
    
    const destinations = [
        { label: 'Closest\nStarbucks', value: 0.5, unit: 'light milliseconds' },
        { label: 'Moon', value: 1.3, unit: 'light seconds' },
        { label: 'Sun', value: 8.3, unit: 'light minutes' },
        { label: 'Edge of\nSolar System', value: 4.1, unit: 'light hours' },
        { label: '1 Light\nYear', value: 1, unit: 'light years' },
        { label: 'Proxima\nCentauri', value: 4.2, unit: 'light years' },
        { label: 'Edge of\nMilky Way', value: 100000, unit: 'light years' },
        { label: 'Andromeda\nGalaxy', value: 2500000, unit: 'light years' }
    ];

    const velocityMarks = [
        { label: '0%', value: 0 },
        { label: '80%', value: 80 },
        { label: '99%', value: 99 },
        { label: '100%', value: 99.999999999999 }
    ];

    // Initialize sliders and marks
    function createMarks() {
        // Create velocity marks
        const velocityMarksContainer = document.getElementById('velocityMarks');
        velocityMarks.forEach(mark => {
            const markEl = document.createElement('div');
            markEl.className = 'mark';
            markEl.style.left = `${mark.value}%`;
            
            const label = document.createElement('div');
            label.className = 'mark-label';
            label.textContent = mark.label;
            
            markEl.appendChild(label);
            velocityMarksContainer.appendChild(markEl);
        });

        // Create distance marks
        const distanceMarksContainer = document.getElementById('distanceMarks');
        destinations.forEach((dest, index) => {
            const markEl = document.createElement('div');
            markEl.className = 'mark';
            markEl.style.left = `${(index / (destinations.length - 1)) * 100}%`;
            
            const label = document.createElement('div');
            label.className = 'mark-label';
            label.textContent = dest.label;
            
            markEl.appendChild(label);
            distanceMarksContainer.appendChild(markEl);
        });
    }

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
        
        // Update displays
        document.getElementById('velocityValue').textContent = velocity.toFixed(12);
        document.getElementById('distanceDisplay').textContent = `${destination.value} ${destination.unit}`;
        document.getElementById('effectsDistance').textContent = `${destination.value} ${destination.unit}`;
        document.getElementById('travelerTime').textContent = formatTime(results.properTime);
        document.getElementById('observerTime').textContent = formatTime(results.observerTime);
        document.getElementById('timeDilation').textContent = results.gamma.toFixed(3);
        document.getElementById('timeDifference').textContent = formatTime(results.observerTime - results.properTime);
        
        // Velocity details
        document.getElementById('metersPerSecond').textContent = `${formatNumber(results.velocityInMetersPerSecond)} m/s`;
        document.getElementById('kilometersPerSecond').textContent = `${formatNumber(results.velocityInMetersPerSecond / 1000)} km/s`;
        document.getElementById('kilometersPerHour').textContent = `${formatNumber(results.velocityInMetersPerSecond * 3.6)} km/h`;
        document.getElementById('lightSpeedPercent').textContent = `${velocity.toFixed(12)}%`;
        document.getElementById('remainingToC').textContent = (1 - velocity/100).toExponential(12);
    }

    // Initialize
    createMarks();
    
    // Add event listeners
    document.getElementById('velocitySlider').addEventListener('input', updateDisplay);
    document.getElementById('distanceSlider').addEventListener('input', updateDisplay);
    
    // Initial update
    updateDisplay();
});
