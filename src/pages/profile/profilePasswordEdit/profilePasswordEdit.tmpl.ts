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
<div class="profile__left-side">
    {{{ linkBack }}}
</div>

<main class="profile__content">
    <div class="avatar avatar_size-profile">
        <img src="{{ authUser.avatar }}" alt="avatar"></img>
    </div>

    <h1 class="profile-name">
        {{ authUser.first_name }}
    </h1>

    <form class="form-box__form">
        <div class="profile-properties">
            <div class="profile-properties__row">
                {{{ formInputOldPasswordLabel }}}
                {{{ formInputOldPassword }}}
            </div>
            {{{ formInputOldPasswordValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputNewPasswordLabel }}}
                {{{ formInputNewPassword }}}
            </div>
            {{{ formInputNewPasswordValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputNewPasswordAgainLabel }}}
                {{{ formInputNewPasswordAgain }}}
            </div>
            {{{ formInputNewPasswordAgainValidationError }}}
        </div>

        <div class="buttons buttons_margin-registration">
            {{{ acceptButton }}}
        </div>
    </form>
</main>
`
