// # = ID
// . = class
// [type=XX] = type
// [name=XX]? = name
// Comments testing


//initialize counter. q: current question, qMax: total question count
var q = 1, qMax = 0, index =0;

// A persistent unique id for the user.
var uid = getUniqueId();

// Get domain name
var domain_name = window.location.hostname;
console.log("domain name is:" + domain_name)

// Record the timestamp
var dt_before = new Date();
var secondstamp_before = Math.floor(Date.now() / 1000);
var timestamp_before = dt_before.toUTCString();
console.log("before:" + timestamp_before);

// Hide the feedback page
$('#feedback').hide();

//active click funtions once whole page finishes loading
$(document).ready(function() {

	console.log( "ready!" ); //homepage loads successfully

	qMax = $('#myForm div.group').length;
    $('#myForm div.group').hide();
    $('#myForm div.group:nth-child(1)').show();

    //calling handClick when clicking "next" button
    $('#btnNext').on('click', function (event) {
		var $bar = $(".ProgressBar");
		if ($bar.children(".is-current").length >0) {
		$bar.children(".is-current").removeClass("is-current").addClass("is-complete").next().addClass("is-current");
		} else {
		$bar.children().first().addClass("is-current");
		}
		event.preventDefault();
        handleClick();
    });
    
    //calling handClickPrevious when clicking "previous" button
    $('#btnPrevious').on('click', function (event) {
		
		// Button slider
		var $bar = $(".ProgressBar");
		if ($bar.children(".is-current").length > 0) {
		$bar.children(".is-current").removeClass("is-current").prev().removeClass("is-complete").addClass("is-current");
		} else {
		$bar.children(".is-complete").last().removeClass("is-complete").addClass("is-current");
		}
		event.preventDefault();
        handleClickPrevious();
	});
 });

//handling next button and submission

