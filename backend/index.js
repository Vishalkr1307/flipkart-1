const express = require("express");
const app = express();
const session=require("express-session")
const responseTimer = require("response-time");
const userSchema=require("./model/user")
const otpSchema=require("./model/otp")
const User = require("./routes/user");
const Product=require("./routes/product")
require("dotenv").config()
const {get_async_connection,set_async_connection}=require("./utils/reeds")

app.use(session({secret:process.env.PRIVATE_KEY,cookie:{maxAge:700000},saveUninitialized:true,resave:true}))
app.use(express.json());
app.use(responseTimer());


userSchema.hasMany(otpSchema,{foreignKey: "userId",onDelete:"CASCADE",onUpdate:"CASCADE"  });
otpSchema.belongsTo(userSchema,{foreignKey: "userId",onDelete:"CASCADE",onUpdate:"CASCADE"   });

app.use("/auth", User);
app.use("/product",Product)



module.exports = app;
