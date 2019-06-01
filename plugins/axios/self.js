import Url from 'url-parse';

export default function(config) {
  const { proxy = true, baseURL } = config;
  if (!proxy) {
    const urlParse = new Url(baseURL);
    config.baseURL = urlParse.origin;
  }
}
