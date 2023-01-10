import menuDotHeaderTmpl from "./menuDotHeader.tmpl";

setTimeout(() => {
    const elemMenu = document.querySelector('.menu-dot__wrapper')
    const elemMenuItems = document.querySelector('.menu-dot__items')

    // Open menu items
    elemMenu.addEventListener('click', elemMenuClick)

    function elemMenuClick() {
        elemMenuItems.style.display = 'block'
    }

    // Close menu items
    document.addEventListener('click', closeMemuItems)

    function closeMemuItems(event) {
        if (!event.target.closest('.menu-dot')) {
            elemMenuItems.style.display = "none";
        }
    }
})

export default menuDotHeaderTmpl
