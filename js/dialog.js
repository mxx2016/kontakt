
/**
 * @class The Dialog class holds the necessary functions and attributes necessary to draw a dialog box and handle user interaction.
 */
function Dialog(name, title, detail, buttonString, action)
{
	/** What is the name of the dialog box? */
	this.name = name;

	/** The status holds whether or not the dialog box is open or closed. */
	this.status = "closed";

	/** Title of the Dialog box. */
	this.title = title;

	/** The detailed text of the Dialog box. */
	this.detail = detail;

	if (action != "undefined")
	{
		/** What to do when clicking "Ok" or "Save"?*/
		this.action = action;
	}

	/** Buttons available in the dialog box. Options are:</br>
	 * "Ok" - Displays a single "OK" button.</br>
	 * "OkCancel" - Displays an "OK" and a "Cancel" button.</br>
	 * "YesNo" - Displays a "Yes" and a "No" buttons</br>
	 * "YesNoCancel" - Displays a "Yes", "No" and "Cancel" button.</br>
	 */
	this.buttonString = buttonString;

	// Definitions for the various buttons available:
	this.buttonOk = "<button value=\"ok\" class=\"dialogButton\" id=\"dialogOk\" onclick=\"application.closeDialog(" + this.name +", 'ok')\">OK</button>";
	this.buttonYes = "<button value=\"yes\" class=\"dialogButton\" id=\"dialogYes\" onclick=\"application.closeDialog(" + this.name +", 'yes')\">Yes</button>";
	this.buttonNo = "<button value=\"no\" class=\"dialogButton\" id=\"dialogNo\" onclick=\"application.closeDialog(" + this.name +", 'no')\">No</button>";
	this.buttonCancel = "<button value=\"cancel\" class=\"dialogButton\" id=\"dialogCancel\" onclick=\"application.closeDialog(" + this.name +", 'cancel')\">Cancel</button>";
	this.buttonSave = "<button value=\"save\" class=\"dialogButton\" id=\"dialogSave\" onclick=\"application.closeDialog(" + this.name +", 'save')\">Save</button>";


	// The draw() function makes the Dialog display on the screen.
	this.draw = draw;
	/**
	 * Draw the dialog onto the screen.
	 */
	function draw() {
		// Handle the various options for the buttonString property.
		// If the buttonString is undefined or invalid, just act as if it is "Ok".
		switch (this.buttonString)
		{
			case "Ok":
				this.buttonContent=this.buttonOk;
				break;
			case "Save":
				this.buttonContent=this.buttonSave;
				break;
			case "SaveCancel":
				this.buttonContent=this.buttonSave + this.buttonCancel;
				break;
			case "OkCancel":
				this.buttonContent=this.buttonOk + this.buttonCancel;
				break;
			case "YesNo":
				this.buttonContent=this.buttonYes + this.buttonNo;
				break;
			case "YesNoCancel":
				this.buttonContent=this.buttonYes + this.buttonNo + this.buttonCancel;
				break;
			default:
				this.buttonContent=this.buttonOk;
				break;
		}
		/** The buttonArea is the whole div which holds the buttons defined by the buttons property. */
		this.buttonArea = "<div class=\"dialogButtons\">" + this.buttonContent + "</div>";
		/** the titleArea is the div which holds the Application.name and the title of the Dialog.*/
		this.titleArea = "<div class=\"dialogTitle\">" + application.name + " - " + this.title + "</div>";
		/** the detailArea is the div which holds the main text details of the Dialog box.*/
		this.detailArea = "<div class=\"dialogContent\">" + this.detail + "</div>";
		/** the dialogContent is the whole Dialog box in HTML. */
		this.dialogContent = this.titleArea + this.detailArea + this.buttonArea;

		// Set the overlay to "blackout" mode.
		overlay.className="blackout";
		// Then set the innerHTML of the dialog div to the dialogContent property.
		dialog.innerHTML=this.dialogContent;
		// and set the dialog mode to "dialog".
		dialog.className="dialog";
		// finally, set the dialog status to open
		this.status = "open";
		application.log(this.name + " dialog drawn.");

	}

	this.close = close;
	/**
	 * The close function hides the Dialog from the screen.
	 */
	function close(response) {
		if (this.status == "open") {

			switch (response) {
				case "yes":
					this.action();
					break;
				case "save":
					var sortOrder = optionSortOrderBox.value;
					this.action(sortOrder);
					break;
				case "no":
					break;
				case "cancel":
					break;
				case "ok":
					break;
			}

			// Set the overlay back to normal
			overlay.className="normal";
			// Set the dialog back to normal
			dialog.className="normal";
			// And get rid of the HTML content in it.
			dialog.innerHTML="";

			this.response = response;
			this.status = "closed";
			application.log(this.name + " dialog closed with response " + this.response);
		}

		else application.log("The dialog box " + this.title + " is not open!");


	}

	application.log("New Dialog instance [" + this.name + "] initialized!");
}
