/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(iartnorfolk/*)
#asset(qx/mobile/icon/${qx.mobile.platform}/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "iArtNorfolk"
 */
qx.Class.define("iartnorfolk.Application",
{
	extend : qx.application.Mobile,

	/*
	*****************************************************************************
	 MEMBERS
	*****************************************************************************
	*/

	members :
	{
			
		/**
		 * This method contains the initial application code and gets called 
		 * during startup of the application
		 */
		main : function()
		{
			// Call super class
			this.base(arguments);

document.body.a1 = this;
			//==============================================================
			// used multiple places - maybe implement a separate Helper class - instantiate it here - setting the instance into document
		        document.mapMuralProperties = function(m) {
					m.interalId = m.assetId || m.accession_id;
					delete m.assetId;				

					m.title = m.Title || m.title;
					delete m.Title;
				
					//console.log("m.title: " + m.title);						
					//console.log("m.Image: " + m.Image);						

					m.imgs = [];
					m.imgs.push(m.Image);
				}
			//==============================================================
            

			document.__prevPage = null

			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug"))
			{
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			/*
			-------------------------------------------------------------------------
				Below is your actual application code...
				Remove or edit the following code to create your application.
			-------------------------------------------------------------------------
			*/

			this._pageForwarder = function(evt)
			{
document.body.a2 = evt;			
				switch(evt.getData().button){
					case "Map":
						document.mapPage.show();
					break;

					case "List":			
						 document.listPage.show();
					break;

					case "Share":
						document.sharePage.show();	
					break;

					case "Settings":
						document.settingsPage.show();	
					break;

					// test...
					//case "Detail":				
					//	 document.detailPage.show();
					//break;

					default:
						return;
					break;
				}
				document.__prevPage = evt.getData().from;
			}

			this._backButtonHandler = function() {
			
				if (document.__prevPage != null)
				{
					document.__prevPage.show({reverse:true});
				}
				document.__prevPage = null;
			}

			document.mapPage = new iartnorfolk.page.Map();
			document.mapPage.addListener("eventNavigationButtonClicked", this._pageForwarder, this);

			document.listPage = new iartnorfolk.page.List();
			document.listPage.addListener("eventNavigationButtonClicked", this._pageForwarder, this);
			
			document.sharePage = new iartnorfolk.page.Share();
			document.sharePage.addListener("eventNavigationButtonClicked", this._pageForwarder, this);
			
			document.settingsPage = new iartnorfolk.page.Settings();
			document.settingsPage.addListener("eventNavigationButtonClicked", this._pageForwarder, this);

			document.detailPage = new iartnorfolk.page.Detail();
			document.detailPage.addListener("back", this._backButtonHandler, this);
			document.detailPage.addListener("eventNavigationButtonClicked", this._pageForwarder, this);
/*
//alert("testing audio on detail page");
					document.__prevPage = document.mapPage; // so the user can go back to this
					document.detailPage.show({animation:"fade"}); // have to show before refresh, because some things may need to be init'd the first time
					document.detailPage._refreshDetail("lng-76.29283100366592lat36.8450939502083");
*/

				// the main page...
				document.mapPage.show(); 
	
// TODO: Use settings to decide if should go to map/list first
				// actually have to go to map page first so it can init + get data from the server
				// - move init stuff into the app instead so user can decide which to show first
				 //document.listPage.show();
		}
	}
});
