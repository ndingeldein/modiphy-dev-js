<script id="ni-template" type="text/x-handlebars-template">

	<a href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}">{{ navText item }}</a>
	
</script>

<script id="main-ni-template" type="text/x-handlebars-template">

	<a href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}">{{ navText item }}<div class="arrow"><span class="flaticon-arrow487"></span></div></a>
	
</script>

<script id="ni-social-template" type="text/x-handlebars-template">

	<a class="{{ item.field01 }} symbol" href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}">{{{ socialIcon item }}}</a>

</script>