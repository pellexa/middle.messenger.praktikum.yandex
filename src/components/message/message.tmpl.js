import './message.scss'

export default `
{{# if date }}
    <div class="messages-date">
        {{ date }}
    </div>
{{/ if}}


<div class="message {{# if isMy }} message_aling-right {{/ if}}">
    {{# if isImage }}
        <div class="message__image">
            <img src="{{ msg.content.image }}" alt="image">
        </div>
    {{ else }}
        <div class="message__text">
            {{ msg.content}}
        </div>
    {{/ if }}

    <div class="message__time">
        11:56
    </div>
</div>
`
