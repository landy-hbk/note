import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import config from './config'


const server = axios.create(config);


server.interceptors.request.use( 
	config => {
		if(config.method === 'post')  config.data = qs.stringify(config.data)

		return config
	}, error => {

		return Promise.reject(error)
	}
)


server.interceptors.response.use(
	res => {
		if(res.data.status === 0 ) {
			Message.error({
		        message: res.data.message, 
		        duration: 1500,
		    });
		}

		return res.data
	}, error => {
		return Promise.reject(error)
	}

)


export default {
	post(url, data) {
		return server({
			method: 'post',
			url,
			params: data
		})
	},
	get(url, data) {
		return server({
			method: 'get',
			url,
			params: data
		})
	}
}