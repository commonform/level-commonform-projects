// Copyright 2016 Kyle E. Mitchell
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var compareEdition = require('reviewers-edition-compare')
var decode = require('bytewise/encoding/hex').decode
var projectKey = require('./project-key')

module.exports = function getSortedEditions(publisher, project, callback) {
  var editions = [ ]
  this.levelup.createReadStream(
    { gte: projectKey(publisher, project, null),
      lte: projectKey(publisher, project, undefined) })
    .on('data', function(item) {
      var decodedKey = decode(item.key)
      editions.push(
        { publisher: decodedKey[0],
          project: decodedKey[1],
          edition: decodedKey[2],
          form: item.value }) })
    .on('error', function(error) {
      callback(error) })
    .on('end', function() {
      editions.sort(function(a, b) {
        return compareEdition(a.edition, b.edition) })
      callback(null, editions) }) }
