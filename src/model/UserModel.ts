export interface UserModel {
  id?: number
  full_name: string
  furigana_name: string
  email: string
  phone_number: string
  fax_number: string
  gender: string | number
  date_of_birth: string
  email_accept: string | number
  login_id: string
  pass_word: string
  facebook_account_id?: string
  goole_account_id?: string
}

export interface LoginModel {
  login_id: string
  pass_word: string
}

export interface LoginResponse {
  message?: string
  token?: string
  user?: UserResponModel
}

export interface UserResponModel {
  email: string
  gender: string
  user_id: number
  full_name: string
  furigana_name: string
  phone_number: string
  fax_number: string
  date_of_birth: string
  login_id: string
  roleName: string
  address: [
    {
      prefecture: string
      address1: string
      address2: string
      address_id: number
      post_id: string
    },
  ]
}
