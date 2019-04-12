// # = ID
// . = class
// [type=XX] = type
// [name=XX]? = name
// Comments testing


//initialize counter. q: current question, qMax: total question count
var q = 1, qMax = 0;

//active click funtions once whole page finishes loading
$(document).ready(function() {

	console.log( "ready!" ); //homepage loads successfully

	qMax = $('#myForm div.group').length;
    $('#myForm div.group').hide();
    $('#myForm div.group:nth-child(1)').show();

    //calling handClick when clicking "next" button
    $('#btnNext').on('click', function (event) {
        event.preventDefault();
        handleClick();
    });
    
    //calling handClickPrevious when clicking "previous" button
    $('#btnPrevious').on('click', function (event) {
        event.preventDefault();
        handleClickPrevious();
    });

});

// Another comment


//handling next button and submission

function handleClick() {
    if (q < qMax) {
        $('#myForm div.group:nth-child(' + q + ')').hide();
        $('#myForm div.group:nth-child(' + (q + 1) + ')').show();
        if (q == (qMax - 1)) {
            $('#btnNext').html('Submit Answers');
		}
        q++;
    } else {
		
		// get value of all input fields needed 
		// store into variables
		var marital_status = $('#marital-status').val();
		var vol_child = $('#vol-child').val();
		var age_child = $('#age-child').val();
		var household_size = $('#household-size').val();
		var estimated_income = $('#estimated-income').val();
		var asset_value = $('#asset').val();
		var housing_status = $('#housing-status').val();
		var disability = $('#disability').val();
		
		//add review before submiting
		alert(
			'Submitting\n'+
			'Marital Status : ' + marital_status + '\n' +
			'Number of Children : ' + vol_child + '\n' +
			'Age of Youngest Child : ' + age_child + '\n' +
			'Household Size : ' + household_size + '\n' +
			'Estimated Monthly Income : ' + estimated_income + '\n' +
			'Asset Value : ' + asset_value + '\n' +
			'Housing Status : ' + housing_status + '\n' +
			'Disability : ' + disability
		); 
		

		//Get SNAP value
		var snap_val = snap(estimated_income, household_size);

	
   // Print Snap Value 
   $('#snap_result').text(parseInt(snap_val));

   // Get HIP value
   var hip_val =  hip(snap_val, household_size);

   //Get WIC value
   var wic_val = wic(estimated_income, household_size, age_child)
  //Print WIC value 
   $('#wic_result').text("WIC : " + wic_val);


  // Get MRVP value 
   var mrvp_val = rental_voucher(estimated_income, household_size, vol_child);
  // Print MRVP value 
   $('#mrvp_result').text(parseInt(mrvp_val));

    

		
		
		return false;

    }
}

//handling "previous" button

function handleClickPrevious() {
    if ((q <= qMax) && (q > 1)) {
        $('#myForm div.group:nth-child(' + q + ')').hide();
        $('#myForm div.group:nth-child(' + (q - 1) + ')').show();
    } 
	q--;
	if (q < qMax) {
		$('#btnNext').html('Next');
	}
}
		

function earned_income(marital_status, vol_child, estimated_income){

	var add = (parseInt(vol_child) + parseInt(estimated_income))
	return add;

}


//SNAP FUNCTION CALCULATION

function snap(estimated_income, household_size){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	var snap_val = 0;
	var snap_Max = ["192",	"352",	"504",	"640",	"760",	"913",	"1009",	"1153",	"1297",	"1441",];
	var IncomeArray = ["2023","2743","3463","4183","4903","5623","6343","7603","8347","9091"];
	var HouseholdMax = 10;
    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) ==i) {
        	if(parseInt(estimated_income)<=parseInt(IncomeArray[i])){
        		snap_val=snap_Max[i];
        	}
        }
    }
    return snap_val;
}

function hip(snap_val, household_size){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	parseInt(snap_val);
	parseInt(household_size);
	var hip_value = 0;
	array_loc = Math.round(household_size/2);
	var hip_array = [40,60,80]
	if (snap_val>0){
		hip_value = hip_array[array_loc];
		}	
    return hip_value;
}

