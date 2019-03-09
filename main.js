const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

const cheerio = require('cheerio')
//const $ = cheerio.load('<h2 class="title">Hello world</h2>')

//$('h2.title').text('Hello there!')
//$('h2').addClass('welcome')

//$.html()

const privateRyersonCreds = require('./privateRyersonCreds.js');


  
// This does not work if a mobile auth is required


function parseBookTable(HTMLstring) {
	var $ = cheerio.load(HTMLstring);


	
	
	//console.log($(".booking_table").html());
	
	console.log($("body > tbody").html());
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
	.evaluate(() => document.querySelector('.booking_table').innerHTML)
	.end()
	.then((title) => {
		temp_booking_table_string = title;
		parseBookTable(temp_booking_table_string);
		
	})
	
	.catch(error => {
		console.error('Search failed:', error)
	});
	
	
	
	

	
	
	
