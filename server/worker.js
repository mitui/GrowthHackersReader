var request = require('request')
  , config = require('config');

var url = 'https://api.import.io/store/data/e7727aa4-48d7-4076-bcbd-8613350e3b8a/_query?input/webpage/url=https%3A%2F%2Fgrowthhackers.com%2F&_user=ef305ca9-dfac-45ee-94c3-d76e193ed596&_apikey=' + config.get('IMPORT_IO_API_KEY');

request({url: url}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var articles = JSON.parse(body);



        for (var i = 0; i < 5; i++) {

            var article = articles["results"][i];

            var obj = {};
            obj.title = article["link_2/_text"];
            obj.topic = article["topics_link/_text"];
            obj.thumbnail = article["footer_profile_icons_image_list"];
            obj.author = article["link_3/_text"];
            obj.summary = article["text_list_1"] + article["text_2"];

              request.post('http://localhost:4985/growthhackers/', {body: JSON.stringify(obj)}, function(error, response, body) {
                console.log(body);
            });
        }

    }
});