import React from "react";
import { InputItem, Button, List, Toast } from "antd-mobile";
import { queryBook } from "../../apis/bookApi.js";
import "./bookList.css";
const Item = List.Item;
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      bookList: []
    };
  }
  deleteList = () => {
    this.setState({
      bookList: []
    });
  };
  queryBook = async () => {
    const bookRes = await queryBook(this.state.code);
    if (bookRes.data && bookRes.data.code !== 0) {
      alert(bookRes.data.msg);
      return;
    }
    const resBookList = bookRes.data.data;
    // if (!resBookList) {
    //   Toast.success("暂无数据", 1);
    //   return;
    // }
    let prevBookList = this.state.bookList || [];
    prevBookList = resBookList.concat(prevBookList);
    console.log(prevBookList);
    if (prevBookList.length > 50) {
      prevBookList.splice(50, prevBookList.length - 50);
    }
    this.setState(
      {
        bookList: prevBookList
      },
      () => {
        const codeDom = document.getElementById("code");
        codeDom.focus();
        this.setState({
          code: ""
        });
        console.log(this.state.bookList);
      }
    );
  };
  onkeydown = () => {
    if (window.event.keyCode === 13) {
      setTimeout(() => {
        this.queryBook();
      }, 500);
    }
  };
  render() {
    const bookList = this.state.bookList;
    return (
      <div className="add-wrap-container" onKeyDown={this.onkeydown}>
        <InputItem
          id="code"
          placeholder="请输入code或书名"
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
          code
        </InputItem>
        <Button type="primary" onClick={this.queryBook}>
          查询
        </Button>
        <Button
          type="primary"
          style={{ marginTop: "6px" }}
          onClick={this.deleteList}
        >
          清空列表
        </Button>
        <List className="my-list">
          {bookList.map(book => {
            return (
              <Item
                arrow="horizontal"
                // thumb={book.photo}
                multipleLine
                onClick={() => {}}
                key={Math.random()}
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
                    <span>{book.phtitle}</span>
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
