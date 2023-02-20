import './messageList.scss'

export default `
{{# each data }}
    <div class="message {{# if this._isMy }} message_aling-right {{/ if}}">
        {{# if this._isText }}
            <p class="message__text">
                {{{ this.content }}}
            </p>
        {{ else }}
            <div class="message__image">
                <img src="{{ msg.content.image }}" alt="image">
            </div>
        {{/ if }}

        <time class="message__time">
            {{ this._messageTime }}
        </time>
    </div>
{{/ each }}
`
