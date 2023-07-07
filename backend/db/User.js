const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        console.log(this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }

    next();
})
module.exports = mongoose.model("users", userSchema);