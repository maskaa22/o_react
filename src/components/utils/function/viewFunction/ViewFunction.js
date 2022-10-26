export function ViewFunction() {
    const container = document.querySelector('.home-menu');
    const buttons = document.querySelectorAll('.click-item');

    if (container) {
        container.addEventListener('click', handleClick, false);
    }

    function handleClick(e) {
        const {target} = e;

        if (target.classList.contains('click-item')) {

            buttons.forEach(button => button.classList.remove('active-item'));
            target.classList.add('active-item');
        }
    }
}
