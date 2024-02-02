export interface RegisterModel {
  full_name: string
  furigana_name: string
  post_id: string
  prefecture: string
  address1: string
  address2: string
  email: string
  phone_number: string
  fax_number: string
  gender: string | number
  year: string
  month: string
  day: string
  login_id: string
  pass_word: string
  checkPassword: string
  email_accept: string | number
}
