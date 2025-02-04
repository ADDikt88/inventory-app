const pool = require("./pool");

async function getAllMessages() {
  console.log("retrieving messages...");
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertNewMessage(username, message) {
  await pool.query(
    "INSERT INTO messages (username, message, time_added) VALUES ($1, $2, NOW())",
    [username, message]
  );
}

async function deleteMessage(selectedID) {
  await pool.query("DELETE FROM messages WHERE id = $1", [selectedID]);
}

async function getMessage(selectedID) {
  console.log("retrieving message", selectedID);
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    selectedID,
  ]);
  return rows;
}

async function updateMessage(selectedID, userName, messageText) {
  console.log("updating message for: ", selectedID);
  await pool.query(
    "UPDATE messages SET username = $1, message = $2, time_added = NOw() WHERE id = $3 RETURNING *",
    [userName, messageText, selectedID]
  );
}

module.exports = {
  getAllMessages,
  insertNewMessage,
  deleteMessage,
  getMessage,
  updateMessage,
};
