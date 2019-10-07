import axios from "axios";

const HOST = "http://192.168.1.7:8080";

export function addBook(key, forceUpdate, code, bookPos) {
  return axios.post(
    `${HOST}/cgi-bin/add.py`,
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
  return axios.post(`${HOST}/cgi-bin/query_position.py`);
}

export function queryBook(code) {
  return axios.post(
    `${HOST}/cgi-bin/query.py`,
    {
      book_code: code
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
}

export function delBook(key, code) {
  return axios.post(
    `${HOST}/cgi-bin/del.py`,
    {
      pass_key: key,
      book_code: code
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
}

export function getMsg() {
  return axios.get(`${HOST}/cgi-bin/summary.py`);
}
