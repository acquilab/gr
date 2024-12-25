// Define destinations globally
const destinations = [
  { label: 'Closest Starbucks', value: 0.5, unit: 'light milliseconds', description: '~150 kilometers' },
  { label: 'LA to NYC', value: 13.15, unit: 'light milliseconds', description: '~3,944 kilometers' },
  { label: 'Moon', value: 1.3, unit: 'light seconds', description: '~384,400 km' },
  { label: 'Sun', value: 8.3, unit: 'light minutes', description: '~150 million km' },
  { label: 'Edge of Solar System', value: 4.1, unit: 'light hours', description: '~18 billion km' },
  { label: '1 Light Year', value: 1, unit: 'light years', description: '~9.46 trillion km' },
  { label: 'Proxima Centauri', value: 4.2, unit: 'light years', description: '~40 trillion km' },
  { label: 'Edge of Milky Way', value: 100000, unit: 'light years', description: '100,000 light years' },
  { label: 'Andromeda Galaxy', value: 2500000, unit: 'light years', description: '2.5 million light years' },
];

document.addEventListener('DOMContentLoaded', () => {
  const velocitySlider = document.getElementById('velocity-slider');
  const distanceSlider = document.getElementById('distance-slider');
  const velocityLabel = document.getElementById('velocity-label');
  const distanceLabel = document.getElementById('distance-label');
  const distanceValue = document.getElementById('distance-value');
  const travelerTime = document.getElementById('traveler-time');
  const observerTime = document.getElementById('observer-time');
  const gammaValue = document.getElementById('gamma');
  const timeDifference = document.getElementById('time-difference');
  const velocityMps = document.getElementById('velocity-mps');
  const velocityKps = document.getElementById('velocity-kps');
  const velocityKph = document.getElementById('velocity-kph');
  const velocityPercent = document.getElementById('velocity-percent');

  const c = 299792458;

  const transformSliderToVelocity = (sliderPos) => {
    if (sliderPos <= 25) {
      return (sliderPos * 99.999999) / 25;
    } else {
      const localPos = (sliderPos - 25) / 75;
      return 99.999999 + localPos * (99.999999999999 - 99.999999);
    }
  };

  const transformVelocityToSlider = (velocityPercent) => {
    if (velocityPercent <= 99.999999) {
      return (velocityPercent * 25) / 99.999999;
    } else {
      return 25 + ((velocityPercent - 99.999999) * 75) / (99.999999999999 - 99.999999);
    }
  };

  const updateUI = () => {
    const sliderValue = Number(velocitySlider.value);
    const velocity = transformSliderToVelocity(sliderValue);
    const destinationIndex = Number(distanceSlider.value);
    const destination = destinations[destinationIndex];

    const velocityDecimal = velocity / 100;
    const gamma = 1 / Math.sqrt(1 - velocityDecimal ** 2);
    const velocityInMetersPerSecond = velocityDecimal * c;
    const velocityInKmPerSecond = velocityInMetersPerSecond / 1000;
    const velocityInKmPerHour = velocityInKmPerSecond * 3600;

    velocityLabel.textContent = `${velocity.toFixed(12)}%`;
    velocityMps.textContent = Math.round(velocityInMetersPerSecond);
    velocityKps.textContent = Math.round(velocityInKmPerSecond);
    velocityKph.textContent = Math.round(velocityInKmPerHour);
    velocityPercent.textContent = `${velocity.toFixed(12)}%`;

    distanceLabel.textContent = destination.label;
    distanceValue.textContent = destination.description;

    const distanceInSeconds = destination.value;
    const properTime = distanceInSeconds / velocityDecimal;
    const observerTimeValue = properTime * gamma;

    travelerTime.textContent = `${properTime.toFixed(2)} seconds`;
    observerTime.textContent = `${observerTimeValue.toFixed(2)} seconds`;
    gammaValue.textContent = gamma.toFixed(3);
    timeDifference.textContent = `${(observerTimeValue - properTime).toFixed(2)} seconds`;
  };

  velocitySlider.addEventListener('input', updateUI);
  distanceSlider.addEventListener('input', updateUI);
  updateUI();
});
