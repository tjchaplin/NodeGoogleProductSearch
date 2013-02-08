var should = require('should');

var user ={
	name:"Test"
};

describe('User',function(){
	it("Should contain test name",function(){
		user.should.have.property('name',"Test123");
	})
});

describe('User',function(){
	it("Should contain test name",function(){
		user.should.have.property('name',"Test");
	})
});

