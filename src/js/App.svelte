<script>
	import '../scss/main.scss'
	import { Router } from 'svelte-router-spa'
	// var Router = require('svelte-router-spa');
	import { routes } from './views'

	export let name;
</script>

<style type="text/scss">
	@import '../scss/base/svelte.scss';
	$color: red;
	h1 {
		color: $color;
		@include flexbox(column, nowrap, flex-start, stretch);
	}
</style>

<h1>Hello {name}!</h1>
<Router {routes} />