var translate = true;
$("#language").click(function () {
    translate = false;
    translateAll();
});
$(document).ready(function() {
    translateAll();
});

const translations = {
    "Find Scales for your Chords": "Trouvez des Gammes pour vos Accords",
    "Find Scales": "Trouver des Accords",
    "Français": "English",
    "Clear": "Recommencer"
}

function translateElement(element)
{
    if (translations[element.innerHTML] === undefined) {
        console.log('Missing Translation: ' + element.innerHTML);
        return 0;
    }
    element.innerHTML = translations[element.innerHTML];
}

function translateElementBack(element)
{
    // 
    var keys = Object.keys(translations);
    console.log(keys);
    if (translations[element.innerHTML] === undefined) {
        console.log('Missing Translation: ' + element.innerHTML);
        return 0;
    }
    element.innerHTML = keys[element.innerHTML];
}

function translateAll()
{
    if (translate) {
        $('h1:not(:has(*))').each(function() {
            translateElement(this);
        });
        $('button:not(:has(*))').each(function() {
            translateElement(this);
        });
        $('a:not(:has(*))').each(function() {
            translateElement(this);
        });
    } else {
        $('h1:not(:has(*))').each(function() {
            translateElementBack(this);
        });
        $('button:not(:has(*))').each(function() {
            translateElementBack(this);
        });
        $('a:not(:has(*))').each(function() {
            translateElementBack(this);
        });
    }
}