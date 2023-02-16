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
{{{ chatButtonShowModal }}}

{{# each data }}
    <li class="chat" data-chat-id="{{ this.id }}">
        <div class="avatar avatar_size-chat-list">
            <img src="{{ this.avatar }}" alt="avatar">
        </div>

        <div class="chat__content">
            <div class="chat__header">
                <h6 class="title">
                    {{ this.title }}
                </h6>

                <time class="chat__time">
                    {{ this.last_message.time }}
                </time>
            </div>

            <div class="chat__message">
                <p class="chat__brief">
                    {{ this.last_message.content }} 
                </p>

                <p class="chat__unread">
                    <span class="unread_count">{{ this.unread_count }}</span>
                </p>
            </div>
        </div>
    </li>

    <div class="chat__remove" data-chat-id="{{ this.id }}">удалить</div>

    <hr class="hr hr_margin-left-side" />
{{/ each }}
`
