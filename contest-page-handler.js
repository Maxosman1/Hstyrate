document.addEventListener("DOMContentLoaded", () => {
  // Countdown Timer Function
  const countdownElement = document.getElementById("contest-timer");
  const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;

  function startCountdown() {
    const endTime = Date.now() + threeDaysInMillis;
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        startCountdown(); // Restart the countdown
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  // Fetch Video Data (Mock Function)
  function fetchVideoData(pageNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          videos: [
            // Array of video objects for the current page
          ],
          totalPages: 5 // Total number of pages
        });
      }, 1000);
    });
  }

  // Load Videos with Pagination
  function loadVideos(pageNumber = 1) {
    fetchVideoData(pageNumber).then((data) => {
      const videosList = document.getElementById("videos-list");
      const paginationDiv = document.getElementById("pagination");

      videosList.innerHTML = "";
      paginationDiv.innerHTML = "";

      data.videos.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.textContent = video.title; // Replace with actual video content
        videosList.appendChild(videoElement);
      });

      for (let i = 1; i <= data.totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.textContent = i;
        pageLink.href = "#";
        pageLink.addEventListener("click", (e) => {
          e.preventDefault();
          loadVideos(i);
        });
        paginationDiv.appendChild(pageLink);
      }
    });
  }

  // Fetch Top Videos (Mock Function)
  function fetchTopVideos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "gold", title: "Gold Video" },
          { id: "silver", title: "Silver Video" },
          { id: "bronze", title: "Bronze Video" }
        ]);
      }, 1000);
    });
  }

  // Display Top Videos
  function displayTopVideos() {
    fetchTopVideos().then((videos) => {
      videos.forEach((video) => {
        const videoElement = document.getElementById(video.id);
        videoElement.textContent = video.title; // Replace with actual video content
      });
    });
  }

  // Initial function calls
  startCountdown();
  loadVideos();
  displayTopVideos();
});
