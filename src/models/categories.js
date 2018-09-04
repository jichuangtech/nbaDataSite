import { queryRule, removeRule, addRule, queryGoodsCategories } from '../services/api';

const defaultOption = {
  value: '-1',
  title: '全部分类',
};

export default {
  namespace: 'categories',

  state: {
    list: [],
    loading: true,
    goodsCategoryOptions: [],
  },

  effects: {
    *queryCategories({ payload }, { call, put }) {
      const response = yield call(queryGoodsCategories);
      // alert(' queryGoodsCategories response: ' + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *queryCategoriesOption({ payload }, { call, put }) {
      const response = yield call(queryGoodsCategories);
      const categories = response.data;
      const options = [];
      for (let index = 0; index < categories.length; index++) {
        const option = {
          title: categories[index].name,
          value: `${categories[index].id}`,
        };

        options[index] = option;
      }

      if (payload.isShowAllItem) {
        options.unshift(defaultOption);
      }

      yield put({
        type: 'saveCategoriesOption',
        payload: {
          options: options,
        },
      });
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
    saveCategoriesOption(state, { payload: { options } }) {
      return {
        ...state,
        goodsCategoryOptions: options,
      };
    },
  },
};
