import './error.scss'

export default `
<h1 class="error-box__status">
    {{ error.status }}
</h1>
<p class="error-box__text">
    {{ error.text }}
</p>
<a href="{{{ error.back.link }}}" class="error-box__link">
    {{ error.back.text }}
</a>
`
