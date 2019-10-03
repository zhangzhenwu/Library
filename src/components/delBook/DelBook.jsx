import React from "react";
import { InputItem, Button, Toast } from "antd-mobile";
import { delBook } from "../../apis/bookApi.js";
import "./delBook.css";
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      key: "",
      code: ""
    };
  }
  handleDelBook = async () => {
    const res = await delBook(this.state.key, this.state.code);
    if (res.data && res.data.code == 0) {
      Toast.success("Del success !!!", 1);
      const codeDom = document.getElementById("code");
      codeDom.focus();
      codeDom.select();
      return;
    }
    alert("删除失败");
  };
  onkeydown = () => {
    if (window.event.keyCode === 13) {
      this.handleDelBook();
    }
  };
  render() {
    return (
      <div className="add-wrap-container" onKeyDown={this.onkeydown}>
        <InputItem
          placeholder="请输入key"
          clear
          // value={this.state.key}
          moneyKeyboardAlign="left"
          onBlur={val => {
            this.setState({
              key: val
            });
          }}
        >
          输入key
        </InputItem>
        <InputItem
          ref={el => (this.inputRef = el)}
          placeholder="请输入code"
          clear
          id="code"
          moneyKeyboardAlign="left"
          value={this.state.code}
          onChange={val => {
            this.setState({
              code: val
            });
          }}
        >
          输入code
        </InputItem>
        <Button type="warning" onClick={this.handleDelBook}>
          删除
        </Button>
      </div>
    );
  }
}
