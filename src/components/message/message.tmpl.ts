import './message.scss'

export default `
{{# if date }}
    <time class="messages-date">
        {{ date }}
    </time>
{{/ if}}


<div class="message {{# if isMy }} message_aling-right {{/ if}}">
    {{# if isImage }}
        <div class="message__image">
            <img src="{{ msg.content.image }}" alt="image">
        </div>
    {{ else }}
        <p class="message__text">
            {{ msg.content}}
        </p>
    {{/ if }}

    <time class="message__time">
        11:56
    </time>
</div>
`
