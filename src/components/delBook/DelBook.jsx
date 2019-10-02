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
    console.log(res);
    if (res.data && res.data.code == 0) {
      Toast.success("Del success !!!", 1);
      this.inputRef.focus();
      // this.setState({
      //   key: "",
      //   code: ""
      // });
      return;
    }
    alert("删除失败");
  };
  render() {
    return (
      <div className="add-wrap-container">
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
          moneyKeyboardAlign="left"
          // value={this.state.code}
          onBlur={val => {
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
