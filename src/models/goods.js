import { queryGoods, queryColor, addGoods, delGoods, queryGoodsByCategoryId } from '../services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'goods',

  state: {
    list: [],
    loading: true,
    colors: [],
    submitting: false,
  },

  effects: {
    *queryGoods({ payload }, { call, put }) {
      const response = yield call(queryGoods);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *queryGoodsByCategoryId({ payload }, { call, put }) {
      let response;
      if (payload.categoryId === -1) {
        response = yield call(queryGoods);
      } else {
        response = yield call(queryGoodsByCategoryId, payload.categoryId);
      }

      yield put({
        type: 'save',
        payload: response.data,
      });
    },

    *queryColor({ payload }, { call, put }) {
      const response = yield call(queryColor, payload);
      yield put({
        type: 'saveColor',
        payload: response,
      });
    },

    *addGoods({ payload }, { call, put }) {
      const response = yield call(addGoods, payload);
      if (response.statusCode === 200) {
        message.success('商品添加成功.');
        yield put(routerRedux.push('/list/goods-query'));
      } else {
        message.error(`商品添加失败: ${response.statusCode}`);
      }
    },
    *delGoods({ payload }, { call, put }) {
      const params = [];
      params.goodsId = payload.goodsId;
      const response = yield call(delGoods, params);
      if (response.statusCode === 200) {
        message.success('商品删除成功');
        yield put({ type: 'queryGoods' });
      } else {
        message.error(`商品删除失败: ${response.statusCode}`);
        yield put(routerRedux.push('/result/fail'));
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    },

    saveColor(state, action) {
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    },
    addGoods(state, action) {
      return {
        submitting: action.payload.submitting,
      };
    },
  },
};
