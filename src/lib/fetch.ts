import axios from "axios";

const SERVER_URL = process.env.SERVER_URL;

const getCircularReplacer = () => {
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

export async function getAllHakidamesData() {
  const res = await axios.get(`${SERVER_URL}hakidame/`);
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidamesTodoData() {
  const res = await axios.get(`${SERVER_URL}hakidame/todo/`);
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidamesBookmarkData() {
  const res = await axios.get(`${SERVER_URL}hakidame/bookmark/`);
  const hakidames = await JSON.parse(
    JSON.stringify(res, getCircularReplacer())
  );
  return hakidames;
}

export async function getAllHakidameIds() {
  const res = await axios.get(`${SERVER_URL}hakidame/`);
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
  const res = await axios.get(`${SERVER_URL}hakidame/${id}`);
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
    pub_date: "2023-12-12",
  };

  const res = await axios.post(`${SERVER_URL}hakidame/`, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
      "Access-Control-Allow-Headers":
        "Content-Type,Access-Control-Allow-Methods",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
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
    pub_date: "2023-12-12",
  };

  await axios.put(`${SERVER_URL}hakidame/${id}/`, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export async function deleteHakidameData(params: { id: number }) {
  const { id } = params;

  await axios.delete(`${SERVER_URL}hakidame/${id}/`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
