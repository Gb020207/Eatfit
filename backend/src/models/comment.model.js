
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const Comment = sequelize.define("Comment", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: "comments",
  timestamps: true
});

export default Comment;