function handleClick() {
	  //console.log("q:" + q + " qmax:" + qMax)
		// LOCATION FOR NULL VALUE WARNING 
		//validateForm(q)
		//https://www.w3schools.com/js/js_validation.asp
		if (q < qMax) {
        $('#myForm div.group:nth-child(' + q + ')').hide();
        $('#myForm div.group:nth-child(' + (q + 1) + ')').show();
	
		if (q == (qMax - 1)) {
            $('#btnNext').html('Find Out Your Benefits！');
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
		
		if (marital_status==null || vol_child==null || age_child==null || household_size==null || estimated_income==null || asset_value==null || housing_status==null || disability==null){
		alert("Please answer all questions");		
		}
		else { 
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
		var snap_high_bound = parseInt(snap_val.high_bound);
		var snap_low_bound = parseInt(snap_val.low_bound);
		if (snap_high_bound!= 0){
		$('#snap_result').text("Food Benefits (SNAP): Your potential benefit range is between: $" + parseInt(snap_low_bound) + " and $" + parseInt(snap_high_bound)); 
		}

		// Get HIP value
		var hip_val =  hip(snap_high_bound, household_size);
		hip_val = parseInt(hip_val);
		console.log(hip_val); 
		//PRINT HIP value
		if (hip_val!= 0 ){
		$('#hip_result').text("Health Food Program (HIP): Your potential benefit is $" + hip_val);
			}

		//Get WIC value
		var wic_val = wic(vol_child, estimated_income, household_size, age_child);
		//Print WIC value 
		if (wic_val != "Disqualified" ){
		$('#wic_result').text("Women, Infant & Children care (WIC): " + wic_val);
		}


		// Get MRVP value 
		var mrvp_val = rental_voucher(estimated_income, household_size, vol_child);
		
		// MRVP bounds
		var mrvp_high_bound = parseInt(mrvp_val.high_bound);
		var mrvp_low_bound = parseInt(mrvp_val.low_bound);

		if (mrvp_high_bound != 0){
		$('#mrvp_result').text("Rental Assistance (MRVP): Your potential voucher range is between: $" + parseInt(mrvp_low_bound) + " and $" + parseInt(mrvp_high_bound)); 
		}

		// Get TAFDC value 
		var tafdc_val = tafdc(estimated_income, household_size, age_child,  asset_value, housing_status);
		var tafdc_high_bound = parseInt(tafdc_val.tafdc_high_bound);
		var tafdc_low_bound = parseInt(tafdc_val.tafdc_low_bound);
		// Print TAFDC value 
		if (tafdc_high_bound != 0){
		$('#tafdc_result').text("Transitional Aid: (TAFDC) Your potential benefit range is between: $" + parseInt(tafdc_val.tafdc_low_bound) + " and $ " + parseInt(tafdc_val.tafdc_high_bound));
		}

		// Get MLIHEAP value 
		var mliheap_val = mliheap(estimated_income, household_size, housing_status);
		var mliheap_high_bound = parseInt(mliheap_val.mliheap_high_bound);
		var mliheap_low_bound = parseInt(mliheap_val.mliheap_low_bound);
		// Print MLIHEAP value
		if (mliheap_high_bound != 0 ){
		$('#mliheap_result').text("Energy & Heat (MLIHEAP): Your potential benefit range is between: $" + mliheap_low_bound + " and $ " + mliheap_high_bound);
		}

		// Get MEITC value 
		var meitc_val = meitc(marital_status, estimated_income, vol_child);
		// Print MEITC value 
		var meitc_high_bound = parseInt(meitc_val.meitc_high_bound);
		var meitc_low_bound = parseInt(meitc_val.meitc_low_bound);
		if (meitc_high_bound != 0 ){
			$('#meitc_result').text("Income Tax Credit (MEITC): You may be eligble for between: $" + parseInt(meitc_val.meitc_low_bound) + " and $ " + parseInt(meitc_val.meitc_high_bound));
		}	
		
		// Adding "total additional benefits" to be fed into the chart as "additional" value.
		var tab = parseInt(snap_high_bound) + parseInt(hip_val) + parseInt(mrvp_high_bound) + parseInt(tafdc_val.tafdc_high_bound) + parseInt(mliheap_val.mliheap_high_bound) + parseInt(meitc_val.meitc_high_bound); 
		
		// INCOME BAR GRAPH 
		console.log(tab)
		$('#chart').show();
		generate_chart(estimated_income, tab)

		$('#feedback').show();

		// Record timestamp after
		var dt_after = new Date();
		var secondstamp_after = Math.floor(Date.now() / 1000);
		var secondstamp_passed = secondstamp_after - secondstamp_before;
		var timestamp_after = dt_after.toUTCString();
		console.log("after:"+ timestamp_after);
		console.log("timepassed:"+ secondstamp_passed);
	

		//////Log to Google Form
		sendNetworkLog(
			uid,
			domain_name,
			timestamp_before,
			timestamp_after,
			secondstamp_passed,
			marital_status,
			vol_child,
			age_child,
			household_size,
			estimated_income,
			asset_value,
			housing_status,
			disability,
			snap_high_bound,
			snap_low_bound,
			hip_val,
			wic_val,
			mrvp_high_bound,
			mrvp_low_bound,
			tafdc_high_bound,
			tafdc_low_bound,
			mliheap_high_bound,
			mliheap_low_bound,
			meitc_high_bound,
			meitc_low_bound,
			tab)

			return false;
			}
	}
}

//handling "previous" button

function handleClickPrevious() {
	if ((q <= qMax) && (q > 1)) {
			$('#myForm div.group:nth-child(' + q + ')').hide();
			$('#myForm div.group:nth-child(' + (q - 1) + ')').show();
			$('#chart').show();

	} 
	
	q--;
	if (q < qMax-1) {
		$('#btnNext').html('Next');
	}
	if (q < qMax) {
		$('#chart').hide();
	}
}
	
function generate_chart(estimated_income, tab){
	estimated_income = parseInt(estimated_income);
	tab = parseInt(tab);
	var options = {
		chart: {
				height: 150,
				type: 'bar',
				stacked: true,
		},

		title: {
			text: "Estimated Monthly Income With Benefits",
			align: 'center',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize:  '16px',
				fontFamily: 'Futura',
				color:  '#263238'
			},
		},
		plotOptions: {
				bar: {
						horizontal: true,
				},
		},
		stroke: {
				width: 0,
				colors: ['#F7D198']
		},
		series: [{
			name: 'Current Income',
			// colors: ['#FF0000'],
			data: [estimated_income]
	},{
			name: 'Income from Benefits',
			// fill: ['#2F80ED'],
			// colors: ['#2F80ED'],
			data: [tab]
	}],
	colors: ['#B8B8B8', '#2F80ED'],

		xaxis: {
				categories: [""],
				labels: {
						formatter: function(val) {
								return val 
						}
				}
		},
		yaxis: {
				title: {
						text: undefined
				},	
		},
		tooltip: {
				y: {
						formatter: function(val) {
						return "$"+val	
				}
				}
		},
		legend: {
				position: 'top',
				horizontalAlign: 'left',
				offsetX: 40
			}

		
}

$("#chart").html("")
var chart = new ApexCharts(
		document.querySelector("#chart"),
		options
);
//chart.destroy();
	if(isNaN(estimated_income)){
		chart.destroy();
		return false;
	}
	else{
		console.log("Rendering")
		chart.render();
		return false;
    }
	}

