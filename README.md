node-regexp
===

New RegExp Style for Node.js

## Demo

```
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