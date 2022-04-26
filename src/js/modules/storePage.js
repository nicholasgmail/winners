const storePage = function () {
    function show() {
        let wi = window.innerWidth;
        if (wi <= 768) {
            let more = document.querySelectorAll('.card-more');
            more.forEach((elem, index) => {
                if (index > 3) {
                    elem.hidden = true;
                }
            })
        }
    }
    show();
    window.addEventListener('resize', () => {
        let wi = window.innerWidth;
        if (wi > 768) {
            let more = document.querySelectorAll('.card-more');
            more.forEach((elem, index) => {
                if (index > 3) {
                    elem.hidden = false;
                }
            })
        } else {
            show();
        }
    })

    document.addEventListener('alpine:init', () => {

        Alpine.data('more', () => ({
            open: true,
            slideDown() {
                this.open = !this.open;
                let more = document.querySelectorAll('.card-more');
                more.forEach((elem, index) => {
                    if (index > 3) {
                        elem.hidden = this.open;
                    }
                })
            },
        }))
    })
}

export default storePage;
