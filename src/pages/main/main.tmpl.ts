import './main.scss'

export default `
<div class="left-side">
    <p class="left-side__header">
        профиль >
    </p>

    <div class="left-side__search">
        {{{ inputSearch }}}
    </div>

    <hr class="hr hr_margin-left-side" />

        {{{ chatModal }}}
        {{{ chatList }}}
</div>

<div class="content">
    {{# if selectedChat }}
        <div class="content__header">
            <div class="profile-chat">
                <div class="avatar avatar_size-profile-chat">
                    <img src="{{ selectedChat.avatar }}" alt="avatar">
                </div>

                <h6 class="title">
                    {{ selectedChat.title }}
                </h6>
            </div>

            {{{ menuDotHeader }}}
        </div>

        <hr class="hr hr_margin-content" />

        <div class="content__messages">
            {{{ messages }}}
        </div>

        <hr class="hr hr_margin-content" />
        
        {{{ formInputMessageValidationError }}}
        {{{ formMessage }}}
    {{ else }}
        <p class="content__no-data">Выберите чат чтобы отправить сообщение</p>
    {{/ if }}
</div>
`
