import Dexie from 'dexie';

const db = new Dexie('database');
db.version(1).stores({
  data: 'name,data',
  abi: 'name,abi',
});

export const tblAbi = db.table('abi');
export const tblData = db.table('data');

export const controllers = {
  save(name, data) {
    return tblData.put({ name, data });
  },

  async get(name) {
    let obj = await tblData.get(name);
    if (!obj) return null;
    return obj.data;
  },

  remove(name) {
    return tblData.delete(name);
  },

  list() {
    return tblData.toArray();
  },
  clear() {
    return tblAbi.clear();
  }
};

export default controllers;
