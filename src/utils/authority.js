// use localStorage to store the authority info, which might be sent from server in actual project.

/**
 * 当访问主页的时候，会进行本地授权的查找，
 * @returns {string}
 */
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'guest';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
