function connected() {
	$('.step1').remove();
	var wrapper = $('.wrapper').html();
	$('.wrapper').remove();
	$('body').prepend(wrapper);
	$('.step2').show();
}