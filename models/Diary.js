'use strict';
const mongoose = require( 'mongoose' );

var diarySchema = mongoose.Schema( {
  title: String,
  content: String
} );

module.exports = mongoose.model( 'Diary', diarySchema );
