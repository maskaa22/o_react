
export function handleClick(e) {
    const {target} = e;
    const buttons = document.querySelectorAll('.category');


    if (target.classList.contains('category')) {

        // Clear any active buttons
        buttons.forEach(button => button.classList.remove('active-menu'));
        target.classList.add('active-menu');
    }
}
export function closeHandleClick() {
    // const buttons = document.querySelectorAll('.category');
    //
    // if (buttons.classList.contains('active-menu')) {
    //     buttons.classList.remove('active-menu');
    // }


    // const button = document.getElementById('6207f02096c37103ae61321b');
    //  if(button) {
    //      button.classList.add('active-menu');
    //  }
}
export function openFilterName() {
    const filter = document.querySelector('.filter-name');
    filter.classList.add('no-name');
    if (filter.classList.contains('filter-name-no')) {
        filter.classList.remove('filter-name-no')
    }
}
export function closeFilterName() {
    const filter = document.querySelector('.filter-name');
    filter.classList.add('filter-name-no');
}
export function ifOpenPageAddActiveClass () {
    const elsP = document.getElementsByTagName('a');
    for (let i = 12; i < elsP.length; i++) {
        if(window.location.href===elsP[i].href) {
            elsP[i].children[0].classList.add('active-menu')
        }
    }
}
