checkWindowHeight();
checkWindowWidth();


//window.addEventListener('resize', checkWindowWidth);
//window.addEventListener('resize', checkWindowHeight);

function checkWindowWidth(){
    if (window.innerWidth < 730) {
        document.getElementById("turn_device").showModal();
      } else {
        document.getElementById("turn_device").close();
      }
}

function checkWindowHeight(){
    if (window.innerHeight < 500) {
        document.getElementById("control_div").classList.add("d-none");
      } else {
        document.getElementById("control_div").classList.remove("d-none");
      }
}

