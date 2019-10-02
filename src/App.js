import React from "react";
import { Tabs, WhiteSpace, Badge } from "antd-mobile";
import AddBook from "../src/components/addBook/AddBook";
import DelBook from "../src/components/delBook/DelBook";
import BookList from "../src/components/bookList/BookList";
function App() {
  const tabs = [
    { title: <Badge>图书查询</Badge> },
    { title: <Badge>图书添加</Badge> },
    { title: <Badge>图书删除</Badge> }
  ];
  return (
    <div>
      <Tabs
        tabs={tabs}
        initialPage={0}
        swipeable={false}
        onChange={(tab, index) => {
          console.log("onChange", index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log("onTabClick", index, tab);
        }}
      >
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#fff"
          }}
        >
          <BookList></BookList>
        </div>
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "red"
          }}
        >
          <AddBook></AddBook>
        </div>
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#fff"
          }}
        >
          <DelBook></DelBook>
        </div>
      </Tabs>
      <WhiteSpace />
    </div>
  );
}

export default App;
