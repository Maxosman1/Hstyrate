// Functions to embed a video based on its URL and extract video IDs
function embedVideo(videoUrl) {
  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const videoId = extractYouTubeVideoId(videoUrl);
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (videoUrl.includes("vimeo.com")) {
    const videoId = extractVimeoVideoId(videoUrl);
    return `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else if (
    videoUrl.includes("facebook.com") ||
    videoUrl.includes("fb.watch")
  ) {
    const videoId = extractFacebookVideoId(videoUrl);
    return `<iframe src="https://www.facebook.com/plugins/video.php?href=${videoUrl}&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;
  } else if (videoUrl.includes("tiktok.com")) {
    const videoId = extractTikTokVideoId(videoUrl);
    return `<iframe src="https://www.tiktok.com/embed/v2/${videoId}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else if (videoUrl.includes("dailymotion.com")) {
    const videoId = extractDailymotionVideoId(videoUrl);
    return `<iframe frameborder="0" width="560" height="315" src="https://www.dailymotion.com/embed/video/${videoId}" allowfullscreen></iframe>`;
  }
  // Add more platforms as needed
  else {
    return "Video platform not supported";
  }
}

function extractYouTubeVideoId(url) {
  const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

function extractVimeoVideoId(url) {
  const vimeoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
  const match = url.match(vimeoRegex);
  return match ? match[1] : null;
}

function extractFacebookVideoId(url) {
  const facebookRegex = /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:video\.php\?v=|watch\?v=)([0-9]+)/;
  const match = url.match(facebookRegex);
  return match ? match[1] : null;
}

function extractTikTokVideoId(url) {
  const tiktokRegex = /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/(?:@[\w-]+\/video\/|v\/)([\w-]+)/;
  const match = url.match(tiktokRegex);
  return match ? match[1] : null;
}

function extractDailymotionVideoId(url) {
  const dailymotionRegex = /dailymotion.com\/video\/([a-zA-Z0-9]+)/;
  const match = url.match(dailymotionRegex);
  return match ? match[1] : null;
}

// Event listener for the preview button
document
  .getElementById("preview-button")
  .addEventListener("click", function () {
    const videoUrl = document.getElementById("video-url").value;
    const embedHTML = embedVideo(videoUrl);
    document.getElementById("preview-container").innerHTML = embedHTML;
  });

// Event listener for form submission
document
  .getElementById("video-submit-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const contestCategory = document.getElementById("contest-category").value;
    const videoUrl = document.getElementById("video-url").value;

    // TODO: Implement your submission logic here
    // This could be sending data to a server, for example

    console.log("Video submitted:", videoUrl, "Category:", contestCategory);

    // Clear the form and preview
    document.getElementById("video-submit-form").reset();
    document.getElementById("preview-container").innerHTML = "";
    alert("Video submitted successfully!");
  });
