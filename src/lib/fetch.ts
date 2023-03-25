import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const SERVER_URL = process.env.SERVER_URL;

export const GetDefaultHeader = () => {
  const csrfToken = Cookies.get("csrftoken");
  console.log(csrfToken, Cookies);
  return {
    mode: "cors",
    credential: "include",
    headers: {
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/json",
    },
  };
};

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const toISOString = (s: string) => {
  var months: any = {
    jan: "01",
    feb: "02",
    mar: "03",
    apr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    aug: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dec: "12",
  };
  var b = s.split(" ");

  return (
    b[3] +
    "-" +
    months[b[1].toLowerCase()] +
    "-" +
    ("0" + b[2]).slice(-2) +
    "T" +
    b[4] +
    b[5].substr(3)
  );
};

export async function getAllHakidamesData() {
  const res = await axios.get(`${SERVER_URL}hakidame/`, GetDefaultHeader());
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidamesTodoData() {
  const res = await axios.get(
    `${SERVER_URL}hakidame/todo/`,
    GetDefaultHeader()
  );
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidamesBookmarkData() {
  const res = await axios.get(
    `${SERVER_URL}hakidame/bookmark/`,
    GetDefaultHeader()
  );
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidameIds() {
  const res = await axios.get(`${SERVER_URL}hakidame/`, GetDefaultHeader());
  const hakidames: any[] = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames.map((h) => {
    return {
      params: {
        id: String(h.id),
      },
    };
  });
}

export async function getHakidameData(id: number) {
  const res = await axios.get(
    `${SERVER_URL}hakidame/${id}`,
    GetDefaultHeader()
  );
  const hakidame = await JSON.parse(JSON.stringify(res, getCircularReplacer()));
  return hakidame;
}

export async function postHakidameData(params: {
  title: string;
  detail: string;
  todo: boolean;
  done: boolean;
  bookmark: boolean;
}) {
  const { title, detail, todo, done, bookmark } = params;
  const body = {
    title,
    detail,
    todo,
    done,
    bookmark,
    pub_date: toISOString(String(new Date())),
  };

  const res = await axios.post(
    `${SERVER_URL}hakidame/`,
    body,
    GetDefaultHeader()
  );
  const hakidame = await JSON.parse(JSON.stringify(res, getCircularReplacer()));
  return hakidame;
}
export async function updateHakidameData(params: {
  id: number;
  title: string;
  detail: string;
  todo: boolean;
  done: boolean;
  bookmark: boolean;
}) {
  const { id, title, detail, todo, done, bookmark } = params;
  const body = {
    title,
    detail,
    todo,
    done,
    bookmark,
    pub_date: toISOString(String(new Date())),
  };

  await axios.put(`${SERVER_URL}hakidame/${id}/`, body, GetDefaultHeader());
}
export async function deleteHakidameData(params: { id: number }) {
  const { id } = params;

  await axios.delete(`${SERVER_URL}hakidame/${id}/`, GetDefaultHeader());
}
