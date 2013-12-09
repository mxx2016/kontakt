/**
 * @class The Contact object stores necessary details about each Contact. The Contact object has no functions. 
 * @param {string} firstname The first name of the contact.
 * @param {string} lastname The last name of the contact.
 * @param {string} group The group of the contact.
 * @param {string} postcode The contact's postcode. Also used to create the google map.
 * @param {string} address The postal address of the contact.
 * @param {string} dateOfBirth The date on which the contact was born.
 * @param {string} mobileNo The mobile telephone number of the contact.
 * @param {string} homeNo The home telephone number of the contact.
 * @param {string} facebook The facebook address for the contact
 * @param {string} twitter The twitter address of the contact
 * @param {string} google The Google Plus name of the contact
 * @param {string} email The email address of the contact.
 */
function Contact(firstname, lastname,  group, address, postcode, dateOfBirth, mobileNo, homeNo, email, twitter, facebook, google)
{
	// Get the various variables from the constructor and assign them to the new object.
	/** The first name of the contact. */
	this.firstname	= firstname;
	/** The last name of the contact.*/
	this.lastname		= lastname;
	/** The group of the contact.*/
	this.group			= group;
	/** The postal address of the contact.*/
	this.address		= address;
	/** The contact's postcode. Also used to create the google map.*/
	this.postcode		= postcode;
	/** The date on which the contact was born.*/
	this.dateOfBirth= dateOfBirth;
	/** The mobile telephone number of the contact.*/
	this.mobileNo		= mobileNo;
	/** The home telephone number of the contact.*/
	this.homeNo			= homeNo;
	/** The email address of the contact.*/
	this.email			= email;
	/** The twitter address of the contact*/
	this.twitter		= twitter;
	/** The facebook address for the contact*/
	this.facebook		= facebook;
	/** The Google Plus name of the contact*/
	this.google			= google;

	/** The toast is the small HTML element which shows the contact name and group in the contacts list.  */
	this.toast			= '<span id="name">' + this.firstname + ' ' + this.lastname + '</span> <span id="title">' + this.group + '</span>';
	/** The map is generated from the contacts postcode. */
	this.map			= 'http://maps.google.com/maps/api/staticmap?scale=2&center=' + this.postcode + '&zoom=14&size=430x280&maptype=hybrid&markers=size:normal|color:RED|label:C|' + this.postcode + '&sensor=false';

	// Write to the log informing us of the new contact.
	application.log("New Contact instance [" + this.firstname + " " + this.lastname + "] initialized!");
}
