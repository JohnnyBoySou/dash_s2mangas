
import { get, post } from "./api-service"

// QUERY_KEYS
const LOGIN_USER = "LOGIN_USER"
const REGISTER_USER = "REGISTER_USER"
const VERIFY_EMAIL = "VERIFY_EMAIL"
const GET_PROFILE = "GET_PROFILE"
const UPDATE_PROFILE = "UPDATE_PROFILE"
const DELETE_ACCOUNT = "DELETE_ACCOUNT"

const ROUTE_API = "/admin/users"

// INTERFACES
//...

// FUNCTIONS
export const UsersService = {
  async list(): Promise<void | null> {
    try {
      const res = await get<void>(`${ROUTE_API}`)
      console.log(res.data)
      return res?.data as void
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message || 'Erro na listagem de usuários')
    }
  },

  QUERY_KEY: {
    LOGIN_USER,
    REGISTER_USER,
    VERIFY_EMAIL,
    GET_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
  }
}