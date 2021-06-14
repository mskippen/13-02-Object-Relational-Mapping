const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
// const Product = require("./Product.js");
// const ProductTag = require("./ProductTag.js");

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

// Tag.Product = Tag.hasMany(Product);
// Product.Tag = Product.belongsTo(Tag);

// Tag.ProductTag = Tag.hasMany(ProductTag);
// ProductTag.Tag = ProductTag.belongsTo(Tag);

module.exports = Tag;