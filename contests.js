// contests.js
document.addEventListener("DOMContentLoaded", function () {
  // Call the main functions when the DOM is ready
  loadContestVideos();
  initializeTimer("2023-12-31T23:59:59"); // Set the end date for the contest timer
});

// Function to load and display contest videos
function loadContestVideos() {
  fetch("/api/contest-videos") // Replace with the actual API endpoint to get contest videos
    .then((response) => response.json())
    .then((videos) => {
      const videoList = document.getElementById("video-list");
      videos.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.className = "video";

        const videoTitle = document.createElement("h3");
        videoTitle.textContent = video.title;

        const videoFrame = document.createElement("iframe");
        videoFrame.src = video.url; // Assuming the video URL is a direct link to an embeddable video frame
        videoFrame.setAttribute("allowfullscreen", true);

        videoElement.appendChild(videoTitle);
        videoElement.appendChild(videoFrame);

        videoList.appendChild(videoElement);
      });
    })
    .catch((error) => {
      console.error("Error loading contest videos:", error);
    });
}

// Function to initialize countdown timer
function initializeTimer(endTime) {
  const countdownElement = document.getElementById("countdown-timer");
  const end = new Date(endTime);

  const updateTimer = () => {
    const now = new Date();
    const remainingTime = end - now;

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    countdownElement.textContent = `Time Left - Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`;

    if (remainingTime < 0) {
      clearInterval(timer);
      countdownElement.textContent = "Contest Ended";
    }
  };

  // Update the countdown every 1 second
  const timer = setInterval(updateTimer, 1000);
}

// Function to handle video submission
function submitVideo() {
  const videoUrl = document.getElementById("video-url").value;
  const videoData = {
    url: videoUrl
  };

  fetch("/api/submit-video", {
    // Replace with the actual API endpoint for video submission
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(videoData)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      console.log("Video submitted:", data);
      // Display success message to the user
      alert("Your video has been submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting video:", error);
      // Display error message to the user
      alert("There was a problem submitting your video.");
    });
}

// Event listener for the video submission form
document
  .getElementById("video-submit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submit action
    submitVideo();
  });
