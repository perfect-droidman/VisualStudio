document.addEventListener('DOMContentLoaded', (event) => {
    // Select all the flags using the class name
    const flags = document.querySelectorAll('.flag');

    // Add event listeners for each flag
    flags.forEach(flag => {
        flag.addEventListener('mouseenter', changeToMap);
        flag.addEventListener('mouseleave', resetToFlag);
    });
});

function changeToMap(event) {
    const flag = event.target;
    const countryName = flag.getAttribute('data-country');
    const mapImage = flag.getAttribute('data-map');

    // Change the src attribute to the map image
    flag.src = mapImage;

    // Update the h1 text
    const headline = document.getElementById('headline');
    headline.textContent = countryName;
}

function resetToFlag(event) {
    const flag = event.target;
    const flagImage = flag.src.replace('map', 'flag'); // Assuming the naming convention is consistent

    // Change the src attribute back to the flag image
    flag.src = flagImage;

    // Reset the h1 text
    const headline = document.getElementById('headline');
    headline.textContent = "Countries and Flags";
}
