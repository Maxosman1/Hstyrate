document.addEventListener("DOMContentLoaded", function() {
  // Selecting elements
  const pageFooter = document.querySelector(".page-footer");
  const mainContainer = document.querySelector(".main-container");

  // Function to update footer position and width
  function updateFooterPosition() {
      const dimensions = mainContainer.getBoundingClientRect();
      pageFooter.style.bottom = dimensions.top + "px";
      pageFooter.style.width = dimensions.width + "px";
  }

  // Event listeners for navigation buttons
  document.querySelector(".showdown-button").addEventListener("click", () => {
      window.location.href = "/index.html";
  });

  document.querySelector(".contests-button").addEventListener("click", () => {
      window.location.href = "/contests.html";
  });

  document.querySelector(".trending-button").addEventListener("click", () => {
      window.location.href = "/trending.html";
  });

  // Update footer position and width every 50ms
  setInterval(updateFooterPosition, 50);

  // Initial update of the footer position and width
  updateFooterPosition();
});