//WIC FUNCTION CALCULATION

function wic(estimated_income, household_size, age_child){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	var Snap_val = 0;
	var IncomeArray = ["1872","2538","3204","3870","4536","5202","5868","6534","7200","7866"];
	var HouseholdMax = 10;
    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) == i) {
        	if(parseInt(estimated_income) <= parseInt(IncomeArray[i])){
				if(age_child == "0-1")
				{
					Snap_val = "You qualify for both infant and mother food package."
				}
				if(age_child == "2-4")
				{
					Snap_val = "You qualify for child food package."
				}
				if(age_child == "Expecting in 4 Months")
				{
					Snap_val = "You qualify for mother food package."
				}
        	}

        }
    }
    return Snap_val
}

function rental_voucher(estimated_income, household_size, vol_child){

	var voucher = 
[['v1',	805,	760,	715,	670,	625,	580,	535,	490,	445,	400,	355,	310,	300,	300,	300,	300,	300,	300,	300],
['v2',	944,	899,	854,	809,	764,	719,	674,	629,	584,	539,	494,	449,	404,	359,	333,	313,	300,	300,	300],
['v3',	1147,	1102,	1057,	1012,	967,	922,	877,	832,	787,	742,	697,	652,	607,	562,	517,	472,	427,	300,	367],
['v4',	1342,	1297,	1252,	1207,	1162,	1117,	1072,	1027,	982,	937,	892,	847,	802,	757,	712,	667,	622,	577,	532],
['v5',	1571,	1526,	1481,	1436,	1391,	1346,	1301,	1256,	1211,	1166,	1121,	1076,	1031,	986,	941,	896,	851,	806,	761],
['v6',	1807,	1755,	1703,	1651,	1600,	1548,	1496,	1444,	1393,	1341,	1289,	1237,	1186,	1134,	1082,	1030,	979,	927,	875],
['v7',	2042,	1984,	1925,	1867,	1808,	1750,	1691,	1633,	1574,	1516,	1457,	1399,	1340,	1282,	1223,	1165,	1106,	1048,	989],
['v8',	2278,	2213,	2147,	2082,	2017,	1952,	1886,	1821,	1756,	1691,	1625,	1560,	1495,	1430,	1364,	1299,	1234,	1169,	1103]]

	// Convert all inputs into integers for use in calculations later on
	estimated_income = parseInt(estimated_income);
	household_size = parseInt(household_size);
	vol_child = parseInt(vol_child);



	// Variable definitions

	// set voucher size = 0. To be changed and returned.
	var voucher_size;
	// Variable to define numner of rooms
	var vol_room = 0;
	// Variable to ingest income max values for coomparative to inputted income. 
	var IncomeArray = ["125", "250",	"375",	"500",	"625",	"750",	"875",	"1000",	"1125",	"1250",	"1375",	"1500",	"1625",	"1750",	"1875",	"2000",	"2125",	"2250",	"2375",	"2500",	"2625",	"2750"	];
	
	// Maximum size of household. 
	var HouseholdMax = 8;
    

    // Estimating the size of an apartment using the following rules:
    // - - - 2 children in each room.
    // - - - 2 adults in each room. 
    // - - - Rounding up.
    // - - - Note: doesn't take into account all variables and rules. Might need more info to 
    // be accurate.

	if(vol_child>0){
		vol_room = (household_size-vol_child)/2 + Math.round(vol_child/2);
		vol_room = Math.round(vol_room);
	}
	else{
		vol_room = Math.round(household_size/2); 
	}
	// Use vol_room to figure out which vn array to use.
	// var v_array = vol_room.toString();

	// Concat v_array to string to call the right array. 
	// v_array = "v"+v_array;

		//  ArrayLocation used to find the position of the voucher size in a given vn array.
	var ArrayLoc = (estimated_income/125);

	// Determine voucher size by doing a lookup. 
	// voucher_size = parseInt(v_array[ArrayLoc]);
	voucher_size = voucher[vol_room-1][ArrayLoc];
	console.log(estimated_income);
	console.log(ArrayLoc);
	console.log(vol_room);
	console.log(voucher_size);

    
    return voucher_size
}

