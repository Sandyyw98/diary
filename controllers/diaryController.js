'use strict';
const Diary = require( '../models/Diary' );
console.log("loading the diary Controller")


// this displays all of the skills
exports.getAllDiary = ( req, res ) => {
  console.log('in getAllDiary')
  Diary.find( {} )
    .exec()
    .then( ( diary ) => {
      res.render( 'newdiary', {
        diary: diary
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'content promise complete' );
    } );
};




exports.saveDiary = ( req, res ) => {
  console.log("in save diary!")//after user save the diary
  console.dir(req)
  let newDiary = new Diary( {
    title: req.body.title,
    content: req.body.content
  } )

  console.log("diary = "+newDiary)

  newDiary.save()
    .then( () => {
      res.redirect( '/newdiary' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

/**exports.deleteContent = (req, res) => {
  console.log("in deleteContent")
  let contentName = req.body.deleteContent
  if (typeof(skillContent)=='string') {
      Content.deleteOne({name:contentName})
           .exec()
           .then(()=>{res.redirect('/contents')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(contentName)=='object'){
      Skill.deleteMany({name:{$in:contentName}})
           .exec()
           .then(()=>{res.redirect('/contents')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(contentName)=='undefined'){
      console.log("This is if they didn't select a skill")
      res.redirect('/contents')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown contentName: ${contentName}`)
  }

};*/
