export const button = (btn) => document.getElementById(btn);
export const menu = (list) => document.getElementById(list);

const body = document.body;

export const subLinkOne = (linkOneName) => document.getElementById(linkOneName);
export const subLinkTwo = (linkTwoName) => document.getElementById(linkTwoName);

export function openToogleMenu(buttonName, menuName, active, noScroll) {
    button(buttonName).classList.toggle(active);
    menu(menuName).classList.toggle(active);
    body.classList.toggle(noScroll);
}

export function closeToogleMenu(buttonName, menuName, active, noScroll, linkOneName, linkTwoName, activeLinkOne, activeLinkTwo) {
    if (menu(menuName).classList.contains(active) && buttonName) {
        button(buttonName).classList.remove(active);
        menu(menuName).classList.remove(active);
        body.classList.remove(noScroll);
    }
    if (subLinkOne(linkOneName) != null) {
        if (subLinkOne(linkOneName).classList.contains(activeLinkOne) || subLinkTwo(linkTwoName).classList.contains(activeLinkTwo)) {
            subLinkOne(linkOneName).classList.remove(activeLinkOne);
            subLinkTwo(linkTwoName).classList.remove(activeLinkTwo);
        }
    }
}
