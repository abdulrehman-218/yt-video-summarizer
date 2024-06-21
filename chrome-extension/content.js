// content.js
// This script is injected into the current web page

// Inject jQuery into the page (if not already present)
if (typeof jQuery === "undefined") {
  var script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.6.4.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Add a transcriptButton button to the page
var transcriptButton = document.createElement("button");
transcriptButton.textContent = "Read";
transcriptButton.addEventListener("click", function() {
  // Replace this with your download logic
  console.log('logged in main')
 
});

document.body.appendChild(transcriptButton);

