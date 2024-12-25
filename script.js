const formatTime = (seconds) => {
  if (seconds === Infinity || isNaN(seconds)) {
    return "∞";
  }

  const absSeconds = Math.abs(seconds);

  if (absSeconds < 0.001) {
    return `${(seconds * 1e6).toFixed(2).toLocaleString()} microseconds`;
  } else if (absSeconds < 1) {
    return `${(seconds * 1e3).toFixed(2).toLocaleString()} milliseconds`;
  } else if (absSeconds < 60) {
    return `${Math.round(seconds).toLocaleString()} seconds`;
  } else if (absSeconds < 3600) {
    return `${Math.round(seconds / 60).toLocaleString()} minutes`;
  } else if (absSeconds < 86400) {
    return `${Math.round(seconds / 3600).toLocaleString()} hours`;
  } else if (absSeconds < 31557600) { // 1 year in seconds
    return `${Math.round(seconds / 86400).toLocaleString()} days`;
  } else if (absSeconds < 1e8) {
    return `${Math.round(seconds / 31557600).toLocaleString()} years`;
  } else {
    return `${(seconds / 31557600000).toFixed(2).toLocaleString()} million years`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const velocitySlider = document.getElementById("velocity-slider");
  const distanceSlider = document.getElementById("distance-slider");
  const velocityLabel = document.getElementById("velocity-label");
  const distanceLabel = document.getElementById("distance-label");
  const distanceValue = document.getElementById("distance-value");
  const travelerTime = document.getElementById("traveler-time");
  const observerTime = document.getElementById("observer-time");
  const gammaValue = document.getElementById("gamma");
  const timeDifference = document.getElementById("time-difference");
  const velocityMps = document.getElementById("velocity-mps");
  const velocityKps = document.getElementById("velocity-kps");
  const velocityKph = document.getElementById("velocity-kph");
  const velocityPercent = document.getElementById("velocity-percent");

  const c = 299792458;

  const transformSliderToVelocity = (sliderPos) => {
    if (sliderPos <= 25) {
      return (sliderPos * 99.999999) / 25;
    } else {
      const localPos = (sliderPos - 25) / 75;
      return 99.999999 + localPos * (99.999999999999 - 99.999999);
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
    velocityMps.textContent = Math.round(velocityInMetersPerSecond).toLocaleString();
    velocityKps.textContent = Math.round(velocityInKmPerSecond).toLocaleString();
    velocityKph.textContent = Math.round(velocityInKmPerHour).toLocaleString();
    velocityPercent.textContent = `${velocity.toFixed(12)}%`;

    distanceLabel.textContent = destination.label;
    distanceValue.textContent = destination.description;

    const distanceInSeconds = (() => {
      switch (destination.unit) {
        case "light milliseconds":
          return destination.value / 1000;
        case "light seconds":
          return destination.value;
        case "light minutes":
          return destination.value * 60;
        case "light hours":
          return destination.value * 3600;
        case "light years":
          return destination.value * 31557600 * 365.25;
        default:
          return destination.value;
      }
    })();

    const properTime = distanceInSeconds / velocityDecimal;
    const observerTimeValue = properTime * gamma;

    travelerTime.textContent = formatTime(properTime);
    observerTime.textContent = formatTime(observerTimeValue);
    gammaValue.textContent = Math.round(gamma).toLocaleString();
    timeDifference.textContent = formatTime(observerTimeValue - properTime);
  };

  velocitySlider.addEventListener("input", updateUI);
  distanceSlider.addEventListener("input", updateUI);
  updateUI();
});
