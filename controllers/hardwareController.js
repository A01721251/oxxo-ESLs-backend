const db = require('../config/db_connection');

const updateHardware = (req, res) => {
  const { tienda_id } = req.params;
  db.all(
    "SELECT * FROM precio_actual WHERE tienda_id = ?",
    [tienda_id],
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error retrieving hardware", error: err.message });
      } else {
        res.status(200).json(rows);
      }
    }
  );
};

module.exports = {
  updateHardware,
};