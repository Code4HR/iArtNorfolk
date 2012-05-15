qx.Class.define("iartnorfolk.page.Map",
{
	extend : iartnorfolk.page.iArtShell,

	construct : function() {
		this.base(arguments);
	},

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

	members : {
		
      _muralIcon : 'resource/map-stake.png',
      _locationIcon : 'resource/location-icon-pin-32.png',
      
	_dataLoadUrl : "http://iartnorfolk.com/data.php",
	_detailDataLoadUrl : "http://iartnorfolk.com/data.php?detail=",
	_map : null,
    //Map Styles
    _mapTypeName : 'Map',
    _mapTypeDef : [{featureType: "road",elementType: "all",stylers: [{ saturation: -99 },{ hue: "#0000ff" }]},{featureType: "all",elementType: "labels",stylers: [{ visibility: "simplified" }]},{featureType: "road",elementType: "geometry",stylers: [{ visibility: "simplified" }]},{featureType: "road.local",elementType: "labels",stylers: [{ visibility: "on" }]},{featureType: "all",elementType: "geometry",stylers: [{ saturation: -20 }]}],
    _mapOptions : {
				zoom: 16,
				center: new google.maps.LatLng(36.84765224454971, -76.2922677397728),     // norfolk
				mapTypeId: this._mapTypeName,
				mapTypeControlOptions: {
					mapTypeIds: [this._mapTypeName, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
				}
			},
    _markers : [],
    _lastSearchLatLng : undefined,
    _myLocationLatLng : undefined,
    _myLocationMarker : undefined,
    _directionsService : new google.maps.DirectionsService(),
    //Mural cache
    _murals : [],
		
		// overridden
		_initialize : function() {
			this.base(arguments);

			document._mapPage = this;
			
			//==================================================================================
			// Setup the detail thumbnail popup
				var popupbase = new qx.ui.mobile.container.Composite();			
				popupbase.setLayout(new qx.ui.mobile.layout.VBox());

				popupbase.addCssClass("setCenter");
				
				document.detailThumbHtmlBlob = new qx.ui.mobile.embed.Html();
				document.detailThumbHtmlBlob.addCssClass("setCenter");

				var detailButtons = new qx.ui.mobile.container.Composite();			
				detailButtons.setLayout(new qx.ui.mobile.layout.HBox());
				
				popupbase.add(document.detailThumbHtmlBlob);
				var morebutton = new qx.ui.mobile.form.Button("view");
				morebutton.removeCssClass("button");
				morebutton.addCssClass("myDetailThumbButton");
				morebutton.addListener("tap", function(){
					//alert("you want more..." + document.theDetailId); 
					document.detailPopup.hide();
					document.__prevPage = document.mapPage; // so the user can go back to this
					document.detailPage.show({animation:"fade"}); // have to show before refresh, because some things may need to be init'd the first time
					document.detailPage._refreshDetail(document.theDetailId);
				});
				morebutton.addCssClass("setCenter");

				var closebutton = new qx.ui.mobile.form.Button("close");
				closebutton.removeCssClass("button");
				closebutton.addCssClass("myDetailThumbButton");
				closebutton.addListener("tap", function(){document.detailPopup.hide()});
				closebutton.addCssClass("setCenter");
				
				popupbase.add(new qx.ui.mobile.embed.Html("<br>")); // spacer
				detailButtons.add(new qx.ui.mobile.embed.Html("&nbsp;&nbsp;"), {flex:1});
				detailButtons.add(morebutton, {flex:0});
				detailButtons.add(new qx.ui.mobile.embed.Html("&nbsp;&nbsp;"), {flex:1});
				detailButtons.add(closebutton, {flex:0});
				detailButtons.add(new qx.ui.mobile.embed.Html("&nbsp;&nbsp;"), {flex:1});
				detailButtons.addCssClass("setCenter");
				popupbase.add(detailButtons);

				/* all interesting, but just needed "margin: 0px auto;" in the CSS to center the button... "text-align: center;" to center text
					buttonholder.getContainerElement().setAttribute("align", "center");
					buttonholder.getContainerElement().setAttribute("width", "100%");
					morebutton.getContentElement().setAttribute("width", "70px");
					morebutton.getContentElement().firstChild.setAttribute("width", "70px");
					morebutton.getContentElement().firstChild.setAttribute("class", "mysmall boxPackCenter");
				*/

				document.detailPopup = new qx.ui.mobile.dialog.Popup(popupbase);
			//==================================================================================


			//this.__pageTitle.setValue("iArtNorfolk: Map");
			
			
			// replace map button with list
			this.__mainButton.setValue("List");
			this.__mainButtonAction = "List";
			
			
			// add a container for the map
			var mapContainer = this.__mapContainer = new qx.ui.mobile.page.NavigationPage();//qx.ui.mobile.container.Composite();			
			//mapContainer.setLayout(new qx.ui.mobile.layout.HBox());
			
			
			//var myEmbedHtml = this.__myEmbedHtml = new qx.ui.mobile.embed.Html();
			
			//mapContainer.add(myEmbedHtml);
			
			
			this.getContent().add(mapContainer);
			// reset the height of the mapcontainer - because it defaults to the full height and we want it lower than that
			// sh/could set by subtracting the height of the menu... but this is ok for now
			mapContainer.getContainerElement().style.height = ((mapContainer.getContainerElement().style.height + "").replace("px", "") - 75) + "px";

			this._alreadyInitedPins = false;
			this._initMap();
			this._findMe();
			
			if (!this._alreadyInitedPins)
			{
		    	this._refresh(this._myLocationLatLng); 
		    }
		},
		
		
		_clearMarkers : function() {
			var moralcount = this._markers.length;
		    for(var i=0; i < moralcount; i++) {
		        this._markers[i].setMap(null);
		    }
		    this._markers = [];
		},
	
    _calcDistance : function(mural) {
      var request = {
        origin:this._myLocationLatLng, 
        destination: new google.maps.LatLng(mural.geometry.coordinates[1], mural.geometry.coordinates[0]),
        travelMode: google.maps.DirectionsTravelMode.WALKING
      };
      
      this._directionsService.route(request, function(result, status) {        
        if (status == google.maps.DirectionsStatus.OK) {
          alert('You are ' + result.routes[0].legs[0].distance.text + ' away.');
        }
      });
    },
	
		_addMarker : function(mural) {
		    var latLng = new google.maps.LatLng(mural.geometry.coordinates[1], mural.geometry.coordinates[0]);
		    var marker = new google.maps.Marker({
		        map: this._map,
		        position: latLng,
		        icon: this._muralIcon
		    });
		    this._markers.push(marker);

		    google.maps.event.addListener(marker, "click", function() {
	    
				var bubbleHtml = '';
				bubbleHtml += '<div class="info-background"><center>'
				bubbleHtml += '<strong>'+mural.properties.title+'</strong><br />';
				bubbleHtml += '<img class="thumbnail" src="'+mural.properties.imgs[0]+'" /><br style="clear:both" />';
				bubbleHtml += '</center></div>'

				document.detailThumbHtmlBlob.setHtml(bubbleHtml);
				document.theDetailId = mural.properties._id; //this.id;
				document.detailPopup.show();
		        
		    });
		},
    
		_refresh : function(latLng) {
			// this.debug("Loading Items... " + latLng);
		
		    // Figure out the bounding box for the query
		    var f = 0.015;
		    latLng = latLng || this._lastSearchLatLng || this._map.getCenter();
		    var bbox = {
		    	'minx': (latLng.lng()-f),
	            'miny': (latLng.lat()-f),
	            'maxx': (latLng.lng()+f),
	            'maxy': (latLng.lat()+f)
		    };

		    this._lastSearchLatLng = latLng;

			// document.body.a2 = this;
			// console.log(this);
			
			var $result = undefined;
			
		    // get the art data
		    $.ajax({
		        url: this._dataLoadUrl,
		        crossDomain: true,
		        dataType: 'json',
		        async: false, /* so can access functions/etc */
		        success: function (data, textStatus, jqXHR) {
		        	$result = data;
		        },
		        error: function(xhr, status, error) {
		            console.log('server-side failure with status code ' + status);
		        }
		    });
		    
	        if ($result != undefined)
	        {
				// console.log("got data: " + $result);
				// console.log("got data features: " + $result.features);

	            document.murals = $result.features;
	            
	            // Structure the data a bit
	            $.each(document.murals, function(i, mural){
					//console.log("working on each: ");	console.log(mural);
					document.mapMuralProperties(mural.properties);
	            });
				//console.log(_murals);
	            // Sort the murals from closest to farthest
	            function compareDist(a, b) { return  a.properties.distance - b.properties.distance; }
	            document.murals.sort(compareDist);
	            
	            // Only keep the closest 10
	            document.murals = document.murals.slice(0,50);
	            
	            // Update the map markers and the listing page
	            this._refreshMarkers();
	        }
		},
		
		_refreshMarkers : function(){
				this._clearMarkers();

				// console.log("refreshMarkers: " + document.murals);	

				// Add points to the map
				var moralcount = document.murals.length;
				for(var i=0; i < moralcount; i++) {	
					var mural = document.murals[i];
				    if(mural && mural.geometry) {
				        this._addMarker(mural);
				    }            
				};
			},
			
		_findMe : function() {
		  
		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition( function(position) {
		            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		            
		            //Clear the marker if it exists
		            if(this._myLocationMarker) {
		              this._myLocationMarker.setMap(null);
		            }
		            
		            
		            this._myLocationLatLng = latLng;
		            
		            //Add a marker on my current location
		            this._myLocationMarker = new google.maps.Marker({
		                map: this._map,
		                position: this._myLocationLatLng,
		                icon: this._locationIcon
		            });

		            this._map.setCenter(this._myLocationLatLng); 
		            this._refresh(this._myLocationLatLng);                   
		       		this._alreadyInitedPins = true;
		        }, 
		        function(msg){
console.log('We couldn\'t locate your position.'); 
		        },
		        { enableHighAccuracy: true, maximumAge: 90000 });
		    } 
		},
    
	
    	_initMap : function() {	
    	//console.log("in initMap...");
		    this._map = new google.maps.Map(this.__mapContainer.getContentElement(), this._mapOptions);
 		//console.log("Tried to set this._map: " + this._map);
 
		    var mapType = new google.maps.StyledMapType(this._mapTypeDef, { name: this._mapTypeName});
   
		    this._map.mapTypes.set(this._mapTypeName, mapType);
		    this._map.setMapTypeId(this._mapTypeName); 

		    google.maps.event.addListener(this._map, 'dragend', function() {
		       	this._refresh(this._map.getCenter()); 
		    });
		    
    	} /* end _initMap */
    	
	} /* end members */
	
});
	



