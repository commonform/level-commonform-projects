/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var testStore = require('./store')
var tape = require('tape')
var series = require('async-series')

tape('Get Publishers', function(test) {
  test.plan(5)
  var level = testStore()
  var formA = { content: [ 'A test form' ] }
  var formB = { content: [ 'Another test form' ] }
  series(
    [ function(done) {
        level.putProject('ari', 'nda', '1e', formA, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.putProject('bob', 'psa', '1e1u', formB, function(error) {
          test.ifError(error, 'no putProject() error')
          done() }) },
      function(done) {
        level.getPublishers(function(error, publishers) {
          test.ifError(error, 'no getPublishers() error')
          test.same(
            publishers,
            [ 'ari', 'bob' ],
            'getPublishers() yields list of publishers') })
        done() } ],
    function(error) {
      test.ifError(error, 'no series error') }) })
