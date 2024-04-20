<script>
  import Navbar from "../components/Navbar.svelte";
  import DisplayItems from "../components/DisplayItems.svelte";
  import Favorite from "../components/Favorite.svelte";
  import { UserStore } from "../store";
  import page from "page";

  $: if (!$UserStore) page.redirect("/login");

    // your script goes here
</script>

<main class="w-full min-h-screen flex flex-col items-center justify-center p-8">
  <Navbar />
  <div class="w-full h-full flex flex-row flex-wrap items-center justify-center gap-6 p-14">
    <DisplayItems />
  </div>
  <div class="w-full h-full flex flex-col flex-wrap items-center justify-center gap-4 mt-6" id="favorite">
    <h1 class="font-bold text-3xl text-primary uppercase">Your Favorite</h1>
    <div class="w-full h-full flex flex-row flex-wrap items-center justify-center gap-6 p-14">
      <Favorite />
    </div>
  </div>
</main>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->