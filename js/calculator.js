// # = ID
// . = class
// [type=XX] = type
// [name=XX]? = name


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
		alert('Submitting'); 
		
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

		//SNAP
		var snap_val = snap(estimated_income, household_size);
		console.log(5 + 6);
		$('#result').text(parseInt(snap_val));
		return false;
		console.log(5 + 1);
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
	var Snap_val = 0;
	var Snap_Max = ["192",	"352",	"504",	"640",	"760",	"913",	"1009",	"1153",	"1297",	"1441",];
	var IncomeArray = ["2023","2743","3463","4183","4903","5623","6343","7603","8347","9091"];
	var HouseholdMax = 10;
    for (var i = 0; i < HouseholdMax; i++) {
        if(parseInt(household_size - 1) ==i) {
        	if(parseInt(estimated_income)<=parseInt(IncomeArray[i])){
        		Snap_val=Snap_Max[i];
        	}

        }
    }
    return Snap_val
}

