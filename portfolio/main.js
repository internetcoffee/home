// Flag to track whether the user is currently dragging
let isDragging = false;

// Variables to store the starting position of the cursor
let startX, startY;

// Variables to track the background's position
let bgPosX = 0, bgPosY = 0;

// Grab classes from CSS
const images = document.querySelectorAll(".draggable");
const noDrag = document.querySelector(".no-drag");

// Store all image positions
const imagePositions = new Map();

// Disable scrolling
document.body.classList.add('no-scroll');

// Initialize positions based on their CSS values
images.forEach(img => {
  const rect = img.getBoundingClientRect();
  imagePositions.set(img, { left: rect.left, top: rect.top });
  img.ondragstart = () => false
});

// Get the image's initial position from the DOM
// const rect = dragImage.getBoundingClientRect();
// imgPosX = rect.left;
// imgPosY = rect.top;

// Event listener for when the user clicks (starts dragging)
document.addEventListener("mousedown", (e) => {
  if (noDrag.contains(e.target)) return;
  isDragging = true; // Set dragging flag to true
  startX = e.clientX; // Store the initial X position of the cursor
  startY = e.clientY; // Store the initial Y position of the cursor
});

// Event listener for when the user moves the mouse while dragging
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return; // Exit if dragging is not active

  // Calculate how much the cursor has moved
  let dx = e.clientX - startX;
  let dy = e.clientY - startY;

  // Update background and image position based on cursor movement
  bgPosX += dx;
  bgPosY += dy;
  // imgPosX += dx;
  // imgPosY += dy;

  // Apply the new background and image position
  document.body.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
  // dragImage.style.left = `${imgPosX}px`;
  // dragImage.style.top = `${imgPosY}px`;

    // Update all images' positions
    images.forEach(img => {
      let pos = imagePositions.get(img);
      pos.left += dx;
      pos.top += dy;
      img.style.left = `${pos.left}px`;
      img.style.top = `${pos.top}px`;
    });

  // Update the starting position for the next movement
  startX = e.clientX;
  startY = e.clientY;
});

// Event listener for when the user releases the mouse (stops dragging)
document.addEventListener("mouseup", () => {
  isDragging = false; // Reset dragging flag
});


document.addEventListener("DOMContentLoaded", function () {
  const pageBg = document.querySelector(".page-bg");
  const xButton = document.querySelector(".x-button");
  const hoverItems = document.querySelectorAll(".hover");

  let activeSection = null;

  hoverItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // If a section is already open and it's not the same one, close it
      if (activeSection && activeSection !== targetSection) {
        activeSection.classList.remove("visible");
      }

      //Show the clicked section
      targetSection.classList.add("visible");
      activeSection = targetSection;

      pageBg.classList.add("visible");
      xButton.classList.add("visible");

      document.body.classList.remove('no-scroll');
    });
  });

  xButton.addEventListener("click", () => {
    pageBg.classList.remove("visible");
    xButton.classList.remove("visible");
    document.body.classList.add('no-scroll');

    if (activeSection) {
      activeSection.classList.remove("visible");
      activeSection = null;
    }
  });
});