qx.Class.define("iartnorfolk.page.Share",
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
			this.__pageTitle.setValue("iArtNorfolk: Share");

			// repurpose this button
			this.__shareButtonAction = "List";
			this.__shareButton.setValue("List");

		}
// override the findme button function?		
		
	}
	
});
	

