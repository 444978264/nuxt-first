import { symbolMatch } from '../../utils/decorators';

export default instance => {
  return class Http {
    //   上传文件
    upload(url, data, { headers = {}, ...other } = {}) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      return instance.post(url, formData, {
        ...other,
        headers: Object.assign(headers, {
          'Content-Type': 'multipart/form-data'
        })
      });
    }

    @symbolMatch()
    get(url, params = {}, config = {}) {
      return instance.get(url, {
        params,
        ...config
      });
    }

    @symbolMatch()
    delete(url, params = {}, config = {}) {
      return instance.delete(url, {
        params,
        ...config
      });
    }

    @symbolMatch()
    post(url, data = {}, config = {}) {
      return instance.post(url, data, config);
    }

    @symbolMatch()
    put(url, data = {}, config = {}) {
      return instance.put(url, data, config);
    }
  };
};
