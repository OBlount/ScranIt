import axios from 'axios';

export default () => {
	return axios.create({
		baseURL: `http://${process.env.VUE_APP_ADD || 'localhost'}:${process.env
			.VUE_APP_PORT || 8081}/`,
	});
};
