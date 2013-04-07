function connected() {
	$('.step1').remove();
	var wrapper = $('.wrapper').html();
	$('.wrapper').remove();
	$('body').prepend(wrapper);
	$('.step2').show();
}

function displayFile(name) {
	$('.stagetext').append("<h2 style='font-weight:normal;'>" + name + "</h2>");
}