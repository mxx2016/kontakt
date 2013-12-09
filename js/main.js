//
// Kontakt
// Written by B00256757
//
// Hand-coded in Vim.
//
// This work is licensed under the Creative Commons Attribution-ShareAlike 3.0
// Unported License. To view a copy of the license, visit:
// http://creativecommons.org/licenses/by-sa/3.0/
//

/** This function initialises the application. */
function init()
{
	timer = 0;
	setInterval(function(){timer++;},1);

	console.log("[" + timer + "] Initialising application...");
	// Instantialise the Application object
	application		= new Application();

	// Create required dialogs:
	verifyExit		= new Dialog("verifyExit",		"Exit",					"Are you sure you want to exit?",					"YesNoCancel");
	example			= new Dialog("example",			"Example Dialog Box",	"This is an example (placeholder) dialog box!",		"Ok");
	optionSortOrder = "<div>Sort Order: <select id=\"optionSortOrderBox\"><option value=\"firstname\">First, Last</option><option value=\"lastname\">Last, First</option></select></div>";
	optionDisplayOrder = "<div>Display Order: <select id=\"optionDisplayOrderBox\"><option value=\"firstname\">First, Last</option><option value=\"lastname\">Last, First</option></select></div>";
	optionsDialog = new Dialog("optionsDialog", "Options", optionSortOrder + optionDisplayOrder, "SaveCancel", application.updateOptions);

	// The overlay variable is the element with id "overlay", used for blacking out the screen during the display of Dialog objects.
	overlay=document.getElementById("overlay");

	// The dialog variable is the element with id "dialog", used for drawing the Dialog objects within.
	dialog=document.getElementById("dialog");
	application.log("Initialization complete!");

	// Temporarily disabled this in favour of localStorage.

	//  application.newContact("Alastair", "Campbell", "Educational", "4 Charteries Terrace", "DG2 7EN", "1993-10-07", "07825179019", "01387 266847", "chartax@gmail.com", "@Chartax_", "facebook", "google");
	//	application.newContact("Kirsty", "McDonald", "Educational", "", "", "1993-04-22", "", "", "", "", "", "");
	//	application.newContact("John", "Smith", "Educational", "", "", "1993-04-22", "", "", "", "", "", "");
	//	application.newContact("Kirsty", "Campbell", "Educational", "", "", "1993-04-22", "", "", "", "", "", "");


	timer = setInterval(function(){application.timer++;},1);

	application.buttonMode("normal");
	application.loadLocal();
	application.loadContacts();
	if (application.contactsCount >= 1) {
		application.selectContact(0);
	}

	start();
}

/** This function closes the loading screen. */
function start()
{
	overlay.className = "normal";
	dialog.className = "normal";
	dialog.innerHTML = "";
}

window.onbeforeunload = function() {
	application.saveLocal();
};

// When the window loads, initialise the JavaScript.
window.onload = init;
