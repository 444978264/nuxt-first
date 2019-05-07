import { mixins } from '../../utils/decorators';
import apis from '../../api';
import Http from './http';

export default (instance, inject) => {
  // 请求生成器
  const requestGenerator = Http(instance);

  @mixins(...apis)
  class Request extends requestGenerator {}

  const Ajax = new Request();

  inject && inject('http', Ajax);

  return Ajax;
};
