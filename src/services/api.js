import { stringify } from 'qs';
import request from '../utils/request';
import * as Urls from '../utils/Urls';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function loginCMS(username, password) {
  const url = `${Urls.LOGIN_URL}?username=${username}&password=${password}`;
  // alert(` loginCMS params: ${url}`);
  return request(url);
}

export async function queryNBATeam() {
  const url = `${Urls.NAB_TEAM}`;
  return request(url);
}

export async function queryGoodsCategories() {
  const url = `${Urls.GOODS_CATEGORIES_URL}`;
  return request(url);
}

export async function queryGoods() {
  const url = `${Urls.GOODS_URL}`;
  return request(url);
}

export async function queryGoodsByCategoryId(categoryId) {
  const url = `${Urls.GOODS_CATEGORIES_URL}/${categoryId}/goods`;
  return request(url);
}

export async function addGoods(params) {
  const url = `${Urls.GOODS_URL}`;
  return request(url, {
    method: 'POST',
    body: params,
  });
}

export async function delGoods(params) {
  const url = `${Urls.GOODS_URL}`;
  return request(url, {
    method: 'DELETE',
    params: params,
  });
}

export async function queryColor() {
  const url = `${Urls.COLOR_URL}`;
  return request(url);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
