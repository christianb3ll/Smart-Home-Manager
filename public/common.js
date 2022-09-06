let deviceSelect = document.getElementById('device-select');

// show values for range sliders
showValue = function(slider){
	let sliderValue = document.getElementById(slider);
	let valueCount = slider + '-value';

	document.getElementById(valueCount).innerHTML = sliderValue.value;
}

// returns a list of applicable fields for a given device
getFields = function(device){
	switch(device) {
	  	case 'Microwave':
	    case 'Kettle':
	    case 'Coffee Maker':
	    case 'Clock':
	    case 'Roomba':
	    	return ['name','on','off','start-time']
	    	break;
	    case 'Oven':
	    	return ['name','on','off','start-time','end-time','temperature-oven']
	    	break;
	    case 'Light':
	    	return ['name','on','off','start-time','end-time','colour']
	    	break;
	    case 'Fridge':
	    	return ['name','on','off','temperature-fridge']
	    	break;
	    case 'Thermostat':
	    	return ['name','on','off','temperature-thermostat']
	    	break;
	    case 'TV':
	    	return ['name','on','off','channel','volume']
	    	break;
	    case 'Speakers':
	    	return ['name','on','off','volume']
	    	break;
	    case 'Air Conditioner':
	    	return ['name','on','off','start-time','end-time','temperature-aircon']
	    	break;
	    case 'Humidifier':
	    	return ['name','on','off','start-time','end-time','humidity']
	    	break;
	    case 'Bath Tub':
	    	return ['name','start-time','temperature-bath']
	    	break;
	    case 'Washing Machine':
	    	return ['name','on','off','start-time','wash-cycle']
	    	break;
	    case 'Gate':
	    case 'Shutters':
	    case 'Garage Door':
	    	return ['name','open','closed']
	    	break;
	    case 'Microwave':
	    case 'Security Camera':
	    case 'Motion Sensor':
	    	return ['name','on','off','start-time','end-time']
	    	break;
	  	default:
	  		// If device not found, return empty list
	    	return [];
	}
}

// Hide all the form fields
hideAllFields = function(){
	formFields = document.getElementById('form-toggle').querySelectorAll('.form-group');
	for(var i =0; i < formFields.length; i++){
		formFields[i].classList.add("d-none");
	}
}

// disable all form fields
function disableAllFields(){
	let elements = document.forms['add-device'].elements;
  	
  	for (var i=1; i < elements.length-1; i++){
    		elements[i].disabled = true;
  	}
}

// enable fields from a given list
function enableFields(fields){
	for(var i = 0; i < fields.length; i++){
		let param = document.getElementById(fields[i]);
		param.disabled = false;
	}
}

// show fields from a given list
function showFields(fields){
	for(var i = 0; i < fields.length; i++){
		let param = document.getElementById(fields[i]);
		let formGroup = param.closest('.form-group');
		formGroup.classList.remove('d-none');
	}
}

if(deviceSelect){
	deviceSelect.onchange = function(){
		formToggle = document.getElementById('form-toggle');
		formToggle.classList.remove('d-none');

		// Hide and disable all fields on device change
		hideAllFields();
		disableAllFields();

		let fields = getFields(deviceSelect.value);

		enableFields(fields);
		showFields(fields);
	};
}