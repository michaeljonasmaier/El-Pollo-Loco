checkWindowHeight();
checkWindowWidth();
window.addEventListener('resize', checkWindowWidth);
window.addEventListener('resize', checkWindowHeight);

/**
 * checks if window is below certain size and shows turn device message if needed
 */
function checkWindowWidth() {
  if (window.innerWidth < 570) {
    document.getElementById("turn_device").showModal();
    document.getElementById("canvas").classList.add("d-none");
  } else {
    document.getElementById("turn_device").close();
    document.getElementById("canvas").classList.remove("d-none");
  }
}

/**
 * checks if window is below certain height and hides control information
 */
function checkWindowHeight() {
  if (window.innerHeight < 555) {
    document.getElementById("control_div").classList.add("d-none");
  } else {
    document.getElementById("control_div").classList.remove("d-none");
  }
}

