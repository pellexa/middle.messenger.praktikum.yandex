import '../profile.scss'
import './profileEdit.scss'

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
<div class="profile">
    <div class="profile__left-side">
        {{{ IconBack }}}
    </div>

    {{{ profileUploadAvatar }}}

    <main class="profile__content">
        <div class="avatar avatar_size-profile avatar_cursor-profile">
            <img src="{{ apiResponseProfile.avatar }}" alt="avatar"></img>
        </div>

        <h1 class="profile-name">
            {{ apiResponseProfile.first_name }}
        </h1>

        <form class="form-box__form">
            <ul class="profile-properties">
                <li class="profile-properties__row">
                    <label for="email" class="profile-key profile_margin-data profile__label">почта</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        class="profile-value profile_margin-data profile__input"
                        value="{{ apiResponseProfile.email }}" />
                </li>

                <li class="profile-properties__row">
                    <label for="login" class="profile-key profile_margin-data profile__label">логин</label>
                    <input
                        id="login"
                        type="text"
                        name="login"
                        class="profile-value profile_margin-data profile__input"
                        value="{{ apiResponseProfile.login }}" />
                </li>

                <li class="profile-properties__row">
                    <label for="first_name" class="profile-key profile_margin-data profile__label">имя</label>
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        class="profile-value profile_margin-data profile__input"
                        value="{{ apiResponseProfile.first_name }}" />
                </li>

                <li class="profile-properties__row">
                    <label for="second_name" class="profile-key profile_margin-data">фамилия</label>
                    <input
                        id="second_name"
                        type="text"
                        name="second_name"
                        class="profile-value profile_margin-data profile__input profile__label"
                        value="{{ apiResponseProfile.second_name }}" />
                </li>

                <li class="profile-properties__row">
                    <label for="phone" class="profile-key profile_margin-data profile__label">телефон</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        class="profile-value profile_margin-data profile__input"
                        value="{{ apiResponseProfile.phone }}" />
                </li>
            </ul>

            <div class="buttons buttons_margin-registration">
                {{{ acceptButton }}}
            </div>
        </form>
    </main>
</div>
`