function earned_income(marital_status, vol_child, estimated_income){
	var add = (parseInt(vol_child) + parseInt(estimated_income))
	return add;
}


//SNAP CALCULATION

function snap(estimated_income, household_size){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	var low_bound = 0; 
	var high_bound = 0;
	var snap_Max = ["15",  "192", "352",	"504",	"640",	"760",	"913",	"1009",	"1153",	"1297",	"1441",];
	var IncomeArray = ["2023","2743","3463","4183","4903","5623","6343","7603","8347","9091"];
	var HouseholdMax = 10;
    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) ==i) {
        	if(parseInt(estimated_income)<=parseInt(IncomeArray[i])){
				// Set high bound to equal to snap_Max array location.
				high_bound=snap_Max[i+1];
				low_bound=snap_Max[i];
				}
        	}
				}
				
	var income_adjustment = parseInt(estimated_income) * 0.3;
	
	low_bound = Math.round(low_bound - income_adjustment);

	if (low_bound < 15) //min level of SNAP benefit is 15
	{
		high_bound = 15;
	}
	
	
	high_bound = Math.round(high_bound - income_adjustment);
	
	if (high_bound < 15) //min level of SNAP benefit is 15. If high_bound does not reach 15, disqualify for SNAP
	{
		high_bound = 0;
		low_bound = 0;
	}

    return {
		low_bound: low_bound,
		high_bound: high_bound
	};
}

function hip(snap_val, household_size){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	parseInt(snap_val); // 760
	parseInt(household_size); // 5 
	var hip_value = 0;
	array_loc = Math.round(household_size/2);
	var hip_array = [40,60,80,80,80,80]
	if (snap_val>0){
		hip_value = hip_array[array_loc];
		}	
    return hip_value;
}

//WIC CALCULATION

function wic(vol_child, estimated_income, household_size, age_child){


	var IncomeArray = ["1872","2538","3204","3870","4536","5202","5868","6534","7200","7866"];
	var HouseholdMax = 10;

	var wic_val = "Disqualified";

	console.log("wic vol_child:" + vol_child);
	console.log("age_child:" + (age_child));

    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) == i) {
        	if(parseInt(estimated_income) <= parseInt(IncomeArray[i])){
				//console.log("vol_child:" + (vol_child));

				if(parseInt(vol_child) != 0){


				if(age_child == "0-1")
				{
					wic_val = "You qualify for both infant and mother food package."
				}
				if(age_child == "2-4")
				{
					wic_val = "You qualify for child food package."
				}
				if(age_child == "Expecting in 4 Months")
				{
					wic_val = "You qualify for mother food package."
				}
			}
        	}

        }
    }
    return wic_val
}

//MRVP CALCULATION FUNCTION

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

	console.log("MRVP vol_child:" + vol_child);



	// Variable definitions

	// set voucher size = 0. To be changed and returned.
	var high_bound;
	// set variable for lower bound of voucher range.
	var low_bound; 
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
	
	if (ArrayLoc <= 19){ //see if income range is within qualification
	// Upper bound for voucher amount.
	high_bound = voucher[vol_room-1][ArrayLoc];

	// Create lower bound for voucher amount. 
	// If current room size = 1, lower bound = 0. 

	if(vol_room < 2){
		low_bound = 1;
	}
	else {
		low_bound = voucher[vol_room-2][ArrayLoc];
	}
	}

	else{
		high_bound = 0;
		low_bound = 0;
	}

	var range = "Your potential MRVP range is between " + low_bound +" and "+ high_bound + "per month.";
	
	console.log(range);


	return {
		low_bound: low_bound,
		high_bound: high_bound
	};
	
}

//TAFDC CALCULATION
//Treating teen parent the same as adult parent for now, given the complexity

