import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userApi from '~/api/userApi'
import {UserModel, LoginModel, LoginResponse} from '~/model/UserModel'

export const register = createAsyncThunk(
  'users/register',
  async (payload: UserModel) => {
    const user = await userApi.register(payload)
    return user
  },
)

export const login = createAsyncThunk(
  'users/login',
  async (payload: LoginModel) => {
    const data = await userApi.login(payload)
    return data
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {} as LoginResponse,
    setting: {},
  },
  reducers: {
    resetCurrentUser(state) {
      state.current = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(state, action)
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.current = {
        token: action.payload.token,
        user: action.payload.user,
      }
    })
  },
})

const {reducer, actions} = userSlice

export const {resetCurrentUser} = actions
export default reducer
