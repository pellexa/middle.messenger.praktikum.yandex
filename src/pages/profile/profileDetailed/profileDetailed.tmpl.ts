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
        <img class="avatar__img" src="{{ userAvatar }}" alt="avatar"></img>
    </div>

    <h1 class="profile-name">
        {{ authUser.first_name }}
    </h1>

    <ul class="profile-properties">
        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">идентификатор</div>
            <div class="profile-value profile_margin-data">{{ authUser.id }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">имя</div>
            <div class="profile-value profile_margin-data">{{ authUser.first_name }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">фамилия</div>
            <div class="profile-value profile_margin-data">{{ authUser.second_name }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">логин</div>
            <div class="profile-value profile_margin-data">{{ authUser.login }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">аватар</div>
            <div class="profile-value profile_margin-data">{{ authUser.avatar }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">почта</div>
            <div class="profile-value profile_margin-data">{{ authUser.email }}</div>
        </li>

        <li class="profile-properties__row">
            <div class="profile-key profile_margin-data">телефон</div>
            <div class="profile-value profile_margin-data">{{ authUser.phone }}</div>
        </li>
    </ul>

    {{{ linkChangeData }}}
    {{{ linkChangePassword}}}
    {{{ linkSignout }}}
</main>
`
