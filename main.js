const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

const cheerio = require('cheerio')
//const $ = cheerio.load('<h2 class="title">Hello world</h2>')

//$('h2.title').text('Hello there!')
//$('h2').addClass('welcome')

//$.html()

const privateRyersonCreds = require('./privateRyersonCreds.js');


  
// This does not work if a mobile auth is required


function parseBookTable(HTMLstring) {
	var $ = cheerio.load(HTMLstring);

	//console.log(HTMLstring);
	
	
	//console.log($(".booking_table").html());
	//console.log($("body").html());
	
	/*console.log($("tbody").html());
	console.log($("tbody").html());
	console.log($("thead").html());
	console.log($("tr").html());*/
	//console.log($("html").children("body").children(".booking_table").children("tbody").html());
	
	
	$("html").children("body").children(".booking_table").children("tbody").children("tr").children("th").children(".table_cell_height").children(".room_name_container").each(function () {
		console.log($(this).html());
		console.log("");
		console.log("");
		$(this).parent().parent().parent().children("td").children(".table_cell_height").each(function () {
			console.log($(this).html());
		});
	});
	
	
	$('thead').children('').each(function () {
		console.log($(this).html());
	});
	
	$('tr').children('').each(function () {
		console.log($(this).html());
	});
	
	
	
	
	
	
	//console.log($("body > tbody").html());
}




var temp_booking_table_string;

nightmare
	.goto('http://apps.library.ryerson.ca/room_booking/')
	.wait('input[id=username]')
	.type('input[id=username]', privateRyersonCreds.username)
	.type('input[id=password]', privateRyersonCreds.password)
	.click('.btn.btn-submit')
	.wait('a[href="https://apps.library.ryerson.ca/room_booking/booking/booking_main"]')
	.click('a[href="https://apps.library.ryerson.ca/room_booking/booking/booking_main"]')
	.evaluate(() => document.querySelector('.table-wrapper').innerHTML)
	.end()
	.then((title) => {
		temp_booking_table_string = title;
		parseBookTable(temp_booking_table_string);
		
	})
	
	.catch(error => {
		console.error('Search failed:', error)
	});
	
	
	
	

	
	
	
