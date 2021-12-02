document.getElementById("btn-menu").addEventListener("click", toogle);

function toogle() {
    let f = document.getElementById("footer");
    let x = document.getElementById("menu");

    if (x.style.display === "block") {
      x.style.display = "none";
      f.style.display = "block";
    } else {
      x.style.display = "block";
        f.style.display = "none";
    }
  }