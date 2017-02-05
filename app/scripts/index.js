var $ = require('jquery');
var _ = require('underscore');
var moment = require('moment');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');


if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}

var source = $('#profile-template').html();
var template = Handlebars.compile(source);
console.log(template);

$.ajax('https://api.github.com/users/Greg-Robison').done(function(data){
  console.log(data);
  $('.left-side').append(template(data));

});


// var thumbnail = $('#avatar-template').html();
// var template = Handlebars.compile(thumbnail);
// $.ajax('https://api.github.com/users/Greg-Robison').done(function(data1){
//   console.log(data1);
//   $('#my-avatar').append(template(data1));
// });


var repo = $('#repo-template').html();
var template2 = Handlebars.compile(repo);
$.ajax('https://api.github.com/users/Greg-Robison/repos').done(function(data){
  var sortedDate = _.sortBy(data, "updated_at").reverse();


  // console.log('sorted', sortedDate);
//////////
  sortedDate.forEach(function(info){
    var formatDate = moment(info.updated_at, "YYYYMMDD").fromNow();

    info.formatDate = formatDate;

    console.log('info', info);
    $('.repo-section').append(template2(info));

    // console.log('date', date);
})
//////////

});
