import './error.scss'

export default `
<main class="error-box">
    <p class="error-box__status">
        {{{ error.status }}}
    </p>
    <p class="error-box__text">
        {{{ error.text }}}
    </p>
    <a href="{{{ error.back.link }}}" class="error-box__link">
        {{{ error.back.text }}}
    </a>
</main>
`
