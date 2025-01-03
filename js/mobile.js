

function setTouchControl(){
    let isTouchDevice = isTouch();
    if (isTouchDevice) {
        document.getElementById("touch_control_div").classList.remove("d-none");
      } else {
        document.getElementById("touch_control_div").classList.add("d-none");
      }
}

function isTouch(){
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isTouchDevice;
}

