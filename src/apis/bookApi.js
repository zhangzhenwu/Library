import axios from "axios";

const HOST = "http://192.168.1.7:8080";

export function addBook(key, forceUpdate, code, bookPos) {
  return axios.post(
    `${HOST}/cgi-bin/youbei/add.py`,
    {
      pass_key: key,
      force_update: forceUpdate,
      book_code: code,
      book_positon_id: bookPos
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
}

export function queryPosition() {
  return axios.post(`${HOST}/cgi-bin/youbei/query_position.py`);
}

export function queryBook(code, name) {
  return axios.post(
    `${HOST}/cgi-bin/youbei/query.py`,
    {
      book_code: code,
      book_name: name
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
}

export function delBook(key, code) {
  return axios.post(
    `${HOST}/cgi-bin/youbei/del.py`,
    {
      pass_key: key,
      book_code: code
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
}
