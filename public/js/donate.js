;(function($) {
	$(function(){

		//infield label functionality
		$("#donateForm input[type=text]").on("focus", function() {
			var el = $(this),
				elLabel = el.parent(".donateFormField, li").children("label");

			elLabel.hide();
		}).on("blur", function() {
			var el = $(this),
				elLabel = el.parent(".donateFormField, li").children("label");

			if (el.val().trim() === "") {
				el.val("");
				elLabel.show();
			}
		});

		//how about some validation?


		//Click a button, made that donation
		$('#donationAmounts .btn').on('click', function(){
			var el = $(this),
				elAmnt = el.attr("data-amount");

			//change class to active
			$('#donationAmounts .btn').removeClass('active');
			el.addClass('active');

			//set the donation amount
			$('#amount').focus().val(elAmnt);

			//click on the next button
			$('#nextBtn').addClass("btn-primary");

			//prevent default
			return false;
		});

		//keypress validation to add/remove button classes
		$(document).on("keyup", "#amount", function(){
			var elval = $(this).val();

			if (elval.length === 0) {
				$('#nextBtn').removeClass("btn-primary");
			} else {
				$("#nextBtn").addClass("btn-primary");
			}
		});

		//fancy schmancy two page thing
		$(document).on("click", "#nextBtn.btn-primary", function() {
			$("#step1").slideUp('fast', showStep2());
		});

		$("#prevBtn").on('click', function(){
			$("#step2").slideUp('fast', showStep1());
		});

		$('#donateFormSubmit').on('click', function(){
			// $("#step2").validate({
  	// 			submitHandler: function(form) {
   					form.submit();
  				//}
 			// });
		});

	});

	function showStep1(){
		$("#step1").fadeIn();
	};

	function showStep2(){
		$("#step2").fadeIn();
	};
}(jQuery));