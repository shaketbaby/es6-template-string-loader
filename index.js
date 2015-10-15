var loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cachable && this.cachable(true);
  var query = loaderUtils.parseQuery(this.query);
	var context = query.context || "";
	var name = query.exportAs || "";
  var templateFn = "_" + (name || "template");
  var result = "function " + templateFn + "(" + context + ") {return `" + source + "`;}" +
		"export" + (name ? ' ' : ' default ') + "function " + name + "(ctx) {return " + templateFn + ".call(ctx, ctx);};";
  if (!this.callback) {
    return result;
  }
  this.callback(null, result);
}
