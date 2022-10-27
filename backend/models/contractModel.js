const mongoose = require('mongoose')
const userSchema = require('./userModel')

const contractSchema = mongoose.Schema({
    users: {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
    }},
    details: {
        sentAt: {
            type: Date
        },
        service: {
            type: String,
            required: [true, 'Please select a service'],
            enum: ['Nutrition Coaching', 'Mental Performance Coaching', 'Life Performance Coaching']
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    return (
                        v && // check that there is a date object
                        v.getTime() > Date.now() + 24 * 60 * 60 * 1000
                        )
                    },
                message: 'A start date must be at least 1 day from now'
            }
        },
        length: {
            type: Number,
            required: true
        },
        completionDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    return (
                        v && // check that there is a date object
                        v.getTime() > Date.now() + 24 * 60 * 60 * 1000 &&
                        v.getTime() > Date.now() + 365 * 24 * 60 * 60 * 1000
                        )
                    },
                message: 'A completion date must be at least 30 days from now and not more than 1 year'
            }
        },
        paymentInterval: {
            type: String,
            required: true,
            enum: ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Bi-Yearly','Yearly']
        },
        paymentAmount: {
            type: Number,
            required: true
        }
    },
    status: {
            type: String,
            enum: ['pending', 'approved', 'denied']
    },
},{
    timestamps: true,
})

module.exports = mongoose.model('Contract', contractSchema)