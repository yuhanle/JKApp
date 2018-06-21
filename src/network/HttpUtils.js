import axios from 'axios'

let defaultData = {
  uid: '',
  token: '',
  timestamp: ''
}

export function setToken(data) {
  defaultData = {
    ...defaultData,
    ...data
  }
}

let baseUrl = 'https://easy-mock.com/mock/5b1a4dbf5475595e0014c3b3/1.0'
let baseJKUrl = 'https://app.jike.ruguoapp.com/1.0'

axios.defaults.timeout = 20000

export default class HttpUtils {

  static get(url, data = {}) {
    url = baseUrl + url
    data = {
      ...defaultData,
      ...data
    }
    return axios.get(url, {params: data}).then(response => {
      console.log(response)
      return response.data
    })
  }

  static getJK(url, data = {}) {
    url = baseJKUrl + url
    data = {
      ...defaultData,
      ...data
    }
    return axios.get(url, {params: data}).then(response => {
      console.log(response)
      return response.data
    })
  }

  static post(url, data) {
    url = baseUrl + url

    data = {
      ...defaultData,
      ...data
    }
    return axios.post(url, data)
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(error => console.dir(error))
  }

  static postJK(url, data) {
    url = baseJKUrl + url

    data = {
      ...defaultData,
      ...data
    }
    return axios.post(url, data)
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(error => console.dir(error))
  }
}
