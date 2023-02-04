import './signin.scss'

export default `
<div class="form-box__header">Вход</div>

<form class="form-box__form">
    <div class="input-row">
        {{{ formInputLoginLabel }}}
        {{{ formInputLogin }}}
        {{{ formInputLoginValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputPasswordLabel }}}
        {{{ formInputPassword }}}
        {{{ formInputPasswordValidationError }}}
    </div>

    <div class="buttons buttons_margin-singin">
        {{{ acceptButton }}}
        <a href="#" class="link">нет аккаунта?</a>
    </div>
</form>
`
