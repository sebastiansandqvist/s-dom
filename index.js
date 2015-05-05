'use strict';


// ----- main constructor
//		--	el {HTMLElement} optional DOM element (or HTMLCollection)
// ---------------------------------------
var Dom = function(el) {
	this.el = el;
};



// --------------------------------- all methods ---------------------------------


// ----- return DOM element
// ---------------------------------------
Dom.prototype.dom = function() {
	return this.el;
};


// ----- create DOM element
// ---------------------------------------
Dom.prototype.create = function(str) {

	this.el = document.createElement(str);
	document.body.appendChild(this.el);

	return this;

};


// ----- remove DOM element(s)
// ---------------------------------------
Dom.prototype.remove = function() {

	if (!this.el) {
		return this;
	}

	var removed;

	// HTMLCollection/NodeList
	if (this.el.length) {

		removed = [];

		for (var i=0, el, removedEl; i<this.el.length; i++) {
			el = this.el[i];
			removedEl = el.parentNode.removeChild(el);
			removed.push(removedEl);
		}

	}
	// HTMLElement/Node
	else {
		removed = this.el.parentNode.removeChild(this.el);
	}

	return removed;

};


// ----- append
// ---------------------------------------
Dom.prototype.append = function(str) {

	var newElement = document.createElement(str);

	this.el.appendChild(newElement);
	this.el = newElement;

	return this;

};


// ----- select, get/set id
// ---------------------------------------
Dom.prototype.id = function(value) {

	// as a getter
	if (this.el && !value) {
		return this.el.id;
	}

	// as a selector
	if (!this.el && value) {
		this.el = document.getElementById(value);
	}

	// as a setter
	if (this.el && value) {
		this.el.id = value;
	}

	return this;

};


// ----- get/set attributes
//		--	@param attribute {String} attribute to get/set
//		--	@param value {String} optional value to set
// ---------------------------------------
Dom.prototype.attr = function(attribute, value) {
	
	if (arguments.length === 1) {
		return this.el.getAttribute(attribute);
	}

	// HTMLCollection/NodeList
	if (this.el.length) {
		for (var i=0, len=this.el.length; i<len; i++) {
			this.el[i].setAttribute(attribute, value);
		}
	}
	// HTMLElement/Node
	else {
		this.el.setAttribute(attribute, value);
	}


	return this;

};


// ----- get/set properties
//		--	@param property {String}
//		--	@param value {Boolean} optional
// ---------------------------------------



// ----- traversal: parent
// ---------------------------------------
Dom.prototype.parent = function() {

	this.el = this.el.parentNode;
	return this;

};


// ----- manipulate classes
// ---------------------------------------
/*Dom.prototype.addClass = function(className) {
	this.el.classList.add(className);
	return this;
};

Dom.prototype.removeClass = function(className) {
	this.el.classList.remove(className);
	return this;
};

Dom.prototype.toggleClass = function(className) {
	this.el.classList.toggle(className);
	return this;
}

Dom.prototype.hasClass = function(className) {
	return this.el.classList.contains(className);
};*/


// --------------------------------------------------
// TODO: add .each to core and use it for all methods
//				instead of manually checking length of el
// --------------------------------------------------



// --------------------------------- exports ---------------------------------


// ----------------------------------------------------------------------
// ----- core: exported object and selector engine
//		1. instantiate a new Dom([el]) object to get all methods
//		2. selector engine sets `el` to a HTMLElement or HTMLCollection
//		2.0 convert NodeLists with a single item in them into a single Node
//		2.1 tagName, returns live HTMLCollection
//		2.2 complex query, returns non-live NodeList
//		2.3 id, returns a non-live HTMLElement
//		2.4 className, returns a live HTMLCollection (NodeList in jsDom)
//		2.5 other queries (:checked)
// ----------------------------------------------------------------------
module.exports = function(selector) {

	var el;

	// [2]
	if (selector)	{

		// [2.0]
		var listToEl = function (nodeList) {

			if (nodeList.length === 1) {
				return nodeList[0];
			}

			return nodeList;

		};

		var valid = /^[-\w]+$/; // matches hyphens, underscores, alphaNumeric strings
		var query = selector.slice(1);

		// [2.1] element(s)
		if (valid.test(selector)) {
			el = listToEl(document.getElementsByTagName(selector));
		}
		
		// [2.2] query
		else if (!valid.test(query)) {
			el = listToEl(document.querySelectorAll(selector));
		}

		// [2.3] id
		else if (selector[0] === '#') {
			el = document.getElementById(query);
		}

		// [2.4] class
		else if (selector[0] === '.') {
			el = listToEl(document.getElementsByClassName(query));
		}

		// [2.5] all the rest...
		else {
			el = listToEl(document.querySelectorAll(selector));
		}

		
	} // end if (selector)

	return new Dom(el); // [1];

};