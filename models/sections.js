const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create staudent schema and model

const SectionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String
    },
    locale: {
        type: String,
        default: 'en'
    },
    // questions: [string],
    created_date:  Date,
    created_by: String,
    updated_date: Date,
    updated_by: String

}, {collection:'sections'});

// var QuestionlistSchema = new Schema({
//     _id:
// }, { _id: true });


module.exports = mongoose.model('sections', SectionSchema);