function tafdc(estimated_income, household_size, age_child, asset_value, housing_status){
	var tafdc_val = 0;
	var tafdc_min = 0;
	var tafdc_max = 0;
	var IncomeArray_privatehousing = [588,	691,	793,	891,	992,	1096,	1197,	1297,	1397,	1498];
	var tafdc_size_private = [1,388,	491,	593,	691,	792,	896,	997,	1097,	1197,	1298];
	var IncomeArray_publichousing = [628,	731,	833,	931,	1032,	1136,	1237,	1337,	1437,	1538];
	var tafdc_size_public = [1,428,	531,	633,	731,	832,	936,	1037,	1137,	1237,	1338];
	var HouseholdMax = 10;

	if ((asset_value == "Less then 5,000") && (age_child != "18+") && (age_child != "Not Applicable"))
	{
		//console.log("tafdc condition pass");

    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) == i) {

			//console.log(i + "tafdc array reached")

			if (housing_status == "Subsidized") {
				if (parseInt(estimated_income) <= IncomeArray_publichousing[i]){
						tafdc_min = tafdc_size_private[i];
						tafdc_max = tafdc_size_private[i+1];
					}
			}
			
			 else {			
					if (parseInt(estimated_income) <= IncomeArray_privatehousing[i]){
						tafdc_min = tafdc_size_private[i];
						tafdc_max = tafdc_size_public[i+1];
					}
			 }
			

        }
	  }
	}
	
	tafdc_val =
	{
		tafdc_low_bound: tafdc_min,
		tafdc_high_bound: tafdc_max
	}

	return tafdc_val	
}


//MLIHEAP FUNCTION CALCULATION
//Use 10 as max cap for hosuehold right now

function mliheap(estimated_income, household_size, housing_status){


	var mliheap_val = 0;
	var mliheap_min = 0;
	var mliheap_max = 0;

	var HouseholdMax = 10;

	var IncomeArray = [
	[1012,	1265,	1518,	1770,	2023,	2959],
	[1372,	1715,	2058,	2400,	2743,	3870],
	[1732,	2165,	2598,	3030,	3463,	4780],
	[2092,	2615,	3138,	3660,	4183,	5691],
	[2452,	3065,	3678,	4290,	4903,	6601],
	[2812,	3515,	4218,	4920,	5623,	7512],
	[3172,	3965,	4758,	5550,	6343,	7683],
	[3532,	4415,	5298,	6180,	7063,	7853],
	[3892,	4865,	5838,	6810,	7783,	8024],
	[4252,	5315,	6378,	7440,	8195,	8195]];

	var mliheap_unsubsidized = [1, 225, 191, 168, 148, 148, 116];
	var mliheap_subsidized = [1, 157, 138, 122,107,107,84];



    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) == i) {

			if (parseInt(estimated_income) <= IncomeArray[i][5]) {//if income meets the mean requirement(< maximum level), proceed in that array

			//console.log("mliheap qualified");

			var mliheaplevelcounter = 5; //set initial mliheap level counter

			
				for (var j = 4; j >= 0; j--) //loop through the array to find the level
				{
					if (parseInt(estimated_income) <= IncomeArray[i][j]){
						mliheaplevelcounter = j;
					}	
				}
			
				if (housing_status == "Subsidized") {

					mliheap_min = mliheap_subsidized[mliheaplevelcounter]
					mliheap_max = mliheap_subsidized[mliheaplevelcounter+1]

				}
				
				else {			
					console.log("mliheap unsub");
					
					mliheap_min = mliheap_subsidized[mliheaplevelcounter]
					mliheap_max = mliheap_subsidized[mliheaplevelcounter+1]
				
				}

			}	
		}
	}

	

	mliheap_val =
	{
		mliheap_low_bound: mliheap_min,
		mliheap_high_bound: mliheap_max
	}

	return mliheap_val	
}

//MEITC FUNCTION CALCULATION

