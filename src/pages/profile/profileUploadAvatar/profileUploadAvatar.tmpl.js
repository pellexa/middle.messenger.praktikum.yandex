import './profileUploadAvatar.scss'

export default `
<div class="modal">
    <div class="modal__content">
        <h2 class="modal__title-upload">загрузите файл</h2>

        <form class="modal__form" enctype="multipart/form-data">
            <label class="modal__label-upload">
                <input 
                    type="file"
                    id="avatar"
                    name="avatar"
                    class="modal__input-upload"
                    accept="image/gif, image/jpeg, image/png"
                />
                Выбрать файл на компьютере
            </label>

            <div class="buttons buttons_margin-registration">
                {{{ acceptButton }}}
            </div>
        </form>
    </div>
</div>
`
