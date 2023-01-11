import './chatList.scss'

/*
[
  {
    "id": 123,
    "title": "my-chat",
    "avatar": "/123/avatar1.jpg",
    "unread_count": 15,
    "last_message": {
      "user": {
        "first_name": "Petya",
        "second_name": "Pupkin",
        "avatar": "/path/to/avatar.jpg",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2020-01-02T14:22:22.000Z",
      "content": "this is message content"
    }
  }
]
*/

export default `
<div class="chat-list">
    {{# each data }}
        <div class="chat">
            <div class="avatar avatar_size-chat-list">
                <img src="{{ this.avatar }}" alt="avatar">
            </div>

            <div class="chat__content">
                <div class="chat__header">
                    <div class="title">
                        {{ this.title }}
                    </div>

                    <div class="chat__time">
                        {{ this.last_message.time }}
                    </div>
                </div>

                <div class="chat__message">
                    <div class="chat__brief">
                        {{ this.last_message.content }} 
                    </div>

                    <div class="chat__unread">
                        <span class="unread_count">{{ this.unread_count }}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="hr hr_margin-left-side" />
    {{/ each }}
</div>
`
