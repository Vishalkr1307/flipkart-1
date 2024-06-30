const {Sequelize,DataTypes}=require("sequelize")
const db=require("../configs/db")
const bcrypt=require("bcrypt")

const Otp=db.define("Otp",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false,
        set(val){

            this.setDataValue("otp",bcrypt.hashSync(val,10))

        }
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW

    },
    expiredAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

})

module.exports=Otp