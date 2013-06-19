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
			$('#nextBtn').click();

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
			$("#step2").validate({
  				submitHandler: function(form) {
  					var submitTime = Math.round(new Date().getTime() / 100),
  						transAmount = jQuery('#amount').val();

  					//run the ecomm analytics object and submit
  					ga('ecommerce:addTransaction', {
					  'id': submitTime,					// Transaction ID. Required. (current time)
					  'affiliation': 'CAMBr North',   	// Affiliation or store name.
					  'revenue': transAmount,           // Grand Total.
					});

  					ga('ecommerce:addItem', {
					  'id': submitTime,                 // Transaction ID. Required.
					  'name': 'CAMBr North Donation',   // Product name. Required.
					  'sku': 'CND1',                 	// SKU/code.
					});
					
					//send ecomm analytics
					ga('ecommerce:send');

  					//submit the form
   					form.submit();
  				}
 			});
		});

	});

	function showStep1(){
		$("#step1").fadeIn();
	};

	function showStep2(){
		$("#step2").fadeIn();
	};
}(jQuery));