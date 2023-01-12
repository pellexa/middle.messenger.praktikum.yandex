import '../profile.scss'
import './profilePasswordEdit.scss'

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

    <main class="profile__content">
        <div class="avatar avatar_size-profile">
            <img src="{{ apiResponseProfile.avatar }}" alt="avatar"></img>
        </div>

        <h1 class="profile-name">
            {{ apiResponseProfile.first_name }}
        </h1>

        <form class="form-box__form">
            <ul class="profile-properties">
                <li class="profile-properties__row">
                    <label for="old_password" class="profile-key profile_margin-data profile__label">старый пароль</label>
                    <input
                        id="old_password"
                        type="password"
                        name="old_password"
                        class="profile-value profile_margin-data profile__input"
                    />
                </li>

                <li class="profile-properties__row">
                    <label for="new_password" class="profile-key profile_margin-data profile__label">новый пароль</label>
                    <input
                        id="new_password"
                        type="password"
                        name="new_password"
                        class="profile-value profile_margin-data profile__input"
                    />
                </li>

                <li class="profile-properties__row">
                    <label for="new_password_again" class="profile-key profile_margin-data profile__label">повторите новый пароль</label>
                    <input
                        id="new_password_again"
                        type="password"
                        name="new_password_again"
                        class="profile-value profile_margin-data profile__input"
                    />
                </li>
            </ul>

            <div class="buttons buttons_margin-registration">
                {{{ acceptButton }}}
            </div>
        </form>
    </main>
</div>
`
