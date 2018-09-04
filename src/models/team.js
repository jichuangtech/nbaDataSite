import { queryRule, removeRule, addRule, queryNBATeam } from '../services/api';

const defaultOption = {
  value: '-1',
  title: '全部分类',
};

export default {
  namespace: 'team',

  state: {
    list: [],
    loading: true,
  },

  effects: {
    *queryTeam({ payload }, { call, put }) {
      const response = yield call(queryNBATeam);
      // alert(" nba 数据: " + JSON.stringify(response));
      yield put({
        type: 'save',
        payload: response.data,
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

  },
};
