import React from "react";
import { Picker, InputItem, Checkbox, List, Button, Toast } from "antd-mobile";
import { addBook, queryPosition } from "../../apis/bookApi.js";
import { createForm } from "rc-form";
import "./addBook.css";
const CheckboxItem = Checkbox.CheckboxItem;

class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      district: [],
      bookPos: "",
      key: "",
      forceUpdate: 0,
      code: ""
    };
  }
  async componentDidMount() {
    const prevKey = localStorage.getItem("book_key");
    if (prevKey) {
      this.setState({
        key: prevKey
      });
    }
    const resPos = await queryPosition();
    const bookList = resPos.data.positon;
    const districtList = bookList.map(pos => {
      return {
        value: pos.position_id,
        label: pos.position_name
      };
    });
    this.setState({
      district: districtList
    });
  }
  onChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
  onPickerChange = val => {
    this.setState({
      bookPos: val[0]
    });
  };
  addBook = () => {
    addBook(
      this.state.key,
      this.state.isChecked,
      this.state.code,
      this.state.bookPos
    ).then(res => {
      const codeDom = document.getElementById("addCode");
      codeDom.focus();
      if (res.data && res.data.code !== 0) {
        // Toast.fail(res.data.msg, 1);
        alert(res.data.msg);
        return;
      }
      // 更新local key 值
      localStorage.setItem("book_key", this.state.key);
      this.setState({
        code: ""
      });
      Toast.success("Add success !!!", 1);
    });
  };
  onkeydown = () => {
    if (window.event.keyCode === 13) {
      setTimeout(() => {
        this.addBook();
      }, 500);
    }
  };
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="add-wrap-container" onKeyDown={this.onkeydown}>
        <InputItem
          // type="number"
          placeholder="请输入key"
          clear
          moneyKeyboardAlign="left"
          value={this.state.key}
          onChange={val => {
            this.setState({
              key: val
            });
          }}
        >
          请输入key
        </InputItem>
        <List style={{ backgroundColor: "white" }} className="picker-list">
          <Picker
            data={this.state.district}
            cols={1}
            onOk={this.onPickerChange}
            {...getFieldProps("district3")}
            className="forss"
          >
            <List.Item arrow="horizontal">请选择书架</List.Item>
          </Picker>
        </List>
        <CheckboxItem ref="myCheckbox" onChange={() => this.onChange()}>
          强制更新
        </CheckboxItem>
        <InputItem
          // type="number"
          placeholder="请输入条码"
          clear
          moneyKeyboardAlign="left"
          id="addCode"
          value={this.state.code}
          ref={el => (this.inputRef = el)}
          onChange={val => {
            this.setState({
              code: val
            });
          }}
        >
          请输入条码
        </InputItem>
        <Button type="primary" onClick={this.addBook}>
          录入
        </Button>
      </div>
    );
  }
}

export default createForm()(AddBook);
