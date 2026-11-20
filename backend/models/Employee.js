
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.com$/i,
                "Please enter a valid .com email address"
            ]
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        position: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        salary: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);


module.exports =
  mongoose.models.Employee ||
  mongoose.model("Employee", employeeSchema);
;
