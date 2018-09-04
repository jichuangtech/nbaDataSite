import React, { Component } from 'react';
import { Select, message } from 'antd';
const Option = Select.Option;

/**
 *  this.props.options = [
 *      {
 *          "value": "xxx1",
 *          "title": "xxx1",
 *      },
 *      {
 *          "value": "xxx2",
 *          "title": "xxx2",
 *      }
 *  ]
 *
 */
class SelectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValue: '',
      optionViews: [],
    };
  }

  render() {
    console.log(` render SelectView optionValue: ${this.state.optionValue}`);
    return (
      <div className={this.props.className}>
        <Select
          value={this.state.optionValue}
          style={{ width: 120 }}
          onChange={this.onOptionChange.bind(this)}
        >
          {this.state.optionViews}
        </Select>
      </div>
    );
  }

  onOptionChange(value) {
    // //回调外层的组件
    if (this.props.optionChange !== undefined) {
      this.props.optionChange(value);
    }

    console.log(`SelectView value: ${value}, view.size: ${this.state.optionViews.length}`);
    this.setState({
      optionValue: value,
    });
  }

  componentWillUpdate() {
    console.log('SelectView componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('SelectView componentDidUpdate');
  }

  componentWillMount() {
    console.log('SelectView componentWillMount');
    this.setState({
      optionValue: this.getOptiontValue(this.props),
      optionViews: this.getOptionViews(this.props),
    });
  }

  getOptiontValue(props) {
    const value = (props.options === undefined || props.options.length === 0) ? '加载中...' : props.options[0].value;
    return value;
  }

  getOptionViews(props) {
    const options = props.options;
    const optionViews = [];

    if(options !== undefined) {
      for (let index = 0; index < options.length; index++) {
        const view = (
          <Option
            key={options[index].value}
            value={options[index].value}
          >
            {options[index].title}
          </Option>
        );
        optionViews[index] = view;
      }
    }

    return optionViews;
  }

  componentWillReceiveProps(nextProps) {
    console.log(' SelectView componentWillReceiveProps');

    this.setState({
      optionViews: this.getOptionViews(nextProps),
      optionValue: this.getOptiontValue(nextProps),
    });
  }
}
//
// SelectView.propTypes = {
//   options: React.PropTypes.array.isRequired,
//   optionChange: React.PropTypes.func,
// };
// SelectView.defaultProps = {
//   options: [],
// };

export default SelectView;

/*
 使用React.Component创建组件，需要通过在constructor中调用super()将props传递给React.Component。
 另外react 0.13之后props必须是不可变的。
 由于是用ES6 class语法创建组件，其内部只允许定义方法，而不能定义属性，
 class的属性只能定义在class之外。所以propTypes要写在组件外部。
 对于之前的getDefaultProps方法，由于props不可变，
 所以现在被定义为一个属性，和propTypes一样，要定义在class外部。
 */
