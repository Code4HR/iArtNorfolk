qx.Class.define("iartnorfolk.page.Detail",
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
		
		// overridden
		_initialize : function() 
		{
			this.base(arguments);	
			
			// this.__pageTitle.setValue("iArtNorfolk: Detail");
			
			var button = new qx.ui.mobile.navigationbar.BackButton("Back");
			button.addListener("tap", function() {
				this.fireDataEvent("back", "Back");
			}, this);
			this.__navBar.addBefore(button, this.__mainButton, {flex:0}); // add an actual Back button in place of the main one
			
			this.remove(this.__mainButton); // or do something different with it

			// add our detail info-holder to this page
			document.detailHtmlBlob = new qx.ui.mobile.embed.Html();
			
			this.getContent().add(document.detailHtmlBlob);
		},
		
		_refreshDetail : function (id) 
		{
		    document.detailHtmlBlob.setHtml('Loading Detail...');
		    
		    var $url = document.mapPage._detailDataLoadUrl+id+''; 

			//console.log("Detail URL: " + $url);

			var $result = undefined;
			
		    $.ajax({
		       url: $url,
		        crossDomain: true,
		        dataType: 'json',
		        async: false, /* so can access functions/etc */
		        success: function (data, textStatus, jqXHR) {
		        	$result = data;
		            //console.log('got data: ' + $result);
		        },
		        error: function(xhr, status, error) {
		            console.log('server-side failure with status code ' + status);
		        }
		    });
		    
		    if ($result != undefined)
	        {
				var mural = $result;
				
				//console.log(mural)
				// Structure the data a bit
	            document.mapMuralProperties(mural.properties);
				//console.log(mural)
	            
	            var detailsHtml = '<div class="details_title">'+mural.properties.title+'</div>';
	    		var imageHtml = '';
	    		
	            // One way to deal with images... 
	            // but actually the details result places the actual large image at position 0 at this time!
	            // imgs[0] = thumbnail
	            // imgs[1] = large main image
	            // imgs[2-n] = secondary shots
	            if(mural.properties.imgs.length > 0) {
	            	/* the main image */
	                detailsHtml += (mural.properties.imgs[0] != "noimage.png") ? '<div class="details_image"><img src="'+mural.properties.imgs[0]+'" /></div>' : '';
	                /*
	                //  additional images
	                if(mural.properties.imgs.length > 1) {
	                    for(var i=2; i < mural.properties.imgs.length; i++) {
	                        imageHtml += '<img src="'+mural.properties.imgs[i]+'" />';
	                    }
	                }
	                */
	            }
	            detailsHtml += '<ul>';
	            // Dump everything else onto the page
	            $.each(mural.properties, function(i, n) {
	                // HACK - the following if could be done more gracefully
	                if(n != '' && i != 'title' && i != 'geometry' && i != 'id' && i != '_id' && i != '_rev' && i != 'imgs' && i != 'Image' && i != 'interalId' && i != 'Link') {
						var headr = '<span class="details_header"><span class="details_header_'+i+'">'+i+'</span></span>';
	                    var headrSeperator = '<span class="details_seperator"><span class="details_seperator_'+i+'">: </span></span>';
	                    detailsHtml += '<li>'+headr + headrSeperator + '<span class="details_info"><span class="details_info_">' + n+'</span></span></li>';
	                }
	            });
	            
				var headrSeperator = '<span class="details_seperator"><span class="details_seperator_Link">: </span></span>';
	            detailsHtml += '<li><span class="details_header"><span class="details_header_Link">Link</span></span>' + headrSeperator + '<span class="details_info"><span class="details_info_Link"><a href="'+mural.properties.Link+'"><span class="details_info_Link_text">'+mural.properties.title+'</span></a></span></span></span></li>';
				detailsHtml += '';
				
// TODO: Test audio				
//				detailsHtml += '<li><strong>Audio</strong>: <audio src="http://iartnorfolk.com/etones.mp3" preload="auto" /></li>';
	            detailsHtml += '</ul>';
				detailsHtml += '<ul>';
	            detailsHtml += imageHtml;
				detailsHtml += '</ul>';
	            detailsHtml = '<div class="details_wrapper">'+detailsHtml+'</div>';
	            
	          	document.detailHtmlBlob.setHtml(detailsHtml);
	      
	        }
		},
		
		//http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
		_calcDistance : function (point1, point2) 
		{
		    var R = 6371; // Radius of the earth in km
		    var dLat = (point2[0]-point1[0]).toRad();  // Javascript functions in radians
		    var dLon = (point2[1]-point1[1]).toRad(); 
		    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		            Math.cos(point1[0].toRad()) * Math.cos(point2[0].toRad()) * 
		            Math.sin(dLon/2) * Math.sin(dLon/2); 
		    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		    var d = R * c; // Distance in km
		    
		    return d;
		}
    
// override the findme button function?		
		
	}
	
});
	


