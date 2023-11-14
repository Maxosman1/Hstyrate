// Function to load contest details
function loadContestDetails(contestId) {
  fetch(`/api/contests/${contestId}`) // Your actual API endpoint
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("contest-name").textContent = data.name;
      document.getElementById("contest-description").textContent =
        data.description;
      document.getElementById("start-date").textContent = data.startDate;
      document.getElementById("end-date").textContent = data.endDate;

      // Embed TikTok video if media type is video
      if (data.mediaType === "video" && data.tiktokId) {
        embedTikTokVideo(data.tiktokId);
      } else if (data.mediaType === "image") {
        document.getElementById(
          "contest-media"
        ).innerHTML = `<img src="${data.mediaUrl}" alt="Contest Media">`;
      }
    })
    .catch((error) => {
      console.error("Error loading contest details:", error);
    });
}

// Function to embed a TikTok video
function embedTikTokVideo(tiktokId) {
  fetch(
    `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@tiktok/video/${tiktokId}`
  )
    .then((response) => response.json())
    .then((data) => {
      const mediaSection = document.getElementById("contest-media");
      mediaSection.innerHTML = data.html;
      // Since TikTok's oEmbed returns a script, we need to run it to render the embed widget
      window.tiktokBlock = mediaSection.querySelector("blockquote");
      const scriptSrc = mediaSection.querySelector("script").src;
      const script = document.createElement("script");
      script.src = scriptSrc;
      mediaSection.appendChild(script);
    })
    .catch((error) => {
      console.error("Error embedding TikTok video:", error);
    });
}

// Function to submit an entry to a contest
function submitEntry(contestId) {
  // Example function to handle entry submission
  const entryData = {
    // Populate with data from a form
  };

  fetch(`/api/contests/${contestId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entryData)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log("Entry submitted:", data);
      // Handle successful submission
    })
    .catch((error) => {
      console.error("Error submitting entry:", error);
      // Handle errors
    });
}

// Load contest details for a specific contest
loadContestDetails("123"); // Replace '123' with the actual contest ID

// Add event listeners as needed
document.getElementById("submit-entry-button").addEventListener("click", () => {
  submitEntry("123"); // Replace '123' with the actual contest ID
});
