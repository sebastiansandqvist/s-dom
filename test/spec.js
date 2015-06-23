// ----- setup
// ---------------------------------------
var jsdom = require('jsdom').jsdom;
var doc = jsdom();
var window = GLOBAL.window = doc.defaultView;
var document = GLOBAL.document = window.document;


// ----- dependencies
// ---------------------------------------
require('blanket')({
    pattern: function (filename) {
        return !/node_modules/.test(filename);
    }
});

var expect = require('chai').expect;
var query = require('../index.js');


// --------------------------------- tests ---------------------------------

// ----- default selector engine
// ---------------------------------------
describe('default selector engine', function() {

	// select by id and class is sufficient to show
	// that querySelectorAll is correctly in place
	it('should select by ID', function() {

		// setup
		var el = document.createElement('div');
		el.id = 'selectById';
		document.body.appendChild(el);

		// test
		expect(query('#selectById').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

	it('should select by className', function() {

		// setup
		var el = document.createElement('div');
		el.className = 'selectByClassName';
		document.body.appendChild(el);

		// test
		expect(query('.selectByClassName').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

});


describe('manual selector engine', function() {

	it('should select by id', function() {

		// setup
		var el = document.createElement('div');
		el.id = 'selectById';
		document.body.appendChild(el);

		// test
		expect(query.byId('selectById').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

	it('should select by className', function() {

		// setup
		var el = document.createElement('div');
		el.className = 'selectByClassName';
		document.body.appendChild(el);

		// test
		expect(query.byClass('selectByClassName').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

	it('should select by tagName', function() {

		// setup
		var el = document.createElement('ul');
		document.body.appendChild(el);

		// test
		expect(query.byTag('ul').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

	it('should select by name', function() {

		// setup
		var el = document.createElement('textarea');
		el.setAttribute('name', 'selectByName');
		document.body.appendChild(el);

		// test
		expect(query.byName('selectByName').el[0]).to.be.an.instanceof(window.HTMLElement);

		// teardown
		el.parentNode.removeChild(el);

	});

});


// ----- append
// ---------------------------------------
describe('append', function() {

	it('should append an element to an element by tagName', function() {

		// setup
		var appended = document.createElement('div');
		appended.id = 'parent';
		document.body.appendChild(appended);
		query('#parent').append('span');
		var child = query('span').el[0];
		var html = document.documentElement.innerHTML;

		// test
		expect(child.parentNode.id).to.equal('parent');
		expect(html).to.include('<div id="parent"><span></span></div>');

		// teardown
		appended.parentNode.removeChild(appended);

	});

	it('should append an element to multiple elements by tagName', function() {

		// setup
		var appended1 = document.createElement('div');
		var appended2 = document.createElement('h1');
		appended1.className = 'parent';
		appended2.className = 'parent';
		document.body.appendChild(appended1);
		document.body.appendChild(appended2);
		query('.parent').append('span');
		var html = document.documentElement.innerHTML;

		// test
		var expected = '<div class="parent"><span></span></div>' + 
									 '<h1 class="parent"><span></span></h1>';
		expect(html).to.include(expected);

		// teardown
		appended1.parentNode.removeChild(appended1);
		appended2.parentNode.removeChild(appended2);

	});

});


// ----- each
// ---------------------------------------
describe('each', function() {
	it('0 matches: should do nothing');
	it('1 match: should call function for matched item');
	it('2 matches: should call function for matched items');
});


// ----- toArray
// ---------------------------------------
describe('toArray', function() {

	it('should nondestructively convert a NodeList to an Array', function() {

		// setup
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var body = document.body;
		body.appendChild(div1);
		body.appendChild(div2);

		// test
		expect(query.toArray(body.children)).to.not.be.an.instanceof(window.NodeList);
		expect(query.toArray(body.children)).to.be.an.instanceof(Array);
		expect(body.children).to.be.an.instanceof(window.NodeList);
		expect(body.children.length).to.equal(2); // proof it's nondestructive

		// teardown
		div1.parentNode.removeChild(div1);
		div2.parentNode.removeChild(div2);

	});

});