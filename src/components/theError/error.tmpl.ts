import './error.scss'

export default `
<h1 class="error-box__status">
    {{ error.status }}
</h1>
<p class="error-box__text">
    {{ error.text }}
</p>
{{{ linkBack }}}
`
