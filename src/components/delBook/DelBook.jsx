import React from "react";
import { InputItem, Button, Toast } from "antd-mobile";
import { delBook } from "../../apis/bookApi.js";
import "./delBook.css";
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      delKey: "",
      code: ""
    };
  }
  componentDidMount() {
    const prevKey = localStorage.getItem("book_key");
    if (prevKey) {
      this.setState({
        delKey: prevKey
      });
    }
  }
  handleDelBook = async () => {
    const res = await delBook(this.state.delKey, this.state.code);
    if (res.data && res.data.code == 0) {
      Toast.success("Del success !!!", 1);
      const codeDom = document.getElementById("code");
      codeDom.focus();
      codeDom.select();
      this.setState({
        code: ""
      });
      return;
    }
    alert(res.data.msg);
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
          value={this.state.delKey}
          moneyKeyboardAlign="left"
          onChange={val => {
            this.setState({
              delKey: val
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
