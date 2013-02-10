module.exports.getProductSearchView = function (productSearchResult){
    var view = {};
    view.itemsPerPage = productSearchResult.itemsPerPage;
    view.startIndex = productSearchResult.startIndex;
    view.totalItems = productSearchResult.totalItems;
    view.currentItemCount = productSearchResult.currentItemCount;
    view.products = getProductData(productSearchResult.items);

    return view;

};

var getProductData = function(googleProductData)
{
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
    productItem.retailer = googleProductItem.author.name;
    productItem.country = googleProductItem.country;
    productItem.name = googleProductItem.title;
    productItem.description = googleProductItem.description;
    productItem.manufacturer = googleProductItem.brand;
    productItem.image = getProductImage(googleProductItem.images);

    return productItem;
}

var getProductImage = function (googleProductImages)
{
    if(googleProductImages.length > 0)
        return googleProductImages[0].link;

    return '';
}
