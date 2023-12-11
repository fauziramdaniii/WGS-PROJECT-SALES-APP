import axios from 'axios'

const apiService = {
  byGetData: async (uri, params) => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}${uri}`, {
        params: params
      })
      return response
    } catch (error) {
      return error.response ? error.response : error
    }
  },

  byPostData: async (uri, body) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}${uri}`,
        body
      )
      return response
    } catch (error) {
      return error
    }
  },
  byPutData: async (uri, body) => {
    try {
      let response = await axios.put(
        `${import.meta.env.VITE_API_URL}${uri}`,
        body
      )

      return response
    } catch (error) {
      return error
    }
  },
  byDeleteData: async (uri, params) => {
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_API_URL}${uri}`,
        {
          params: params
        }
      )

      return response
    } catch (error) {
      return error
    }
  },
  byDownloadData: async (uri, params, filename, type) => {
    try {
      let response = await axios({
        url: `${import.meta.env.VITE_API_URL}${uri}`,
        method: 'GET',
        params: params,
        responseType: 'blob'
      })
      let fileURL = window.URL.createObjectURL(new Blob([response.data]))
      let fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute(
        'download',
        `${filename}.${type === 'pdf' ? 'pdf' : 'xlsx'}`
      )
      document.body.appendChild(fileLink)
      fileLink.click()
    } catch (error) {
      return error
    }
  },
  byUploadData: async (uri, file, onUploadProgress) => {
    try {
      let formData = new FormData()
      formData.append('file', file)

      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}${uri}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress
        }
      )

      return response
    } catch (error) {
      return error
    }
  }
}

export default apiService
