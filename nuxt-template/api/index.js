import axios from '~/server/index'

/* ========用户======= */
// 用户注册
export function UserRegister(data) {
  	return axios.post("/action", data)
}