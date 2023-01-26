import './formInput.scss'

export default `
<label 
    class="input-row__label input-row__label_displayed"
    for="{{ input.id }}"
>
    {{ input.label.value }}
</label>

<input 
    class="input-row__field" id="{{ input.id }}"
    name="{{ input.name }}" type="{{ input.type }}"
    placeholder="{{ input.label.value }}"
/>

<span class="input-row__help">{{ input.validationErrors.error }}</span>
`
