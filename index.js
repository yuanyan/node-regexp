var defaultSource = "(?:)"

function toArray(arg){
    return [].slice.call(arg)
}

function regexp () {
    if(this.constructor !== regexp) return new regexp()
    this.source = defaultSource
}

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

regexp.naming = {}

regexp.escape = function (source){
    if (source == null) return ""
    return String(source).replace( /([.*+?^=!:${}()|[\]\/\\])/g, "\\$1" )
}

regexp.prototype.add = function(){
    if(this.source == defaultSource){
        this.source = ""
    }
    this.source += toArray(arguments).join("")
    return this
}

regexp.prototype.start = function(val){
    return this.add( "^", regexp.escape(val) )
}

/**
 * .must('a').atleast(3)
 */
regexp.prototype.atleast = function(times){
    return this.add( "{", times, ",}" )
}

/**
 * .must('a').has(1, 5)
 * .must('a').has(5)
 */
regexp.prototype.has = function(){
    return this.add( "{", toArray(arguments).join(","), "}" )
}

regexp.prototype.must = function(val){
    return this.add( regexp.escape(val) )
}

regexp.prototype.maybe = function(val){
    return this.add( "(?:", regexp.escape(val), ")?" )
}

regexp.prototype.something = function(){
    return this.add( "(?:.)+" )
}

regexp.prototype.anything = function(){
    return this.add( "(?:.)*" )
}

regexp.prototype.anythingBut = function(val){
    return this.add( "(?:[^", val, "])*" )
}

regexp.prototype.somethingBut = function(val){
    return this.add( "(?:[^", val, "])+" )
}

regexp.prototype.find = function(val){
    return this.add( "(", val, ")" )
}

/**
 * either("org", "com", "net")
 */
regexp.prototype.either = function(){
    return this.add( "(?:", toArray(arguments).join("|"), ")" )
}

regexp.prototype.end = function(val){
    return this.add( regexp.escape(val), "$" )
}

regexp.prototype.global = function(){
    this.globalFlag = true
    return this
}

regexp.prototype.ignoreCase = function(){
    this.ignoreCaseFlag = true
    return this
}

regexp.prototype.multiline = function(){
    this.multilineFlag = true
    return this
}

regexp.prototype.toRegExp = function(name){
    var flags = (this.multilineFlag? "m": "") + (this.ignoreCaseFlag? "i": "") + (this.globalFlag? "g": "")
    var re = new RegExp(this.source, flags)
    if(name) regexp.naming[name] = re
    return re
}

regexp.prototype.toString = function(){
    return this.source
}

module.exports = regexp
