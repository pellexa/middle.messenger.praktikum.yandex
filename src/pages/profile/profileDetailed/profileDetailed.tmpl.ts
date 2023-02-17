import '../profile.scss'

/*
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
*/
export default `
<div class="profile__left-side">
    {{{ linkBack }}}
</div>

<main class="profile__content">
    <div class="avatar avatar_size-profile">
        <img src="{{ apiResponseProfile.avatar }}" alt="avatar"></img>
    </div>

    <h1 class="profile-name">
        {{ apiResponseProfile.first_name }}
    </h1>

    <ul class="profile-properties">
        {{# each apiResponseProfile }}
            <li class="profile-properties__row">
                <div class="profile-key profile_margin-data">
                    {{@ key }}
                </div>
                <div class="profile-value profile_margin-data">
                    {{ this }}
                </div>
            </li>
        {{/ each }}
    </ul>

    {{{ linkChangeData }}}
    {{{ linkChangePassword}}}
    {{{ linkSignout }}}
</main>
`
