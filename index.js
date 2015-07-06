'use strict';

// ----- main constructor
//		--	@param el {Array} HTMLElement array
// ---------------------------------------
var Query = function(el) {
	this.el = el;
};


Query.prototype = {

	constructor: Query,


	// --------------------------------- core ---------------------------------
	
	each: function(cb) {

		for (var i = 0, len = this.el.length; i < len; i++) {
			cb(this.el[i], i);
		}

		return this;

	},


	// --------------------------------- manipulation ---------------------------------
	
	append: function(str) {

		this.each(function(el) {
			el.appendChild(document.createElement(str).cloneNode(true)); // append copy
		});

		return this;

	},

	clone: function() {

		// this.each(function(el) {
		// 	el.cloneNode(true);
		// });

		return this;

	},

	hide: function() {

		this.each(function(el) {
			el.style.display = 'none';
		});

		return this;

	},

	show: function() {

		this.each(function(el) {
			el.style.display = '';
		});

		return this;
	},

	toggle: function() {

		this.each(function(el) {
			el.style.display = el.style.display === 'none' ? '' : 'none';
		});

		return this;

	}

	// --------------------------------- traversal ---------------------------------
	


}; // end Query.prototype






// --------------------------------- helpers ---------------------------------

// ----- convert HTMLCollection to Array
//		--	@param nodeList {NodeList|HTMLCollection}
//		--	@return {Array}
// based on http://stackoverflow.com/q/3199588/4459340
// ---------------------------------------
function toArray(nodeList) {

	var i = nodeList.length;
	var arr = [];
	
	while (i--) {
		arr.unshift(nodeList[i]);
	}

	return arr;

}


// --------------------------------- exports ---------------------------------

// ----- export factory & selector engine
//		--	@param? selector {String} css-like selector
//		--	@return {Query} new s-query object
// ---------------------------------------
module.exports = function(selector) {
	var arr = toArray(document.querySelectorAll(selector));
	return new Query(arr);
};


// ----- selector engine
//		--	@param id|className|tagName|name {String}
//		--	@return {Query}
// ---------------------------------------
module.exports.byId = function(id) {
	return new Query([document.getElementById(id)]);
};

module.exports.byClass = function(className) {
	var elements = toArray(document.getElementsByClassName(className));
	return new Query(elements);
};

module.exports.byTag = function(tag) {
	var elements = toArray(document.getElementsByTagName(tag));
	return new Query(elements);
};

module.exports.byName = function(name) {
	var elements = toArray(document.getElementsByName(name));
	return new Query(elements);
};


// attach helper functions
module.exports.toArray = toArray;