qx.Class.define("iartnorfolk.page.List",
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
			
			// this.__pageTitle.setValue("iArtNorfolk: List");
			
			/*
			document.listPageItems = new qx.ui.mobile.container.Composite();			
			document.listPageItems.setLayout(new qx.ui.mobile.layout.VBox());
			*/
			
			document.listPageItems = this.__list = new qx.ui.mobile.list.List();

			document.listPageItems.setDelegate({
				configureItem : function(item, idx, row) {
					
					var mural = document.murals[idx];
				
					item.setTitle('<span class="list_page_item"><span class="list_page_item_header">' + mural.properties.title + '</span> <span class="list_page_item_Artists">by ' + mural.properties.Artists + '</span></span>');
					item.setImage(mural.properties.imgs[0]);
				}
			});
			
			document.listPageItems.addCssClass("showPointer");
			
			document.listPageItems.addListener("changeSelection", function(evt)
			{
				var idxSelected = evt.getData();
			
				var mural = document.murals[idxSelected];
			
				document.theDetailId = mural.properties._id;
			
				document.__prevPage = document.listPage; // so the user can go back to this
				document.detailPage.show({animation:"fade"}); // have to show before refresh, because some things may need to be init'd the first time
				document.detailPage._refreshDetail(document.theDetailId);
			});
			
			this.getContent().add(document.listPageItems);
			
			this._refreshDetailList();
			
		}, /* end _initialize */
		
		    
		_refreshDetailList : function() {		
			if (document.murals == undefined) // not set - let the map page load them up
			{	
				document.mapPage._refresh();	
			}
	
			if (document.murals == undefined) // still not set - leave
			{	
				return;
			}
		
			// isn't there a simple way to gen an array fill with indexes?
			// var simpleArray = new Array(document.murals.length).join('').split(); 
			var simpleArray = new Array();
			for (var i = document.murals.length; i != 0; i--)
			{
				simpleArray[i-1] = i-1;
			}
			
			// just pass in the indexes - will use those to look up the mural item
			document.listPageItems.setModel(new qx.data.Array(simpleArray)); 

		} /* end _refreshDetailList */
		
	} /* end members */
	
});
	


