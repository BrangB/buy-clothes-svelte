<script>
    // your script goes here

  import Drawer from "./Drawer.svelte";

</script>

<div class="navbar fixed top-0 left-0 p-4 px-8 z-50 backdrop-blur-md bg-[#c4c4c465]">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li class="m-1"><a href="/">Homepage</a></li>
        <li class="m-1"><a href="#favorite">Favorite</a></li>
        <li class="m-1"><a href="/">Sign out</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <h1 class="btn btn-ghost text-xl">Svelte + daisyUI</h1>
  </div>
  <div class="navbar-end">
    <Drawer />
  </div>
</div>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->