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
    result[fieldId] = formData.get(fieldId)
  })

  return result
}

enum LangValue {
  Cyrillic = 'cyrillic',
  Latin = 'latin'
}

type Langs = [LangValue, LangValue?]

const validationRules = {
  specialCharacters: (value: string) => value.match(/[.*+?^${}()|[\]\\`~!@#%&№;:,/<>]/),
  space: (value: string) => value.match('^.*\\s+.*$'),
  length: (value: string, min: number, max: number) => value.match(`^.{${min},${max}}$`),
  langs: (value: string, langs: Langs) => {
    let str = '('
    langs.forEach((lang: LangValue) => {
      if (lang === LangValue.Cyrillic) {
        str += '[0-9а-яА-Я_-]|'
      } else if (lang === LangValue.Latin) {
        str += '[0-9a-zA-Z_-]|'
      }
    })

    str = `${str.slice(0, -1)})`
    return value.match(`^${str}+$`)
  },
  onlyNumbers: (value: string) => value.match('^[0-9]+$'),
  oneUppercase: (value: string) => value.match(/^.*[A-ZА-Я]+.*$/),
  oneNumber: (value: string) => value.match(/^.*[0-9].*$/),
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
      validation.setProps({ error: `Логин должен содержать от ${min} до ${max} символы.` })
    } else if (!validationRules.langs(value, [LangValue.Latin])) {
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
      validation.setProps({ error: `Пароль должен содержать от ${min} до ${max} символы.` })
    } else if (!validationRules.oneUppercase(value)) {
      validation.setProps({ error: 'Пароль должен иметь хотя бы одну заглавную букву.' })
    } else if (!validationRules.oneNumber(value)) {
      validation.setProps({ error: 'Пароль должен иметь хотя бы одну цифру.' })
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
