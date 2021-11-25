document.addEventListener("mousemove", parallax);

function parallax(e) {
    this.querySelectorAll('.layer').forEach(function(layer) {

        let speed = layer.getAttribute('data-speed');

        let x = (window.innerWidth - e.pageX * speed) / 100;
        let y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = 'translate3d(' + x + 'px,' + y + 'px, 0)';

    })};