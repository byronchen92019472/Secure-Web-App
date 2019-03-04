window.onload = init;

var locations = [];
var the_map;
var infowindow;
var parkicon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
var parkselected = false;
var drivers = [];


function init(){
	//parse the locations from the django database
	locations_parse = locations_parse.slice(10).split("Location: ").slice(1)
	for (i = 0; i < locations_parse.length; i++){
		locations_parse[i] = locations_parse[i].split(",");
	}
	locations = locations_parse;
	//parse all drivers from django database
	drivers_parse = drivers_parse.slice(10).split("Driver: ").slice(1)
	for (i = 0; i < drivers_parse.length; i++){
		drivers_parse[i] = drivers_parse[i].split(",");
	}
	drivers_parse[drivers_parse.length-1][1] = drivers_parse[drivers_parse.length-1][1].slice(0, 9);
	drivers = drivers_parse;
	
	initMap();
	document.getElementById("search").onclick = search;
	document.getElementById("findparking").onclick = search;
	document.getElementById("finddriver").onclick = finddriver;
}

function initMap(){
	//function to create map and place parking locations
	
	//edit styles
	var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }];
	
	//create the google map
	the_map = new google.maps.Map(document.getElementById('map'), {
		zoom:16, 
		center: {lat:-43.537423, lng:172.642535},
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: myStyles
	});

	infowindow = new google.maps.InfoWindow();
	
	//place all the markers down
	for(var i=0; i<locations.length; i++){
		placemarkers(locations[i]);
	}
	
	//var marker = new google.maps.Marker({position: cpp, map: map});
}

function placemarkers(location){
	//function to get the location of the markers
	var position = new google.maps.LatLng(location[2], location[3])
	var marker = new google.maps.Marker({
		position:position,
		map:the_map,
		icon:parkicon
	});
	//add info box when location is clicked
	google.maps.event.addListener(marker, 'click', function(){
		parkselected = true;
		changeinfobox(location, marker);
		changedescription(location);
	})
}


function changedescription(location){
	//change the description text to reflect the location
	document.getElementById("streetname").innerHTML=location[1] + " " + location[0];
	document.getElementById("price").innerHTML="Price: $" + location[4];
	document.getElementById("description").innerHTML="Description</br>" + location[5];
}

function changeinfobox(location, marker){
	//change the information popup box and pan to the target
	infowindow.close();
	infowindow.setContent('<div id="infowindow">'+ location[1] + " " + location[0] +'</div>');
	infowindow.open(map, marker);
	//move the map to the target location
	the_map.panTo({lat: parseFloat(location[2]), lng: parseFloat(location[3])});
}

function search(){
	parkselected = true;
	//search up text from the search bar and pan to location and change description
	var searchbartext = document.getElementById("searchbar").value;
	for(var i=0;i < locations.length; i++){
		if (searchbartext.toLowerCase() == locations[i][0].toLowerCase()){
			//console.log(locations[i][2]);
			the_map.panTo({lat: parseFloat(locations[i][2]), lng: parseFloat(locations[i][3])});
			changedescription(locations[i]);
			changeinfobox(locations[i], new google.maps.Marker({
				position:{lat: parseFloat(locations[i][2]), lng: parseFloat(locations[i][3])},
				map:the_map,
				icon:parkicon
			}));
		}
	}
}

function finddriver(){
	//function to give info to contact driver
	if (parkselected){
		document.getElementById("price").innerHTML="";
		document.getElementById("description").innerHTML="";
		for (i = 0; i < drivers.length; i++){
			document.getElementById("description").innerHTML+="</br>Name: " 
			+ drivers[i][0] + "</br>Phone: " + drivers[i][1] + "</br>";
		}
	}

}

