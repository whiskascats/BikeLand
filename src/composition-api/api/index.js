import axios from 'axios';
import { useCookies } from "vue3-cookies";
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const { cookies } = useCookies()

const instance = axios.create({
    baseURL: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 此處的instance為我們create的實體
instance.interceptors.request.use(
  async function (config) {
    // console.log('config',config.url);
    // 不是更新token的api會檢查token是否存在
    const dataStore = useDataStore()
    if(config.url !== 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token') {
      if(!cookies.get('token')) {
        // console.log('token失效');
        const { token } = await dataStore.getToken();        
        cookies.set('token',token,'1d');
        // console.log('token --- 更新成功');
      } else {
        const { loading } = storeToRefs(dataStore)
        loading.value = true
        // console.log('token有效');
      }
    }
    config.headers['Authorization'] = `Bearer ${cookies.get('token')}`
    // console.log('確認token',cookies.get('token'));
    // Do something before request is sent
    // console.log('api請求');
    return config;
  },
  function (error) {
      // Do something with request error
      return Promise.reject(error);
  }
);

// 此處的instance為我們create的實體
instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      const dataStore = useDataStore()
      const { loading } = storeToRefs(dataStore)
      loading.value = false
      // console.log('api回傳');
      return response;
    },
    function (error) {
      if (error.response){
        switch (error.response.status) {
          case 404:
            console.log("你要找的頁面不存在")
            // go to 404 page
            break
          case 500:
            console.log("程式發生問題")
            // go to 500 page
            break
          default:
            console.log(error.message)
        }
      } 
      if (!window.navigator.onLine) {
        alert("網路出了點問題，請重新連線後重整網頁");
        return;
      }
      return Promise.reject(error);
    }
);

// 此處的instance為我們create的實體
export default function(method, url, data = null, config, tokenCheck) {
    method = method.toLowerCase();
    switch (method) {
      case "post":
        return instance.post(url, data, config, tokenCheck);
      case "get":
        return instance.get(url, { params: data }, tokenCheck);
      case "delete":
        return instance.delete(url, { params: data });
      case "put":
        return instance.put(url, data);
      case "patch":
        return instance.patch(url, data);
      default:
        console.log(`未知的 method: ${method}`);
        return false;
    }
};