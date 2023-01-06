import './registration.scss'

export default registration = `
<div class="form-box">
    <div class="form-box__header">Вход</div>

    <form class="form-box__form">
        {{{ inputEmail }}}
        {{{ inputLogin }}}
        {{{ inputFirstName }}}
        {{{ inputSecondName }}}
        {{{ inputPhone }}}
        {{{ inputPassword }}}
        {{{ inputPasswordAgain }}}

        <div class="buttons buttons_margin-registration">
            {{{ acceptButton }}}
            <a href="#" class="link">войти</a>
        </div>
    </form>
</div>
`
