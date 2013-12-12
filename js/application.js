/**
 * @class This class is used to hold important, application-wide variables and functions.
 * The application method holds the majority of the most important code, it is the control center of the application.
 * It holds application-wide variables and the actual contacts themselves are stored within an array in the Application class.
 */
function Application()
{

	//
	// Attributes
	//
	/** Name of the application */
	this.name = "Kontakt";
	/** The method by which names are sorted. firstname = "first, last", lastname = "last, first". */
	this.sortOn = "lastname";
	/** The number of contacts curently loaded. */
	this.contactsCount = 0;
	/** The contacts array holds all Contact object instances. */
	this.contacts = [];

	//
	// Function Declarations
	//
	this.newContact				= newContact;
	this.createContact		= createContact;
	this.editContact			= editContact;
	this.editMode					= editMode;
	this.loadLocal				= loadLocal;
	this.saveLocal				= saveLocal;
	this.deleteContact		= deleteContact;
	this.destroyContact		= destroyContact;
	this.formatField			= formatField;
	this.reorderContacts	= reorderContacts;
	this.buttonMode				= buttonMode;
	this.selectContact		= selectContact;
	this.search						= search;
	this.loadContacts			= loadContacts;
	this.saveContact			= saveContact;
	this.showDialog				= showDialog;
	this.log							= log;
	this.closeDialog			= closeDialog;
	this.updateOptions		= updateOptions;
	this.validateField		= validateField;

	function validateField(field, validation) {
		var	retVal = true;
		if (field !== "") {
			retVal = false;
			switch (validation)
			{
				case "email":
					if ((field.contains("@")) && (field.contains("."))) {
						retVal = true;
					}
					else {
						retVal = false;
						alert("Email address not valid, please correct and try again.");
					}
					break;
				case "phone":
					if (field.value.match(/^[0-9]+$/)) {
						retVal = true;
					}
					else {
						alert("Phone number not valid, please correct and try again.");
						retVal = false;
					}
					break;
				case "nonblank":
					if (field.value !== "") {
						retVal = true;
					}
					else {
						alert("First Name and Last Name cannot be blank!");
						retVal = false;
					}
					break;
			}
		}
		return retVal;
	}

	/**
	 * The saveLocal method saves stringified contact data to the local browser.
	 */
	function saveLocal() {
		application.log("Saving to local storage.");
		var contactCount = (application.contacts.length - 1);
		for (i=0;i<=contactCount;i++) {
			var contactName = "contact" + i;
			localStorage.setItem("count", i);
			localStorage.setItem(contactName, JSON.stringify(application.contacts[i]));
		}
	}

	/**
	 * The updateOptions method allows various options to be set.
	 */
	function updateOptions(value)
	{
		application.sortOn = value;
		application.reorderContacts();
	}

	/**
	 * The loadLocal loads stringified contact data from the local browser and parses it back into Contact objects.
	 */
	function loadLocal() {
		application.log("Loading from local storage.");
		var contactCount = localStorage.count;
		for (i=0;i<=contactCount;i++) {
			var contactName = "contact" + i;
			var contact = (JSON.parse(localStorage.getItem(contactName)));
			application.newContact(contact.firstname, contact.lastname, contact.group, contact.address, contact.postcode, contact.dateOfBirth, contact.mobileNo, contact.homeNo, contact.email, contact.twitter, contact.facebook, contact.google);
		}
	}

	/**
	 * The createContact method creates a new, blank contact, selects it, and edits it.
	 */
	function createContact() {
		application.log("Requested creation of a new contact.");
		// TODO: What if the user creates a new contact, but doesn't save it?

		application.newContact("New Contact", "", "", "", "", "", "", "", "", "", "", "");
		application.loadContacts();
		application.selectContact(0);
		application.editContact();
		detailHeaderTitle = document.getElementById("detailHeaderTitle");
		detailHeaderTitle.innerHTML="New Contact";
	}

	/**
	 * The newContact method creates a new contact using arguments passed to the method.
	 * @param {string} firstname The first name of the new contact.
	 * @param {string} lastname The last name of the new contact.
	 * @param {string} group The group of the contact.
	 * @param {string} postcode The contact's postcode. Also used to create the google map.
	 * @param {string} address The postal address of the new contact.
	 * @param {string} dateOfBirth The date on which the contact was born.
	 * @param {string} mobileNo The mobile telephone number of the new contact.
	 * @param {string} homeNo The home telephone number of the new contact.
	 * @param {string} facebook The facebook address for the contact
	 * @param {string} twitter The twitter address of the contact
	 * @param {string} google The Google Plus name of the contact
	 * @param {string} email The email address of the contact.
	 */
	function newContact(firstname, lastname,  group, address, postcode, dateOfBirth, mobileNo, homeNo, email, twitter, facebook, google) {
		application.contacts.push(new Contact(firstname, lastname,  group, address, postcode, dateOfBirth, mobileNo, homeNo, email, twitter, facebook, google));
		application.log("Pushing new contact to array at index " + (this.contacts.length - 1));
	}

	/**
	 * The editContact function edits the currently selected contact object.
	 */
	function editContact() {
		application.log("Edit requested on contact with ID " + application.currentContactId);
		application.buttonMode("edit");
		application.editMode();
	}

	/**
	 * editMode places all current contact data into input fields on the page for editing.
	 */
	function editMode() {
		application.log("Going into edit mode of contact with ID " + application.currentContactId);
		var contact = application.currentContact;

		nameContainer				.innerHTML=	'<input style="width: 50%;" id="inputFirstname"	type="text" value="' + contact.firstname	+ '">' +
			'<input style="width: 50%;" id="inputLastname"	type="text" value="' + contact.lastname	+ '">';

		switch (contact.group) {
			case "Educational":
				groupContainer			.innerHTML=
					'<select id="group" selected="Friend">' +
					'<option selected="selected" value="Educational">Educational</option>' +
					'<option value="Business">Business</option>' +
					'<option value="Friend">Friend</option>' +
					'<option value="Other">Other</option>' +
					'</select>';
				break;
			case "Business":
				groupContainer			.innerHTML=
					'<select id="group" selected="Friend">' +
					'<option value="Educational">Educational</option>' +
					'<option selected="selected" value="Business">Business</option>' +
					'<option value="Friend">Friend</option>' +
					'<option value="Other">Other</option>' +
					'</select>';
				break;
			case "Friend":
				groupContainer			.innerHTML=
					'<select id="group" selected="Friend">' +
					'<option value="Educational">Educational</option>' +
					'<option value="Business">Business</option>' +
					'<option selected="selected" value="Friend">Friend</option>' +
					'<option value="Other">Other</option>' +
					'</select>';
				break;
			case "Other":
				groupContainer			.innerHTML=
					'<select id="group" selected="Friend">' +
					'<option value="Educational">Educational</option>' +
					'<option value="Business">Business</option>' +
					'<option value="Friend">Friend</option>' +
					'<option selected="selected" value="Other">Other</option>' +
					'</select>';
				break;
			default:
				groupContainer			.innerHTML=
					'<select id="group" selected="Friend">' +
					'<option value="Educational">Educational</option>' +
					'<option value="Business">Business</option>' +
					'<option value="Friend">Friend</option>' +
					'<option value="Other">Other</option>' +
					'</select>';

		}

		addressContainer		.innerHTML='<textarea id="address" rows="2" style="width: 100%; resize: none;">' + contact.address + '</textarea>';
		postcodeContainer		.innerHTML='<input id="inputPostcode"			type="text"		value = "' + contact.postcode			+ '" </input>';
		dateOfBirthContainer.innerHTML='<input id="inputdateOfBirth"	type="date"		value = "' + contact.dateOfBirth	+ '" </input>';
		mobileNoContainer   .innerHTML='<input id="inputMobileNo"			type="tel"		value = "' + contact.mobileNo			+ '" </input>';
		homeContainer       .innerHTML='<input id="inputHomeNo"				type="tel"		value = "' + contact.homeNo				+ '" </input>';
		emailContainer      .innerHTML='<input id="inputEmail"				type="email"	value = "' + contact.email				+ '" </input>';
		twitterContainer		.innerHTML='<input id="inputTwitter"			type=""				value = "' + contact.twitter			+ '" </input>';
		facebookContainer   .innerHTML='<input id="inputFacebook"			type=""				value = "' + contact.facebook			+ '" </input>';
		googleContainer     .innerHTML='<input id="inputGoogle"				type=""				value = "' + contact.google				+ '" </input>';
	}

	/**
	 * The deleteContact method calls a dialog to ensure that you wish to delete a contact, if yes it calls destroyContact.
	 */
	function deleteContact() {
		application.log("Requested deletion of contact with ID " + application.currentContactId);
		deleteDialog = new Dialog("deleteDialog", "Are you sure?", "Are you sure that you want to delete this contact?", "YesNoCancel", destroyContact);
		application.showDialog(deleteDialog);
	}

	/**
	 * the destroyContact function is used to actually destroy a contact and remove it from the array.
	 */
	function destroyContact() {
		application.log("Destroying contact with id " + application.currentContactId);
		var contactId = application.currentContactId;
		var contact = application.currentContact;

		application.contacts.splice(contactId, 1);

		application.loadContacts();
		application.selectContact(application.contacts.length - 1);
	}

	/**
	 * the reorderContacts method sorts the array based on the variable stored in the "sortOn" attribute.
	 */
	function reorderContacts() {
		application.log("Sorting contacts array by " + application.sortOn);
		application.contacts.sort(function(a, b) {
			var textA, textB;
			switch (application.sortOn) {
				case "lastname":
					textA = a.lastname.toUpperCase();
					textB = b.lastname.toUpperCase();
					if (textA === textB) {
						textA = a.firstname.toUpperCase();
						textB = b.firstname.toUpperCase();
					}
					break;
				case "firstname":
					textA = a.firstname.toUpperCase();
					textB = b.firstname.toUpperCase();
					if (textA === textB) {
						textA = a.lastname.toUpperCase();
						textB = b.lastname.toUpperCase();
					}
					break;
			}
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
	}

	/**
	 * the formatField method is a helper method for formatting fields and returning them - i.e. email address to mailto link
	 * @param field The field to format
	 * @param {string} format What the field should be formatted as (i.e. email)
	 */
	function formatField(field, format) {
		switch (format)
		{
			case "email":
				var retVal = '<a href="mailto: ' + field + '">' + field + '</a>';
				break;
		}

		return retVal;
	}

	/**
	 * The selectContact() function selects an existing Contact object.
	 */
	function selectContact(contactId) {
		var contact = application.contacts[contactId];
		application.log	("Loading contact from contacts[" + contactId + "]...");

		// Make the current contact accessible to the global scope.
		application.currentContactId = contactId;
		application.currentContact = contact;

		application.buttonMode("normal");

		if(document.getElementsByClassName("selectedContact").length>0)
		{
			document.getElementsByClassName("selectedContact").item(0).className="contact";
		}

		nameContainer.innerHTML				=	contact.firstname + " " + contact.lastname;
		groupContainer.innerHTML			=	contact.group;
		addressContainer.innerHTML		=	contact.address;
		postcodeContainer.innerHTML		=	contact.postcode;
		dateOfBirthContainer.innerHTML=	contact.dateOfBirth;
		mobileNoContainer.innerHTML		=	contact.mobileNo;
		homeContainer.innerHTML				=	contact.homeNo;
		emailContainer.innerHTML			=	application.formatField(contact.email, "email");
		twitterContainer.innerHTML		=	contact.twitter;
		facebookContainer.innerHTML		=	contact.facebook;
		googleContainer.innerHTML			=	contact.google;

		var contactElement = "contact" + contactId;
		if (application.contactsCount >= 1) {
			selected = document.getElementById(contactElement);
			selected.className = "selectedContact";
		}
		detailHeaderTitle = document.getElementById("detailHeaderTitle");
		detailHeaderTitle.innerHTML = nameContainer.innerHTML;
		staticmap.src = contact.map;

	}

	/**
	 * the buttonMode function changes the buttons on the right hand side of the application
	 * @param {string} mode The mode to switch to. ("edit" or "normal")
	 */
	function buttonMode(mode) {
		application.log("Buttons mode switched to " + mode);
		switch (mode) {
			case "edit":
				buttonSpan.innerHTML=application.editModeButtons;
				break;
			case "normal":
				buttonSpan.innerHTML=application.normalModeButtons;
				break;
		}
	}

	/**
	 * The search() function searches the Contact array.
	 */
	function search() {
		// TODO: Implement search.
		alert("You called search!");
	}

	/**
	 * The loadContacts() function reorders the contact list and writes the list as html to the contact book.
	 */
	function loadContacts() {
		application.log("Application requested load of contacts array...");
		application.reorderContacts();

		contactList.innerHTML = "";

		var length = this.contacts.length;

		for (var i=0;i<length;i++)
		{
			if ((this.contacts[i].group == groupFilter.value) || (groupFilter.value == "All")) {
				contactList.innerHTML=contactList.innerHTML + "<div id=\"contact" + i + "\" class=\"contact\" value=\"" + i + "\" onClick=\"application.selectContact(this.getAttribute('value'))\">" + this.contacts[i].toast + "</div>";
				application.contactsCount++;
			}
		}
		application.log("Contacts array loaded.");
	}

	/**
	 * the saveContact function saves the edited contact's details to the object.
	 */
	function saveContact() {


		var contact = application.currentContact;
		var contactId = application.currentContactId;

		inputFirstname	= document.getElementById("inputFirstname");
		inputLastname		= document.getElementById("inputLastname");
		group						= document.getElementById("group");
		address					= document.getElementById("address");
		inputPostcode		= document.getElementById("inputPostcode");
		inputdateOfBirth= document.getElementById("inputdateOfBirth");
		inputMobileNo		= document.getElementById("inputMobileNo");
		inputHomeNo			= document.getElementById("inputHomeNo");
		inputEmail			= document.getElementById("inputEmail");
		inputFacebook		= document.getElementById("inputFacebook");
		inputTwitter		= document.getElementById("inputTwitter");
		inputGoogle			= document.getElementById("inputGoogle");

		var invalid;
		if (application.validateField(inputEmail.value, "email"))
		{
			contact.email				= inputEmail.value;
			invalid = invalid + "e";
		}
		if (application.validateField(inputFirstname.value, "nonblank"))
		{
			contact.firstname		= inputFirstname.value;
			invalid = invalid + "f";
		}
		if (application.validateField(inputLastname.value, "nonblank"))
		{
			contact.lastname		= inputLastname.value;
			invalid = invalid + "l";
		}
		contact.group				= group.value;
		contact.address			= address.value;
		contact.postcode		= inputPostcode.value;
		contact.dateOfBirth	= inputdateOfBirth.value;
		contact.mobileNo		= inputMobileNo.value;
		contact.homeNo			= inputHomeNo.value;
		contact.facebook		= inputFacebook.value;
		contact.twitter			= inputTwitter.value;
		contact.google			= inputGoogle.value;
		contact.map					= 'http://maps.google.com/maps/api/staticmap?scale=1&center=' + inputPostcode.value + '&zoom=14&size=430x280&maptype=hybrid&markers=size:normal|color:RED|label:C|' + inputPostcode.value + '&sensor=false';
		contact.toast				= '<span id="name">' + contact.firstname + ' ' + contact.lastname + '</span> <span id="title">' + contact.group + '</span>';
		application.buttonMode("normal");
		application.loadContacts();
		application.selectContact(contactId);
	}


	/**
	 * The showDialog() function calls the draw function of a Dialog object.
	 * @param {Dialog} dialogName the dialog object to draw
	 */
	function showDialog(dialogName) {
		// Call the draw function on the Dialog.
		return dialogName.draw();
	}

	/**
	 * the closeDialog method closes the specified dialog box with the response from the clicked button.
	 * @param {Dialog} dialog The dialog to close
	 * @param {string} response The response from the clicked button (i.e. "Ok", "Cancel")
	 */
	function closeDialog(dialog, response) {
		dialog.close(response);
	}

	// TODO: Implement options!

	this.moreButton = "<button id=\"moreButton\" onclick=\"application.showDialog(example)\" />";
	this.saveButton = "<button id=\"saveButton\" onclick=\"application.saveContact()\" />";
	this.deleteButton = "<button id=\"deleteButton\" onclick=\"application.deleteContact()\" />";
	this.editButton = "<button id=\"editButton\" onclick=\"application.editContact()\" />";
	this.editModeButtons = this.moreButton + this.deleteButton + this.saveButton;
	this.normalModeButtons = this.moreButton + this.editButton;

	function log(content) {
		/**
		 * The log method writes out the timestamp and application name to the console, plus the provided argument
		 * @param {string} content What message to write to the console
		 */
		console.log("[" + timer + "]" + " [" + this.name + "] " + content);
	}

	this.log("New application initialized!");
}
