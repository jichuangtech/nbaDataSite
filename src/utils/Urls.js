const PRE_FIX = 'https://www.jichuangtech.site/clothshopserver';
const NBA_PRE_FIX = 'https://www.jichuangtech.site/nbadataserver';
// const PRE_FIX = 'http://localhost:8070';
const ROUTER_PREFIX = '';
// const ROUTER_PREFIX = "/clothShopCMS";

const COLOR_URL = PRE_FIX + '/api/info/color';
const GOODS_URL = PRE_FIX + '/api/goods';
const INFO_GOODS_URL = PRE_FIX + '/api/info/goods';
const GOODS_CATEGORIES_URL = PRE_FIX + '/api/goodsCategories';
const INFO_GOODS_CATEGORIES_URL = PRE_FIX + '/api/info/goodsCategories';
const LOGIN_URL = PRE_FIX + '/login';
const ORDERS_URL = PRE_FIX + '/api/order/'
const REGISTER_SUCCESS = 'register_success'
const REGISTER_FAIL = 'register_fail'
const REGISTER_ERROR = 'register_error'
const PIC = 'https://www.jichuangtech.site/clothshopserver/api/info/picture/'
const NAB_TEAM = NBA_PRE_FIX + '/api/team';

export {PRE_FIX, PIC,
  COLOR_URL,
  REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_ERROR, GOODS_URL, GOODS_CATEGORIES_URL, LOGIN_URL, ROUTER_PREFIX
  , INFO_GOODS_URL, INFO_GOODS_CATEGORIES_URL, NAB_TEAM
};
