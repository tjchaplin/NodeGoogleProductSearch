module.exports = function(app) {

    app.get('/',function(request, response){
        response.render('index',{title:app.get('name')});
    });
}
