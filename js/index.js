window.onload = function () {
    var search_warp = document.querySelector('.search_warp');
    var focus_before = window.getComputedStyle(document.querySelector('.focus'), '::before');

    pageScroll();
    window.addEventListener('scroll', pageScroll);

    function pageScroll() {
        var focus_BFHeight = parseInt(focus_before.getPropertyValue('height').replace('px', ''));

        if (this.scrollY > focus_BFHeight) {
            search_warp.style.backgroundColor = 'skyblue';
            // search_warp.style.opacity = '0.9';
        } else {
            search_warp.style.backgroundColor = 'transparent';
        }
    }
};