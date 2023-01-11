import './registration.scss'

export default `
<div class="form-box">
    <div class="form-box__header">Вход</div>

    <form class="form-box__form">
        {{{ formInputEmail }}}
        {{{ formInputLogin }}}
        {{{ formInputFirstName }}}
        {{{ formInputSecondName }}}
        {{{ formInputPhone }}}
        {{{ formInputPassword }}}
        {{{ formInputPasswordAgain }}}

        <div class="buttons buttons_margin-registration">
            {{{ acceptButton }}}
            <a href="#" class="link">войти</a>
        </div>
    </form>
</div>
`
