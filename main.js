import "./style.css";
import { openDB } from "idb";

async function main() {
  let db = await openDB("chatlands", 1, {
    upgrade(db) {
      let store = db.createObjectStore("messages", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("roomId", "roomId", { unique: false });

      store.add({ roomId: 1, message: "Hello room 1" });
      store.add({ roomId: 2, message: "Test message 2, room 2" });
      store.add({ roomId: 1, message: "Test message 3, room 1" });
    },
  });

  let trx = db.transaction("messages");
  const messages = await trx.store.index("roomId").getAll(1);
  trx.commit();

  console.log("list of all messages for roomId = 1");
  console.log(messages);
}

main();