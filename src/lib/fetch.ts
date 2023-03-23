import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000/";

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
}) {
  const { title, detail, todo, done } = params;
  const body = {
    title,
    detail,
    todo,
    done,
    pub_date: "2023-12-12",
  };

  const res = await axios.post(`${SERVER_URL}hakidame/`, body);
  const hakidame = await JSON.parse(JSON.stringify(res, getCircularReplacer()));
  return hakidame;
}
