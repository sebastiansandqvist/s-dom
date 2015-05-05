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
var dom = require('../index.js');


// ----- tests
// ---------------------------------------
describe('dom', function() {

	it('should return a DOM element', function() {
		var domDiv = dom().create('div').dom();
		expect(domDiv).to.be.an.instanceof(window.HTMLElement);
		expect(domDiv).to.be.an.instanceof(window.Node);
		dom().create('div');
		var domDivs = dom('div').dom();
		expect(domDivs).to.be.an.instanceof(window.NodeList);
		dom('div').remove();
	});

});


describe('create', function() {

	it('should create an element and append it to body', function() {
		var div = dom().create('div');
		expect(div.el).to.be.an.instanceof(window.HTMLElement)
		expect(div.el).to.be.an.instanceof(window.Node)
		expect(div.el._localName).to.equal('div');
		div.remove();
	});

	it('should be possible to have two distinct elements', function() {
		var span1 = dom().create('span').id('span1');
		var span2 = dom().create('span').id('span2');
		expect(span1.el).to.not.deep.equal(span2.el); // note: DOM deep equal takes a long time
		span1.remove();
		span2.remove();
	});

});


describe('remove', function() {

	it('should return the removed element and remove that element', function() {
		var div2 = dom().create('div').id('removedDiv');
		expect(document.documentElement.innerHTML).to.include('removedDiv');
		var oldDiv = div2.remove();
		expect(oldDiv).to.be.an.instanceof(window.HTMLElement);
		expect(oldDiv).to.be.an.instanceof(window.Node);
		expect(document.documentElement.innerHTML).to.not.include('removedDiv');
	});

	it('should also work with HTMLCollections', function() {
		var a1 = dom().create('a').id('a1');
		var a2 = dom().create('a').id('a2');
		var a3 = dom().create('a').id('a3');
		expect(document.documentElement.innerHTML).to.include('a1');
		expect(document.documentElement.innerHTML).to.include('a2');
		expect(document.documentElement.innerHTML).to.include('a3');
		var removed = dom('a').remove();
		expect(document.documentElement.innerHTML).to.not.include('a1');
		expect(document.documentElement.innerHTML).to.not.include('a2');
		expect(document.documentElement.innerHTML).to.not.include('a3');
	});

	it('should do nothing if there is nothing to remove', function() {
		var nothing = dom().remove();
		expect(nothing.el).to.be.undefined;
		nothing.create('span').id('fromNothing');
		expect(nothing.el).to.not.be.undefined;
		expect(nothing.el.id).to.equal('fromNothing');
		nothing.remove();
	});

});


describe('append', function() {

	it('should append an element to an element', function() {
		var appended = dom().create('div').id('parent').append('span').id('child');
		expect(appended.el.id).to.equal('child');
		expect(appended.parent().el.id).to.equal('parent');
	});
	
	it('should also work with DOM elements')
	it('should also work with DOM collections/nodeLists')
	it('should set current element to appended element')

});


describe('parent', function() {

	it('should traverse to the parent')

});


describe('selector', function() {

	it('should select by id', function() {
		var span3 = dom().create('span').id('span3');
		expect(dom('#span3').el._localName).to.equal('span');
		expect(dom('#span3').el.id).to.equal('span3');
		span3.remove();
	});

	it('should select by a complex query (attribute selector)', function() {
		var b = dom().create('b').attr('data-test', 'testing');
		var query = dom('[data-test]');
		var query2 = dom('[data-test=testing]');
		var query3 = dom('[data-test^=test]');
		expect(query).to.deep.equal(b);
		expect(query2).to.deep.equal(b);
		expect(query3).to.deep.equal(b);
		b.remove();
	});

	it('should select by a complex query (child selector)', function() {
		var form = dom().create('form').id('form1');
		var input = dom().create('input').id('input1');
		form.el.appendChild(input.el);
		var query = dom('form input');
		expect(query).to.deep.equal(input);
		expect(query.el).to.be.an.instanceof(window.HTMLElement)
		expect(query.el).to.be.an.instanceof(window.Node)
		input.remove();
		form.remove();
	});

	it('should select by className', function() {
		var a1 = dom().create('a').attr('class', 'foo').id('a1');
		var a2 = dom().create('a').attr('class', 'foo').id('a2');
		var a3 = dom().create('a').attr('class', 'foo').id('a3');
		var a4 = dom().create('a').attr('class', 'Foo').id('a4');
		var foos = dom('.foo');
		expect(foos.el.length).to.equal(3);
		expect(foos.el).to.be.an.instanceof(window.NodeList)
		expect(foos.el[0].className).to.equal('foo');
		expect(foos.el[1].className).to.equal('foo');
		expect(foos.el[2].className).to.equal('foo');
		foos.remove();
		a4.remove();
	});

	it('should select by tagName', function() {
		var em = dom().create('em').id('em1');
		expect(dom('em').el._localName).to.equal('em');
		expect(dom('em').el.id).to.equal('em1');
		em.remove();
	});

	it('should select by state selector', function() {
		var checkbox = dom().create('input').attr('type', 'checkbox')
		checkbox.dom().checked = true;
		var query = dom(':checked');
		expect(query.el).to.be.an.instanceof(window.HTMLElement);
		checkbox.remove();
	});

});



describe('id', function() {

	it('should work as a getter & setter', function() {
		var span4 = dom().create('span').id('span4');
		expect(span4.id()).to.equal('span4');
		expect(span4.el.id).to.equal('span4');
		span4.remove();
	});

	it('should work as a selector', function() {
		dom().create('span').id('span5');
		var span5 = dom().id('span5');
		expect(span5.el.id).to.equal('span5');
		expect(span5.el instanceof window.HTMLElement).to.be.true;
		expect(span5.el instanceof window.Node).to.be.true;
		span5.remove();
	});

});


describe('attr', function() {

	it('should work as a getter and setter', function() {
		var span = dom().create('span').id('span6').attr('data-test', 'testing');
		expect(dom('#span6').attr('data-test')).to.equal('testing');
		span.remove();
	});

	it('should set multiple elements\' attributes', function() {
		var span7 = dom().create('span').id('span7');
		var span8 = dom().create('span').id('span8');
		dom('span').attr('data-test2', 'testing2');
		expect(span7.attr('data-test2')).to.equal('testing2');
		expect(span8.attr('data-test2')).to.equal('testing2');
	});

});