import './signin.scss'

export default `
<main class="form-box">
    <div class="form-box__header">Вход</div>

    <form class="form-box__form">
        {{{ formInputLogin }}}
        {{{ formInputPassword }}}

        <div class="buttons buttons_margin-singin">
            {{{ acceptButton }}}
            <a href="#" class="link">нет аккаунта?</a>
        </div>
    </form>
</main>
`
