node-regexp
===

New RegExp Style for Node.js

## Install
```sh
$ npm install node-regexp
```

## API

### Methods
```js
var regexp = require('node-regexp')
var re = regexp().
  .start('str')        // must start str
  .maybe('str')        // maybe match str
  .atleast(3)          // atleast match 3 times
  .must('str')         // must match str
  .has(1, 5)           // should have 1 to 5
  .either('str1', 'str2', 'str3') // either str1, str2, str3
  .find('str')         // capture match
  .anythingBut('str')  // anything match but str
  .somethingBut('str') // something match but str
  .end('str')          // match end str
  .global()            // global match
  .ignoreCase()        // ignore case match
  .multiline()         // multiple lines match
  .toRegExp()          // return a RegExp
  .toString()          // return a String
```

### Vars
```js
var regexp = require('node-regexp')
regexp.number = "[0-9]"
regexp.lower = "[a-z]"
regexp.upper = "[A-Z]"
regexp.letter = "[a-zA-Z]"
regexp.tab = "\\t"
regexp.space = "\\s"
regexp.word = "\\w"
regexp.digit = "\\d"
regexp.newline = "\\n"
regexp.return = "\\r"
regexp.eol = "(?:(?:\\n)|(?:\\r\\n))"
```

## Demo

```js
var regexp = require('node-regexp')
var re = regexp()
  .start('http')
  .maybe('s')
  .must('://')
  .maybe('WWW.')
  .somethingBut(regexp.space)
  .end('.com')
  .ignoreCase()
  .toRegExp()

re.test("http://qq.com") // => true
re.test("http://www.qq.com") // => true
re.test("https://www.qq.com") // => true
re.test("http://www.qqcom") // => false
re.test("https://www.qq.net") // => false
```