function meitc(marital_status, estimated_income, vol_child){
	
	var meitc_val = 0;
	var meitc_min = 0;
	var meitc_max = 0;

	var incomearray_single = [
		[721, 1298],
		[1586, 3425],
		[1586, 3892],
		[1586, 4180]
	]

	var incomearray_married = [
		[1204, 1781],
		[2068, 3907],
		[2068, 4374],
		[2068, 4663]
	]

	var meitc_credit = [1,10,68,112,126]

	var child_counter = parseInt(vol_child);

	if (child_counter > 3) {
		child_counter = 3; //cap at three for child count
	} 

	if (marital_status == "Married"){

		if ((parseInt(estimated_income) > incomearray_married[child_counter][0]) &&
		(parseInt(estimated_income) < incomearray_married[child_counter][1])){

			meitc_min = meitc_credit[child_counter];
			meitc_max = meitc_credit[child_counter +1];
		
		}

	}
	else{
		if ((parseInt(estimated_income) > incomearray_single[child_counter][0]) &&
		(parseInt(estimated_income) < incomearray_single[child_counter][1])){

			meitc_min = meitc_credit[child_counter];
			meitc_max = meitc_credit[child_counter +1];
		
		}

	}

	meitc_val =
	{
		meitc_low_bound: meitc_min,
		meitc_high_bound: meitc_max
	}

	return meitc_val
	
}

/////////LOGGING//////

// Genrates or remembers a somewhat-unique ID with distilled user-agent info.
function getUniqueId() {
	if (!('uid' in localStorage)) {
	  var browser = findFirstString(navigator.userAgent, [
		'Seamonkey', 'Firefox', 'Chromium', 'Chrome', 'Safari', 'OPR', 'Opera',
		'Edge', 'MSIE', 'Blink', 'Webkit', 'Gecko', 'Trident', 'Mozilla']);
	  var os = findFirstString(navigator.userAgent, [
		'Android', 'iOS', 'Symbian', 'Blackberry', 'Windows Phone', 'Windows',
		'OS X', 'Linux', 'iOS', 'CrOS']).replace(/ /g, '_');
	  var unique = ('' + Math.random()).substr(2);
	  localStorage['uid'] = os + '-' + browser + '-' + unique;
	}
	return localStorage['uid'];
  }


  function findFirstString(str, choices) {
	for (var j = 0; j < choices.length; j++) {
	  if (str.indexOf(choices[j]) >= 0) {
		return choices[j];
	  }
	}
	return '?';
  }
  

function sendNetworkLog(
    uid,
    domain_name,
		timestamp_before,
		timestamp_after,
		secondstamp_passed,
		marital_status,
		vol_child,
		age_child,
		household_size,
		estimated_income,
		asset_value,
		housing_status,
		disability,
		snap_high_bound,
		snap_low_bound,
		hip_val,
		wic_val,
		mrvp_high_bound,
		mrvp_low_bound,
		tafdc_high_bound,
		tafdc_low_bound,
		mliheap_high_bound,
		mliheap_low_bound,
		meitc_high_bound,
		meitc_low_bound,
		tab) {
  var formid = "e/1FAIpQLSdEwbpIjip3i6sooG23jF4sdFPlyhwmh_u9QAyBrYch2yOAkQ";
  var data = {
    "entry.1864552612": uid, //the answer entry id in Google form, use FB_LOAD_DATA
    "entry.2011124292": domain_name,
		"entry.152330822": timestamp_before,
		"entry.394377277": timestamp_after,
		"entry.406105465": secondstamp_passed,
		"entry.804565614": marital_status,
		"entry.881616199": vol_child,
		"entry.766169195": age_child,
		"entry.2106986342": household_size,
		"entry.1012897442": estimated_income,
		"entry.2009640771": asset_value,
		"entry.2081899504": housing_status,
		"entry.1705239387": disability,
		"entry.1161373471": snap_high_bound,
		"entry.1183432120": snap_low_bound,
		"entry.948802778": hip_val,
		"entry.1657386826": wic_val,
		"entry.1416898123": mrvp_high_bound,
		"entry.708177915": mrvp_low_bound,
		"entry.642337684": tafdc_high_bound,
		"entry.205208760": tafdc_low_bound,
		"entry.831462337": mliheap_high_bound,
		"entry.1017650847": mliheap_low_bound,
		"entry.592202520": meitc_high_bound,
		"entry.950706715": meitc_low_bound,
		"entry.101558754": tab,
  };

  console.log("UID is: " + uid);

  var params = [];
  for (key in data) {
    params.push(key + "=" + encodeURIComponent(data[key]));
  }
  // Submit the form using an image to avoid CORS warnings.
  (new Image).src = "https://docs.google.com/forms/d/" + formid +
     "/formResponse?" + params.join("&");
}

function findFirstString(str, choices) {
	for (var j = 0; j < choices.length; j++) {
	  if (str.indexOf(choices[j]) >= 0) {
		return choices[j];
	  }
	}
	return '?';
}


