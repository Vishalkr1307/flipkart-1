const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const User = require("./user");

const Product = db.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

const Rating = db.define("Rating", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false
    }
});

const Comment = db.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Relationships
Product.hasMany(Rating, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Rating.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Product.hasMany(Comment, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Rating.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
User.hasMany(Rating, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Product, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE"});
Product.belongsTo(User, { foreignKey: "userId", onDelete:"CASCADE", onUpdate:"CASCADE" });

module.exports = { Product, Rating, Comment };
