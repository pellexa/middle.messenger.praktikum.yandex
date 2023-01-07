import './formInput.scss'

/**
 * input.label.value = name or password
 * input.id = name or password
 * input.type = text or password
 * input.validationErrors.error = ...
 */
export default formInput = `
<div class="input-row">
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
</div>
`
