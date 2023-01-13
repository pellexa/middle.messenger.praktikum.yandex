import './main.scss'

export default `
<main class="main">
    <div class="left-side">
        <p class="left-side__header">
            профиль >
        </p>

        <div class="left-side__search">
            {{{ inputSearch }}}
        </div>

        <hr class="hr hr_margin-left-side" />

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

            <div class="content__send">
                <div class="icon">{{{ IconAttachSvg }}}</div>
                <input name="message" type="text" class="input input_border-radius_m input_bg-color_lightgray" placeholder="Сообщение" />
                <div class="icon">{{{ IconSendSvg }}}</div>
            </div>
        {{ else }}
            <p class="content__no-data">Выберите чат чтобы отправить сообщение</p>
        {{/ if }}
    </div>
</main>
`
