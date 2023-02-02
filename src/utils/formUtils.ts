import Input from '../components/input'
import ValidationError from '../components/validationError'

export function jsonFromData(needFields: Array<{
  field: Input,
  validation: ValidationError
}>) {
  const result: Record<string, unknown> = {}
  const formElement = this.target as HTMLFormElement
  const formData = new FormData(formElement)

  needFields.forEach((elements: {
    field: Input,
    validation: ValidationError
  }) => {
    const fieldId = elements.field.props.tagAttrs!.id
    const value = formData.get(fieldId)
    if (value instanceof File) {
      if (value.size !== 0) {
        result[fieldId] = value
      }
    } else if (value) {
      result[fieldId] = value
    }
  })

  return result
}

enum LangValue {
  Cyrillic = 'cyrillic',
  Latin = 'latin'
}

type Langs = [LangValue, LangValue?]

const validationRules = {
  specialCharacters: (value: string) => !!value.match(/[.*+?^${}()|[\]\\`~!@#%&№;:,/<>]/),
  space: (value: string) => !!value.match('^.*\\s+.*$'),
  length: (value: string, min: number, max: number) => !!value.match(`^.{${min},${max}}$`),
  langs: (value: string, langs: Langs, allowSymbols: string) => {
    let str = ''
    langs.forEach((lang: LangValue) => {
      if (lang === LangValue.Cyrillic) {
        str += `(^[а-яА-Я${allowSymbols}]+$)|`
      } else if (lang === LangValue.Latin) {
        str += `(^[a-zA-Z${allowSymbols}]+$)|`
      }
    })

    str = `${str.slice(0, -1)}`
    return !!value.match(str)
  },
  onlyNumbers: (value: string) => !!value.match('^[0-9]+$'),
  oneUppercase: (value: string) => !!value.match(/^.*[A-ZА-Я]+.*$/),
  oneNumber: (value: string) => !!value.match(/^.*[0-9].*$/),
  at: (value:string) => !!value.match(/^.+@[a-zA-Z]+\.[a-zA-Z]+$/),
  firstUppercase: (value: string) => !!value.match(/^[A-ZА-Я]+.*$/),
  phone: (value: string) => !!value.match(/^\+?[0-9]+$/),
}

const validations: Record<string, Function> = {
  login: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false
    const min = 3
    const max = 20

    field.setProps({ value })
    validation.setProps({ error: null })

    if (validationRules.specialCharacters(value)) {
      validation.setProps({ error: 'Не может содежать симолы: .*+?^${}()|[]\\`~!@#%&№;:,/<> .' })
    } else if (validationRules.space(value)) {
      validation.setProps({ error: 'Не может содежать пробелы.' })
    } else if (!validationRules.length(value, min, max)) {
      validation.setProps({ error: `Логин должен содержать от ${min} до ${max} символов.` })
    } else if (!validationRules.langs(value, [LangValue.Latin], '0-9_-')) {
      validation.setProps({ error: 'Может содержать только латиницу.' })
    } else if (validationRules.onlyNumbers(value)) {
      validation.setProps({ error: 'Не должен состоять из одних цифр.' })
    } else {
      isValid = true
    }
    return isValid
  },

  password: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false
    const min = 8
    const max = 40

    field.setProps({ value })
    validation.setProps({ error: null })
    if (!validationRules.length(value, min, max)) {
      validation.setProps({ error: `Пароль должен содержать от ${min} до ${max} символов.` })
    } else if (!validationRules.oneUppercase(value)) {
      validation.setProps({ error: 'Пароль должен иметь хотя бы одну заглавную букву.' })
    } else if (!validationRules.oneNumber(value)) {
      validation.setProps({ error: 'Пароль должен иметь хотя бы одну цифру.' })
    } else {
      isValid = true
    }
    return isValid
  },

  password_again: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false
    const passwordValue = (document.getElementById('password') as HTMLInputElement).value

    field.setProps({ value })
    validation.setProps({ error: null })
    if (value !== passwordValue) {
      validation.setProps({ error: 'Не совпадает с введённым выше паролем.' })
    } else {
      isValid = true
    }

    return isValid
  },

  email: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false

    field.setProps({ value })
    validation.setProps({ error: null })

    if (!validationRules.langs(value, [LangValue.Latin], '0-9@.-')) {
      validation.setProps({ error: 'Может содержать только латиницу.' })
    } else if (!validationRules.at(value)) {
      validation.setProps({
        error: 'Емайл должен состоять из букв(цифр), символ @, после которого должны быть буквы,\
                затем точка, и снова буквы.',
        }
      )
    } else {
      isValid = true
    }

    return isValid
  },

  first_name: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false

    field.setProps({ value })
    validation.setProps({ error: null })

    if (!validationRules.langs(value, [LangValue.Latin, LangValue.Cyrillic], '-')) {
      validation.setProps({
        error: 'Может содержать либо латиницу, либо кириллицу, без пробелов и цифр,\
                доступен дефис.',
       })
    } else if (!validationRules.firstUppercase(value)) {
      validation.setProps({ error: 'Первая буква должна быть заглавной.' })
    } else {
      isValid = true
    }

    return isValid
  },

  second_name: function(value: string, field: Input, validation: ValidationError) {
    return this.first_name(value, field, validation)
  },

  phone: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false
    const min = 10
    const max = 15

    field.setProps({ value })
    validation.setProps({ error: null })

    if (!validationRules.length(value, min, max)) {
      validation.setProps({ error: `Телефон должен содержать от ${min} до ${max} символов.` })
    } else if (!validationRules.phone(value)) {
      validation.setProps({ error: 'Телефон должен содержать только цифры, может начинаться с +.' })
    } else {
      isValid = true
    }

    return isValid
  },

  // На это поле не было валидационных требований.
  display_name: () => true,

  // На это поле не было валидационных требований.
  file: () => true,

  message: (value: string, field: Input, validation: ValidationError) => {
    let isValid = false

    const fileInput = (document.getElementById('file') as HTMLInputElement)

    field.setProps({ value })
    validation.setProps({ error: null })

    if (!value.trim() && !fileInput.files!.length) {
      validation.setProps({ error: `Сообщение не может быть пустым.` })
    } else {
      isValid = true
    }

    return isValid
  },
}

export function validationFormData(needFields: Array<{
  field: Input,
  validation: ValidationError
}>) {
  const result: Record<string, boolean> = {}
  const formElement = this.target as HTMLFormElement
  const formData = new FormData(formElement!)

  needFields.forEach((elements: {
    field: Input,
    validation: ValidationError
  }) => {
    const { field } = elements
    const { validation } = elements
    const fieldId = field.props.tagAttrs!.id

    result[fieldId] = runValidation(fieldId, formData.get(fieldId), field, validation)
  })

  return result
}

export function runValidation(
  name: string,
  value: FormDataEntryValue | null,
  field: Input,
  validation: ValidationError
): boolean {
  return validations[name](value, field, validation)
}
