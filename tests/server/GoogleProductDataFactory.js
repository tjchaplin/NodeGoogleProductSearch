var should = require('should');
var sampleData = require('./SampleGoogleProductData');
var googleProductDataFactory = require('../../server/Factories/GoogleProductDataFactory');

describe('Google Product Search',function(){
    it("Should get result pagination results",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        searchView.itemsPerPage.should.be.greaterThan(0)
        searchView.startIndex.should.be.greaterThan(0)
        searchView.totalItems.should.be.greaterThan(0)
        searchView.currentItemCount.should.be.greaterThan(0)
    })
});


describe('Google Product Search',function(){
    it("Should get each products gtin",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.gtin.length.should.be.greaterThan(0);
        }
    })
});

describe('Google Product Search',function(){
    it("Should get each products retailer",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.retailer.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get each products name",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.name.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get each products description",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.description.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get each products manufacturer",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.manufacturer.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get each products image",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.image.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get top product retailers",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.topRetailers.length; i++)
        {
            var retailer = searchView.topRetailers[i];
            console.log(JSON.stringify(retailer));
            retailer.name.length.should.be.greaterThan(0);
        }
    })
});


describe('Google Product Search',function(){
    it("Should get top product manufacturers",function(){
        var searchView = googleProductDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.topManufacturers.length; i++)
        {
            var manufacturer = searchView.topManufacturers[i];
            console.log(JSON.stringify(manufacturer));
            manufacturer.name.length.should.be.greaterThan(0);
        }
    })
});