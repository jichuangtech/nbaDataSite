import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable/goods';
import styles from '../List/TableList.less';
import GoodsCategorySelectView from '../../components/Goods/GoodsCategorySelectView';

@connect(({ goods }) => ({
  goods,
}))
class QueryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    //查询所有
    this.queryGoodsById(-1);
  }
  handleSelectRows() {

  }
  handleStandardTableChange() {

  }
  handleDelClick(goodsId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/delGoods',
      payload: {
        goodsId: goodsId,
      },
    });
  }

  queryGoodsById(categoryId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/queryGoodsByCategoryId',
      payload: {
        categoryId : categoryId,
      },
    });
  }

  onGoodsCategoryOptionChange(categoryId) {
    this.queryGoodsById(categoryId);
  }

  render() {
    const { goods: { list, loading } } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderLayout title="查询商品">
        <Card bordered={false}>
          <div>
            <GoodsCategorySelectView
              isShowAllItem={true}
              className="topNavItem"
              optionChange={ (categoryId) => { this.onGoodsCategoryOptionChange(categoryId) }}
            />
          </div>

          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={list}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onDelClick={(id) => {this.handleDelClick(id)}}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}


export default QueryView;
