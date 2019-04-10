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


function rental_voucher(estimated_income, household_size){
	//NEED TO UPDATE QUESTION TO INCLUDE MONTHLY INCOME NOT YEARLY & CONVERT TO INT
	var Snap_val = 0;
	var v1 =    ["805",	"760",	"715",	"670",	"625",	"580",	"535",	"490",	"445",	"400",	"355",	"310",	"300",	"300"];
	var v1 =	["944",	"899",	"854",	"809",	"764",	"719",	"674",	"629",	"584",	"539",	"494",	"449",	"404",	"359"];
	var v1 =	["1147", "1102", "1057", "1012", "967",	"922",	"877",	"832",	"787",	"742",	"697",	"652",	"607",	"562"];
	var v1 =	["1342", "1297", "1252", "1207", "1162", "1117",	"1072",	"1027",	"982",	"937",	"892",	"847",	"802",	"757"];
	var v1 =	["1571", "1526", "1481", "1436", "1391", "1346",	"1301",	"1256",	"1211",	"1166",	"1121",	"1076",	"1031",	"986"];
	var v1 =	["1807", "1755", "1703", "1651", "1600", "1548",	"1496",	"1444",	"1393",	"1341",	"1289",	"1237",	"1186",	"1134"];
	var v7 =	["2042",	"1984",	"1925",	"1867",	"1808",	"1750",	"1691",	"1633",	"1574",	"1516",	"1457",	"1399",	"1340",	"1282"];
	var v8 =	["2278",	"2213",	"2147",	"2082",	"2017",	"1952",	"1886",	"1821",	"1756",	"1691",	"1625",	"1560",	"1495",	"1430"];


	var Snap_Max = ["192",	"352",	"504",	"640",	"760",	"913",	"1009",	"1153",	"1297",	"1441",];
	var IncomeArray = ["2023","2743","3463","4183","4903","5623","6343","7603","8347","9091"];
	var HouseholdMax = 10;
    for (var i = 1; i < HouseholdMax; i++) {
        if(parseInt(household_size)==i) {
        	if(parseInt(estimated_income)<=parseInt(IncomeArray[i-1])){
        		Snap_val=Snap_Max[i-1];
        	}

        }
    }
    return rental_value

