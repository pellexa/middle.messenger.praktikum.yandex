import './searchUserList.scss'

/*
[
  {
    "id": 123,
    "first_name": "Petya",
    "second_name": "Pupkin",
    "display_name": "Petya Pupkin",
    "login": "userLogin",
    "email": "my@email.com",
    "phone": "89223332211",
    "avatar": "/path/to/avatar.jpg"
  }
]
*/

export default `
{{# each data }}
    <li class="search-user" data-user-id="{{ this.id }}">
      {{# if this._wasAdded }}
        <span class="search-user__was-added">-<span>
      {{ else }}
        <span class="search-user__was-added">+<span>
      {{/ if}}

      {{ this.first_name }} {{ this.second_name }}
    </li>
{{/ each }}
`
