<div class="templates hidden">

<script id="example-template" type="text/x-handlebars-template">

id: {{ id }}<br>
field01: {{ field01 }}<br>

</script>

<script id="ni-template" type="text/x-handlebars-template">

	<a href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}">{{ navText item }}</a>
	
</script>

<script id="ni-flaticon-template" type="text/x-handlebars-template">

	<a class="{{ item.field10 }}" href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}" title="{{ item.field02 }}"><span class="flaticon-{{ item.field10 }}"></span></a>

</script>

<script id="home-button-template" type="text/x-handlebars-template">

	<span class="flaticon-home65"></span>

</script>

<script id="ni-social-template" type="text/x-handlebars-template">

	<a class="{{ item.field01 }} symbol" href="{{ itemLink item }}" target="{{ itemTarget item '_self' }}">rounded{{ item.field01 }}</a>

</script>

<script id="gallery-thumb-template" type="text/x-handlebars-template">

	<div class="img-holder">

		<img src="{{ imageUrl item maxWidth=0 maxHeight=120 }}">

	</div>

</script>

<script id="photo-gallery-template" type="text/x-handlebars-template">
	<a class="close-button"><img src="./images/close.png"></a>
	<div class="bg"></div>

</script>

</div>