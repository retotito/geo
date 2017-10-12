const countryId = 2658434;
const countryName ="Scweiz";
var countryTree = {
    "countryName": countryName,
    "countryId":countryId,
    children: []
};

$(document).ready(function() {
    //console.log(find(testJSON,"geonameId",123456));
    //console.log(testJSON.children[0].geonameId.parent);
    appendChildren(countryTree.children, countryId)
});

function appendChildren (parent, geonameID) {
    var reducedArray = [];
    $.ajax({
        url: "http://api.geonames.org/childrenJSON?formatted=true&geonameId="+geonameID+"&username=retotito&style=full",
        context: document.body
      }).done(function(data) {

        if(data.geonames && data.totalResultsCount != 0) {
            //console.log(data);
            $.each( data.geonames, function( key, value ) {
                let reducedItem = {};
                reducedItem.geonameId = value.geonameId;
                reducedItem.asciiName = value.asciiName;
                reducedItem.alternateNames = value.alternateNames;
                reducedItem.children = [];
                parent.push(reducedItem);
                //console.log(parent[key]);
                alert('next');
                appendChildren(parent[key].children, value.geonameId);
                //reducedArray.push(reducedItem);
            });
            //console.log(JSON.stringify( reducedArray));
            //console.log(reducedArray);
            //children.push(reducedArray);
            console.log(countryTree);
        } else {
            console.log("no data");
        }

      }).fail(function() {
        alert( "error" );
      });
}

