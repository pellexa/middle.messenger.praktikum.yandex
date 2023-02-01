import '../profile.scss'
import './profileEdit.scss'

export default `
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
        <div class="profile-properties">
            <div class="profile-properties__row">
                {{{ formInputEmailLabel }}}
                {{{ formInputEmail }}}
            </div>
            {{{ formInputEmailValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputLoginLabel }}}
                {{{ formInputLogin }}}
            </div>
            {{{ formInputLoginValidationError }}}
            

            <div class="profile-properties__row">
                {{{ formInputFirstNameLabel }}}
                {{{ formInputFirstName }}}
            </div>
            {{{ formInputFirstNameValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputSecondNameLabel }}}
                {{{ formInputSecondName }}}
            </div>
            {{{ formInputSecondNameValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputDisplayNameLabel }}}
                {{{ formInputDisplayName }}}
            </div>
            {{{ formInputDisplayNameValidationError }}}

            <div class="profile-properties__row">
                {{{ formInputPhoneLabel }}}
                {{{ formInputPhone }}}
            </div>
            {{{ formInputPhoneValidationError }}}
        </div>

        <div class="buttons buttons_margin-registration">
            {{{ acceptButton }}}
        </div>
    </form>
</main>
`
