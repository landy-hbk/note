export  const apiUrl = getApiUrl();

/*function Trim(str)
 { 
  return str.replace(/(^\s*)|(\s*$)/g, ""); 
}*/

function getApiUrl() {
	let ENV = process.env.__ENV;

	ENV = String(ENV).replace(/(^\s*)|(\s*$)/g, "")

	switch (ENV) {
		case 'dev':
			return 'http://hjshopapi.gz.hui-jia.com.cn/'
			//return 'http://192.168.11.117:8080/'
			break;

		case 'test': 
			return  'http://hjshoptest.gz.hui-jia.com.cn/'
			break;
	}
};
