import './menuDotHeader.scss'

export default `
<div class="menu-dot">
    <div class="menu-dot__wrapper">
        <div class="menu-dot__dot"></div>
    </div>

    <ul class="menu-dot__items">
        {{{ menuDotHeaderItemComponents }}}
    </ul>
</div>
`
