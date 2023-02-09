var niceWords = [
    "you look amazing today!",
    "what is your secret to look that good?",
    "did you cut your hair? Looks fantastic!",
    "what a lovely day, isn't it?",
    "here is a fact: if you had a twin, I would still choose you.",
    "you are the nicest person I have ever seen!"
]
var types = ["trivia", "date", "math", "year"];
var randomIndex = Math.floor((Math.random() * 3));
var random = types[randomIndex];

// Construct the header object.
requestHeader = new Headers({
    "X-RapidAPI-Key": "<YOUR_RAPIDAPI_KEY_HERE>"
});

// Construct the request object.
var factRequest = new Request("https://numbersapi.p.rapidapi.com/random/" + random + "?fragment=true&json=true", {
    method: 'GET',
    headers: requestHeader
});

fetch(factRequest)
    .then(
        function (response) {
            if (response.status !== 200) {
                PrintError();
                return;
            }

            // Examine the text in the response  
            response.json().then(function (data) {
                var factString = data.text;
                var supScript = "{";
                var position = factString.indexOf(supScript);

                if (position != -1) {
                    factString = ProcessSuperscript(factString, position);
                    UpdateFieldHTML("fact", factString + ".");
                } else {
                    UpdateFieldWithNodeValue("fact", factString + ".");
                }


                if (randomIndex == 1) {
                    UpdateFieldWithNodeValue("number", data.year + ", ");
                } else {
                    UpdateFieldWithNodeValue("number", data.number + ", ");
                }
            });
        }
    )
    .catch(function (err) {
        PrintError();
    })

function UpdateFieldWithNodeValue(id, value) {
    document.getElementById(id).childNodes[0].nodeValue = value;
}

function UpdateFieldHTML(id, value) {
    var newdiv = document.createElement("div");
    newdiv.innerHTML = value;
    var container = document.getElementById(id);
    container.appendChild(newdiv);
}

function PrintError() {
    var randomWordingIndex = Math.floor((Math.random() * (niceWords.length - 1)));
    var randomWording = niceWords[randomWordingIndex];
    UpdateFieldWithNodeValue("fact", 'Looks like your internet connection is down. Anyway, ' + randomWording);
}

function ProcessSuperscript(factString, position) {

    factString = factString.replace("^{", '<sup>');
    factString = factString.replace("}", '</sup>');

    var matches = occurrences(factString, "^{");
    for (var i = 0; i < matches; i++) {
        factString = factString.replace("^{", '<sup>');
        factString = factString.replace("}", '</sup>');
    }

    return factString;
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

// Process and return the most visited 5 URLs.
function GetMostVisitedURLs(mostVisitedURLs) {
    var mostVisitedDiv = document.getElementById('mostVisitedURLs');
    var ul = mostVisitedDiv.appendChild(document.createElement('ul'));
    var a, div, urlTitle;
    for (var i = 0; i < 5; i++) {
        a = ul.appendChild(document.createElement('a'));
        div = a.appendChild(document.createElement('div'));
        urlTitle = mostVisitedURLs[i].title;
        a.href = mostVisitedURLs[i].url;
        div.appendChild(document.createTextNode(urlTitle.substring(0, 25)));
    }
    mostVisitedDiv.appendChild(document.createElement('hr'));
}

// Get the most visited URLs from the browser.
chrome.topSites.get(GetMostVisitedURLs);