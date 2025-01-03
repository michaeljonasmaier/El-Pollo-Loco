function setTouchControl(){
    let isTouchDevice = isTouch();
    if (isTouchDevice) {
        document.getElementById("touch_control_div").style.display = "block";
      } else {
        document.getElementById("touch_control_div").style.display = "none";
      }
}

function isTouch(){
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isTouchDevice;
}

function hideTouchControl(){
    document.getElementById("touch_control_div").style.display = "none";
}

