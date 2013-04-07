function connected() {
	$('.step1').remove();
	var wrapper = $('.wrapper').html();
	$('.wrapper').remove();
	$('body').prepend(wrapper);
}

function displayFile(name) {
	$('.stagetext').append("<h2>" + name + "</h2>");
}