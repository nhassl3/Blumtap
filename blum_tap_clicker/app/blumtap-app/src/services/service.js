import axios from 'axios'

class BlumDataService {
	login(data) {
		return axios.post('https://nhassl3.pythonanywhere.com/blum/login/', data)
	}

	register(data) {
		return axios.post('https://nhassl3.pythonanywhere.com/blum/signup/', data)
	}
}

export default new BlumDataService()
