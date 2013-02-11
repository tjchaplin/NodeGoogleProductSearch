module.exports.getProductSearchView = function (productSearchResult){
    var view = {};
    view.itemsPerPage = productSearchResult.itemsPerPage;
    view.startIndex = productSearchResult.startIndex;
    view.totalItems = productSearchResult.totalItems;
    view.currentItemCount = productSearchResult.currentItemCount;
    view.products = getProductData(productSearchResult.items);

    view.topRetailers = getTopRetailers(view.products);
    view.topManufacturers = getTopManufacturers(view.products);
    return view;

};

var getTopRetailers = function(products)
{
    var topRetailerCount = 5;
    var  allProductRetailers = getRetailerProductCounts(products);
    allProductRetailers.sort(compareProductCounts);

    var topRetailers = [];
    for(var i=0;i< topRetailerCount && i < allProductRetailers.length;i++)
    {
        var retailer = {name:allProductRetailers[i].name};
        console.log(retailer);
        topRetailers.push(retailer);
    }

    return topRetailers;
};

var getRetailerProductCounts = function(products)
{
    var allProductRetailers =[];
    for(var i=0; i< products.length;i++)
    {
        var productRetailer = products[i].retailer;

        addProductCount(allProductRetailers,productRetailer);
    }

    return allProductRetailers;
}

var getTopManufacturers = function(products)
{
    var topManufacturerCount = 5;
    var  allProductManufacturers = getManufacturerProductCounts(products);
    allProductManufacturers.sort(compareProductCounts);

    var topManufacturers = [];
    for(var i=0;i< topManufacturerCount && i < allProductManufacturers.length;i++)
    {
        var manufacturer = {name:allProductManufacturers[i].name};
        console.log(manufacturer);
        topManufacturers.push(manufacturer);
    }

    return topManufacturers;
};

var getManufacturerProductCounts = function(products)
{
    var allProductManufacturers =[];
    for(var i=0; i< products.length;i++)
    {
        var productManufacturer = products[i].manufacturer;

        addProductCount(allProductManufacturers,productManufacturer);
    }

    return allProductManufacturers;
}

var compareProductCounts = function(productCountLeft, productCountRight)
{
    if(productCountLeft.productCount >  productCountRight.productCount)
        return -1;

    if(productCountLeft.productCount < productCountRight.productCount)
        return 1;

    return 0;
}

var addProductCount = function(allProductCounts,name)
{

    for(var i = 0; i < allProductCounts.length;i++)
    {
        if(allProductCounts[i].name == name)
        {
            console.log("Found Match Updating product count");
            allProductCounts[i].productCount++;
            return;
        }
    }

    console.log("No Match adding product count");
    var productCount = {name:name,productCount:1};
    allProductCounts.push(productCount);
}

var getProductData = function(googleProductData)
{
    console.log(JSON.stringify(googleProductData));
    var productData = [];
    for(var i = 0; i< googleProductData.length; i++)
    {
        var productItem = getProductItem(googleProductData[i].product);
        productData.push(productItem);
    }

    return productData;
};


var getProductItem = function (googleProductItem)
{
    var productItem = {};
    productItem.gtin = googleProductItem.gtin;
    productItem.retailer = getProductRetailer(googleProductItem.author.name);
    productItem.country = googleProductItem.country;
    productItem.name = getProductName(googleProductItem.title);
    productItem.description = getProductDescription(googleProductItem.description);
    productItem.manufacturer = googleProductItem.brand;
    productItem.image = getProductImage(googleProductItem.images);

    return productItem;
}

var getProductRetailer = function(googleProductRetailer)
{
    var substringEndIndex=googleProductRetailer.indexOf(" ");
    if(substringEndIndex > 0)
        return googleProductRetailer.substr(0,substringEndIndex);

    return googleProductRetailer;
}

var getProductName = function(googleProductName)
{
    if(googleProductName.length > 40)
        return googleProductName.substr(0,40)+" ...";

    return googleProductName;
}

var getProductDescription = function(googleProductDescription)
{
    if(googleProductDescription.length > 255)
        return googleProductDescription.substr(0,255)+" ...";

    return googleProductDescription;
}

var getProductImage = function (googleProductImages)
{
    if(googleProductImages.length > 0)
        return googleProductImages[0].link;

    return '';
}
