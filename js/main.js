document.addEventListener("DOMContentLoaded", function () {
  loadContests();
  loadContestDetails("123"); // Replace '123' with the actual contest ID
});

// Function to load and display contests
function loadContests() {
  // Placeholder array of contests, replace this with actual data retrieval logic
  const contests = [
    {
      id: "dance",
      name: "Dance",
      description: "Show your best moves and choreographies."
    },
    {
      id: "tech",
      name: "Electronics",
      description: "Discuss the latest in tech and gadgets."
    }
    // Add more contests here
  ];

  const contestGrid = document.getElementById("all-contests");
  contests.forEach((contest) => {
    const contestElement = createContestElement(contest);
    contestGrid.appendChild(contestElement);
  });
}

// Function to create HTML for a single contest
function createContestElement(contest) {
  const article = document.createElement("article");
  article.className = "contest";

  const title = document.createElement("h2");
  title.textContent = contest.name;

  const description = document.createElement("p");
  description.textContent = contest.description;

  const uploadButton = document.createElement("button");
  uploadButton.textContent = "Upload Video";
  uploadButton.onclick = () => openUploadDialog(contest.id);

  article.appendChild(title);
  article.appendChild(description);
  article.appendChild(uploadButton);

  return article;
}

// Function to open the video upload dialog
function openUploadDialog(contestId) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.onchange = () => uploadVideo(contestId, input.files[0]);
  input.click();
}

// Function to handle the video upload
function uploadVideo(contestId, file) {
  console.log(`Uploading video for contest: ${contestId}`);
  console.log(`Uploaded file: ${file.name}`);
  alert(`Your video for ${contestId} has been uploaded!`);
}

// Function to load contest details
function loadContestDetails(contestId) {
  fetch(`/api/contests/${contestId}`) // Replace with actual API endpoint
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("contest-name").textContent = data.name;
      document.getElementById("contest-description").textContent =
        data.description;
      document.getElementById("start-date").textContent = data.startDate;
      document.getElementById("end-date").textContent = data.endDate;

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
