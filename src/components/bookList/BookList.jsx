import React from "react";
import { InputItem, Button, List, Toast } from "antd-mobile";
import { queryBook } from "../../apis/bookApi.js";
import "./bookList.css";
const Item = List.Item;
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      code: "",
      bookList: []
    };
  }
  queryBook = async () => {
    const bookRes = await queryBook(this.state.code, this.state.bookName);
    const resBookList = bookRes.data.data;
    if (!resBookList) {
      Toast.success("暂无数据", 1);
      return;
    }
    let prevBookList = this.state.bookList || [];
    prevBookList = resBookList.concat(prevBookList);
    if (prevBookList.length > 50) {
      prevBookList.splice(49, prevBookList.length - 50);
    }
    this.setState(
      {
        bookList: prevBookList
      },
      () => {
        const codeDom = document.getElementById("code");
        codeDom.focus();
        codeDom.select();
        console.log(this.state.bookList);
      }
    );
  };
  onkeydown = () => {
    if (window.event.keyCode === 13) {
      this.queryBook();
    }
  };
  render() {
    const bookList = this.state.bookList;
    return (
      <div className="add-wrap-container" onKeyDown={this.onkeydown}>
        <InputItem
          id="code"
          placeholder="请输入code"
          clear
          ref={el => (this.inputRef = el)}
          value={this.state.code}
          moneyKeyboardAlign="left"
          onChange={val => {
            this.setState({
              code: val
            });
          }}
        >
          输入code
        </InputItem>
        <InputItem
          placeholder="请输入书名"
          clear
          moneyKeyboardAlign="left"
          value={this.state.bookName}
          onChange={val => {
            this.setState({
              bookName: val
            });
          }}
        >
          输入书名
        </InputItem>
        <Button type="primary" onClick={this.queryBook}>
          查询
        </Button>
        <List className="my-list">
          {bookList.map(book => {
            return (
              <Item
                arrow="horizontal"
                // thumb={book.photo}
                multipleLine
                onClick={() => {}}
                key={book.book_code}
              >
                <div className="listcontainer">
                  <div className="img">
                    <img src={book.photo}></img>
                  </div>
                  <div className="listtext">
                    <span>{book.book_name}</span>
                    <span>{book.position_name}</span>
                    <span>{book.book_code}</span>
                    <span>{book.book_status}</span>
                  </div>
                </div>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}
