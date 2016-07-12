function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  };
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '2c75fc18d125009804c24d5d29c25268',
  privateKey: '9e72845868dd8d8a238b208cf4f03848db410744',
  version: '1'
});


// Since we have these I added them below to your code where necessary. There were also some missing ; and some other changes I made that popped up in my linter.
function $(selector) {
  return document.querySelector(selector);
}

$.create = function(elementName){
  return document.createElement(elementName);
};

$.createText = function(text){
  return document.createTextNode(text);
};

$.setAttribute = function (el, attr, value) {
  return el.setAttribute(el, attr, value);
};

// Make a call using the api


marvel('/characters/1009266/comics').then(function(json) {
  json.data.results.map(function(comics){

    var comicContainer = document.createElement('comic');

    //  // Any operations specific to this character
    var imgPath = comics.thumbnail.path + '.' + comics.thumbnail.extension;
    var name = comics.title;

    var img = $.create('img');
    img.setAttribute('src', imgPath);
    var nameTag = $.create('comic-name');
    var nameTextNode = $.createText(name);
    var nameLinkNode = $.create('a');
    nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
    nameLinkNode.appendChild(nameTextNode);
    var shape = $.create('div');
    comicContainer.appendChild(shape);

    nameTag.appendChild(nameTextNode); // <character-name><a href="...">3D-man</a></character-name>

    // // Add different properties for a single character
    comicContainer.appendChild(nameTag); // <character><character-name>3D-Man</character-name></character>
    comicContainer.appendChild(img); // <character><character-name>3D-Man</character-name><img src="..." /></character>
    img.addEventListener("click", function(){
    var snd = new Audio('/bigrez2.wav');
        snd.play();
    setTimeout(function(){alert("X-men and Avengers are 2 of Marvel's most successful franchises!");},2000);
 });


    // Add the character tag to the overall list of characters
    var container = document.querySelector('comics'); // <characters><character><character-name>3D-Man</character-name><img src="..." /></character></characters>
    container.appendChild(comicContainer);


  });

});

// (function(index, innerHTML) {
//         return comic-name.innerHTML.replace('(', '<br />(');
// });

// marvel('/characters').then(function(json)){
//   console.log(json)
// }