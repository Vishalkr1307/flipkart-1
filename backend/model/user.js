const {Sequelize,DataTypes}=require("sequelize")
const db = require("../configs/db")
const bcrypt=require("bcrypt")

const User=db.define("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(val){

            this.setDataValue("password",bcrypt.hashSync(val,8))

        }
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:"user",
        validate:{
            isIn:[["user","admin"]]
        }

    },
    isVerifya:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isPremium:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
})

module.exports=User