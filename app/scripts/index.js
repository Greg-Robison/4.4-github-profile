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
// var picture = $('#avatar-template').html();
// var template = Handlebars.compile(picture);
// $.ajax('https://api.github.com/users/Greg-Robison').done(function(data){
//   console.log(data);
//   $('#my-avatar').append(template(data));
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























// fetchJSONP(url, logData);
//
//
//
// function fetchJSONP(url, callback) {
//     var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
//     var script = document.createElement('script');
//
//     window[callbackName] = function(data) {
//         delete window[callbackName];
//         document.body.removeChild(script);
//         callback(data);
//     };
//
//     script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
//     document.body.appendChild(script);
// }
