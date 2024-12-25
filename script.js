const transformSliderToVelocity = (sliderPos) => {
  if (sliderPos <= 25) {
    // Map 0-25% slider to 0-99.999999% velocity
    return (sliderPos * 99.999999) / 25;
  } else {
    // Map 25-100% slider to 99.999999%-99.999999999999% velocity
    const localPos = (sliderPos - 25) / 75;
    return 99.999999 + localPos * (99.999999999999 - 99.999999);
  }
};

const transformVelocityToSlider = (velocityPercent) => {
  if (velocityPercent <= 99.999999) {
    // Map 0-99.999999% velocity to 0-25% slider
    return (velocityPercent * 25) / 99.999999;
  } else {
    // Map 99.999999%-99.999999999999% velocity to 25-100% slider
    return 25 + ((velocityPercent - 99.999999) * 75) / (99.999999999999 - 99.999999);
  }
};

// Update UI function
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

  // Update velocity info
  velocityLabel.textContent = `${velocity.toFixed(12)}%`;
  velocityMps.textContent = Math.round(velocityInMetersPerSecond);
  velocityKps.textContent = Math.round(velocityInKmPerSecond);
  velocityKph.textContent = Math.round(velocityInKmPerHour);
  velocityPercent.textContent = `${velocity.toFixed(12)}%`;

  // Update distance info
  distanceLabel.textContent = destination.label;
  distanceValue.textContent = destination.description;

  // Calculate time dilation
  const distanceInSeconds = destination.value;
  const properTime = distanceInSeconds / velocityDecimal;
  const observerTimeValue = properTime * gamma;

  travelerTime.textContent = `${properTime.toFixed(2)} seconds`;
  observerTime.textContent = `${observerTimeValue.toFixed(2)} seconds`;
  gammaValue.textContent = gamma.toFixed(3);
  timeDifference.textContent = `${(observerTimeValue - properTime).toFixed(2)} seconds`;
};

// Attach updated functions
velocitySlider.addEventListener('input', updateUI);
distanceSlider.addEventListener('input', updateUI);
updateUI();
