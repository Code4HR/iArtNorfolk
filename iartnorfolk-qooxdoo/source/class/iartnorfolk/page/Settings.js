qx.Class.define("iartnorfolk.page.Settings",
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
		_initialize : function() {
			this.base(arguments);

			//
			this.__pageTitle.setValue("iArtNorfolk: Settings");

			this.remove(this.__findMeButton); // or do something different with it
			this.remove(this.__settingsButton);

		}
	}
	
});
	

