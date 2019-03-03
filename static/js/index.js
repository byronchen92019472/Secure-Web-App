window.onload = init;

//list of locations
//street name, street number, longitude, longitude, price, info
var locations = [
	["St Asaph Street", "370", "-43.536389" , "172.643700", "5.00", "Parking Times from 7am to 9pm"],
	["Allen Street", "17","-43.537889" , "172.641032", "3.00", "Parking Times from 7am to 9pm"],
	["Southward Street", "7","-43.537235" , "172.641844", "3.50", "Parking Times from 7am to 9pm"],
	["Manchester Street", "79","-43.536657" , "172.639645", "2.00", "Parking Times from 7am to 9pm"],
	["Pilgrim Place", "13","-43.540601" , "172.641611", "6.00", "Parking Times from 7am to 9pm"],
	["Rope Street", "10","-43.538365" , "172.641404", "10.00", "Parking Times from 7am to 9pm"],
	["Lichfield Street", "165","-43.538365" , "172.641404", "8.00", "Parking Times from 7am to 9pm"],
	["Barbadoes Street", "182","-43.535794" , "172.645701", "0.00", "Parking Times from 7am to 9pm"],
	["Madras Street", "140","-43.538093", "172.642717", "4.50", "Parking Times from 6.30am to 10.30pm"]
]
var the_map;
var infowindow;
var parkicon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
var parkselected = false;

function init(){
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
		document.getElementById("description").innerHTML="Name: Driver Name</br>Phone: 022155432";
	}

}

