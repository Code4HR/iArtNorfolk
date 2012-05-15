qx.Class.define("iartnorfolk.page.iArtShell",
{
	extend : qx.ui.mobile.page.NavigationPage,

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
		_initialize : function() {
			this.base(arguments);

			this.remove(this._getNavigationBar()); // remove this - will create my own

			// =================================================================================================

			var navBar = this.__navBar = new qx.ui.mobile.navigationbar.NavigationBar();
			this.getContent().add(this.__navBar);
			
			var button = this.__mainButton = new qx.ui.mobile.navigationbar.Button("Map");
			this.__mainButtonAction = "Map";
			button.addListener("tap", function() {
				this.fireDataEvent("eventNavigationButtonClicked", {from:this, button:this.__mainButtonAction});
			}, this);
			navBar.add(button, {flex:0});
			
			var button = this.__shareButton = new qx.ui.mobile.navigationbar.Button("Share");
			this.__shareButtonAction = "Share";
			button.addListener("tap", function() {
				this.fireDataEvent("eventNavigationButtonClicked", {from:this, button:this.__shareButtonAction});
			}, this);
			navBar.add(button, {flex:0});
			
			var title = this.__pageTitle = new qx.ui.mobile.navigationbar.Title("iArtNorfolk");
 			navBar.add(title, {flex:1});
			
			var button = this.__findMeButton = new qx.ui.mobile.navigationbar.Button("Find Me");
			this.__findMeButtonAction = "FindMe";
			button.addListener("tap", function() {
				this.fireDataEvent("eventNavigationButtonClicked", {from:this, button:this.__findMeButtonAction});
			}, this);
			navBar.add(button, {flex:0});
			
			var button = this.__settingsButton = new qx.ui.mobile.navigationbar.Button("Settings");
			this.__settingsButtonAction = "Settings";
			button.addListener("tap", function() {
				this.fireDataEvent("eventNavigationButtonClicked", {from:this, button:this.__settingsButtonAction});
			}, this);
			navBar.add(button, {flex:0});
		}
	},
	  
  /*
  *****************************************************************************
     EVENTS - only needed if fireDataEvent is used (not needed to listen - I think)
  *****************************************************************************
  */

	events : {
		"eventNavigationButtonClicked" : "qx.event.type.Data" // Define the event
	}
});
	

