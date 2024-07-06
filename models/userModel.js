const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { userRolesEnum } = require('../constants');

const userSchema = new Schema(
    {
        employeeID: {
            type: String,
            required: [true, 'Employee ID is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(userRolesEnum),
            default: userRolesEnum.JUNIOR,
        },

        accessToken: String,
        refreshToken: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.post('save', handleMongooseError);

const UserModel = model('User', userSchema);

module.exports = { UserModel };
