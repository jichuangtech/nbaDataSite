import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Checkbox, Form, Input, DatePicker, message, Upload, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;


@connect(({ loading, goods }) => ({
  submitting: loading.effects['goods/addGoods'],
  goods,
}))
@Form.create()
export default class GoodsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCodeCheck: false,
      isKgCheck: false,
      colorCheckedList: [],
      colorIndeterminate: false,
      colorCheckAll: false,
      colorOptions: [],
      codePrice: 0,
      kgPrice: 0,
      image: [],
    };
    // 成员变量的定义
    this.colorData = {
      options: [],
      ids: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/queryColor',
      // type: 'rule/fetch',
    });
  }

  componentWillUpdate(prevProps, prevState) {
    this.colorData = this.getColorData(prevProps.goods.colors);
  }


  onColorCheckAllChange(e) {
    this.setState({
      colorCheckedList: e.target.checked ? this.colorData.ids : [],
      colorIndeterminate: false,
      colorCheckAll: e.target.checked,
    });
  }

  onColorCheckChange(colorCheckedList) {
    this.setState({
      colorCheckedList,
      colorIndeterminate: !!colorCheckedList.length
      && (colorCheckedList.length < this.colorData.options.length),
      colorCheckAll: colorCheckedList.length === this.colorData.options.length,
    });
  }

  onCodeChange(e) {
    this.setState({
      isCodeCheck: e.target.checked,
    });
  }

  onKgChange(e) {
    this.setState({
      isKgCheck: e.target.checked,
    });
  }

  getColorData(colors) {
    if (colors === null) {
      return;
    }
    const options = [];
    const ids = [];
    for (const key in colors) {
      const color = colors[key];
      const opt = {
        label: color.colorName,
        value: color.id,
      };
      ids.push(color.id);
      options.push(opt);
    }
    return {
      options,
      ids,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getFieldProps, getFieldValue } = this.props.form;
    // const value = this.refs.test.refs.input.value;
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.codePrice = 1;
      values.kgPrice = 2;
      // values.codePrice = this.state.codePrice;
      // values.kgPrice = this.state.kgPrice;
      if (!err ) {
        this.props.dispatch({
          type: 'goods/addGoods',
          payload: this.getGoodsVo(values),
        });
      }
    });
  }

  getGoodsVo(values) {
    const goodsVO = {};
    // let fieldsValue = form.getFieldsValue('isKgCheck');
    // console.log(fieldsValue);

    goodsVO.goodsName = values.goodsName;
    goodsVO.categoryId = 1;
    // goodsVO.categoryId = this.state.categoryId;
    goodsVO.goodsSn = values.goodsSn;
    goodsVO.storeCount = values.storeCount;
    goodsVO.goodsRemark = values.goodsRemark;
    goodsVO.goodsContent = values.goodsContent;
    goodsVO.isRecommend = values.isRecommend;
    goodsVO.isHot = values.isHot;
    goodsVO.image = this.state.image[0];

    if (this.state.isKgCheck) {
      goodsVO.kgPrice = values.kgPrice;
    }
    if (this.state.isCodeCheck) {
      goodsVO.codePrice = values.codePrice;
    }

    goodsVO.colorIds = this.state.colorCheckedList;

    // goodsVO.image = this.state.image[0];
    return goodsVO;
  }

  render() {
    const props = {
      beforeUpload: (file) => {
        let isImage = false;
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          isImage = true;
        }
        if (!isImage) {
          message.error('请上传JPG/PNG的图片!');
          return false;
        }
        this.setState(({ image }) => ({
          image: [file],
        }));
        return false;
      },
      fileList: this.state.image,
    };
    const { submitting, goods } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="添加商品" content="">
        <Card bordered={false}>
          <Form
            onSubmit={e => this.handleSubmit(e)}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="商品名称"
            >
              {getFieldDecorator('goodsName', {
                rules: [{
                  required: true, message: '请输入商品名称',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="商品编号"
            >
              {getFieldDecorator('goodsSn', {
                rules: [{
                  required: true, message: '请输入商品编号',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="库存"
            >
              {getFieldDecorator('storeCount', {
                rules: [{
                  required: true, message: '请输入¬商品库存',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="简单描述"
            >
              {getFieldDecorator('goodsRemark', {
                rules: [{
                  required: true, message: '请输入简单描述',
                }],
              })(
                <Input placeholder="" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="详细描述"
            >
              {getFieldDecorator('goodsContent', {
                rules: [{
                  required: true, message: '请输入详细描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入商品的主要用途" rows={4} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否热销"
              help=""
            >
              <div>
                {getFieldDecorator('isHot', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否推荐"
              help=""
            >
              <div>
                {getFieldDecorator('isRecommend', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="规格"
            >
              {getFieldDecorator('isCodeCheck')(
                <div>
                  <Checkbox
                    name="codeCheck"
                    onChange={event => this.onCodeChange(event)}
                  >码
                  </Checkbox>
                  <Input
                    ref="test"
                    defaultValue={1}
                    placeholder="价格/码"
                    disabled={!this.state.isCodeCheck}
                  />
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="规格"
            >
              {getFieldDecorator('isKgCheck')(
                <div>
                  <Checkbox
                    name="kgCheck"
                    onChange={event => this.onKgChange(event)}
                  >千克
                  </Checkbox>
                  <Input
                    ref="kgPrice"
                    defaultValue={12}
                    placeholder="价格/千克"
                    disabled={!this.state.isKgCheck}
                  />
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="颜色"
            >
              {getFieldDecorator('isCodeCheck')(
                <div>
                  <CheckboxGroup
                    options={this.colorData.options}
                    value={this.state.colorCheckedList}
                    onChange={colorCheckedList => this.onColorCheckChange(colorCheckedList)}
                  />
                  |
                  <Checkbox
                    indeterminate={this.state.colorIndeterminate}
                    onChange={event => this.onColorCheckAllChange(event)}
                    checked={this.state.colorCheckAll}
                  >
                      全选
                  </Checkbox>
                </div>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="商品图片"
              hasFeedback
            >
              {getFieldDecorator('image')(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 选择图片
                  </Button>
                </Upload>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8, display:'none' }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
