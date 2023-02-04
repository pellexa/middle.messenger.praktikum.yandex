import './registration.scss'

export default `
<div class="form-box__header">Вход</div>

<form class="form-box__form">
    <div class="input-row">
        {{{ formInputEmailLabel }}}
        {{{ formInputEmail }}}
        {{{ formInputEmailValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputLoginLabel }}}
        {{{ formInputLogin }}}
        {{{ formInputLoginValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputFirstNameLabel}}}
        {{{ formInputFirstName }}}
        {{{ formInputFirstNameValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputSecondNameLabel }}}
        {{{ formInputSecondName }}}
        {{{ formInputSecondNameValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputPhoneLabel }}}
        {{{ formInputPhone }}}
        {{{ formInputPhoneValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputPasswordLabel }}}
        {{{ formInputPassword }}}
        {{{ formInputPasswordValidationError }}}
    </div>

    <div class="input-row">
        {{{ formInputPasswordAgainLabel }}}
        {{{ formInputPasswordAgain }}}
        {{{ formInputPasswordAgainValidationError }}}
    </div>

    <div class="buttons buttons_margin-registration">
        {{{ acceptButton }}}
        <a href="#" class="link">войти</a>
    </div>
</form>
`
