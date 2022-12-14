const imgContainerEl = document.querySelector(".image-container");
const loaderEl = document.querySelector(".loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 20;
const apiKey = "7X8liFC8gzjgPqrmlDbzaBqj5WDuDZlNQzAqFQ1RO88";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Function(s)
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loaderEl.hidden = true;
  }
}

// Display Photos From Unsplash
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  //iterating through the photosArray to create individual element
  photosArray.forEach((img) => {
    //creating a link for each photo
    let anchorEl = document.createElement("a");
    anchorEl.setAttribute("href", img.links.html);
    anchorEl.setAttribute("target", "_blank");
    imgContainerEl.appendChild(anchorEl);
    //creating an img tag for each photo
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", img.urls.regular);
    imgEl.setAttribute("alt", img.alt_description);
    anchorEl.appendChild(imgEl);

    // Event Listener to check when each img has finished loading
    imgEl.addEventListener("load", imageLoaded);
  });
}

//Get phptos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}
getPhotos();

// coding the Infinite Scroll Function
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
