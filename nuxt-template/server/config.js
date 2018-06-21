import { apiUrl } from './url'

export default {
	//自定义头部
	headers: {
		post: {
	      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	    },
	    'X-Requested-With': 'XMLHttpRequest'
	},

	baseURL: String(apiUrl),

	timeout: 10000,

	withCredentials: true,

	responseType: 'json',

	xsrfCookieName: 'XSRF-TOKEN',
	
 	xsrfHeaderName: 'X-XSRF-TOKEN',
}