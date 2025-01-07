/**
 * displays touch controls if mobile 
 */
function setTouchControl(){
    let isTouchDevice = isTouch();
    if (isTouchDevice) {
        document.getElementById("touch_control_div").style.display = "block";
      } else {
        document.getElementById("touch_control_div").style.display = "none";
      }
}

/**
 * checks if device is mobile (or has touch option)
 * @returns true if its touch device
 */
function isTouch(){
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isTouchDevice;
}

/**
 * hides touch controls 
 */
function hideTouchControl(){
    document.getElementById("touch_control_div").style.display = "none";
}

