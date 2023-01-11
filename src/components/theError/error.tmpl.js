import './error.scss'

export default `
<div class="error-box">
    <div class="error-box__status">
        {{{ error.status }}}
    </div>
    <div class="error-box__text">
        {{{ error.text }}}
    </div>
    <a href="{{{ error.back.link }}}" class="error-box__link">
        {{{ error.back.text }}}
    </a>
</div>
`
