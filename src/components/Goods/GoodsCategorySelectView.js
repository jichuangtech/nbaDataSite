import React, { Component } from 'react';
import { connect } from 'dva';
import SelectView from './SelectView';
import style from './index.less';


@connect(({ categories }) => ({
  categories,
}))
class GoodsCategorySelectView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'categories/queryCategoriesOption',
      payload: {
        isShowAllItem: this.props.isShowAllItem,
      },
    });
  }

  onOptionChange(value) {
    if (this.props.optionChange !== undefined) {
      this.props.optionChange(value);
    }
  }

  updateCategoryOptions(json) {
    const categories = json.data;
    const options = [];
    for (let index = 0; index < categories.length; index++) {
      const option = {
        title: categories[index].name,
        value: `${categories[index].id}`,
      };

      options[index] = option;
    }

    if (this.props.isShowAllItem) {
      options.unshift(defaultOption);
    }

    this.setState({
      goodsCategoryOptions: options,
      isQueryInfoComplete: true,
    });

    const defId = options.length > 0 ? options[0].value : -1;
    if (this.props.onInfoQueryComplete) {
      this.props.onInfoQueryComplete(defId);
    }
  }

  render() {
    return (
      <SelectView
        className={style.topNavItem}
        options={this.props.categories.goodsCategoryOptions}
        optionChange={(value) => { this.onOptionChange(value); }}
      />
    );
  }

  componentWillReceiveProps(nextProps) {
  }
}

// GoodsCategorySelectView.propTypes = {
//   optionChange: React.PropTypes.func,
//   isShowAllItem: React.PropTypes.bool,
//   onInfoQueryComplete: React.PropTypes.func,
// };
//
// GoodsCategorySelectView.defaultProps = {
//   isShowAllItem: true,
// };

export default GoodsCategorySelectView;
