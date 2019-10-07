import React from "react";
import { getMsg } from "../../apis/bookApi.js";
export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }
  componentDidMount() {
    const _this = this;
    getMsg().then(res => {
      const htStr = res.data; //.replace("\n", "<br/>");
      console.log(res.data);
      _this.setState({
        text: htStr
      });
    });
  }
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.state.text }}></div>;
  }
}
