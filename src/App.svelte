<script>
  import DisplayItems from "./components/DisplayItems.svelte";
  import Drawer from "./components/Drawer.svelte";
</script>

<main class="w-full min-h-screen flex flex-col items-center justify-center p-8">
  <div class="w-full flex items-center justify-end ">
    <Drawer />
  </div>
  <div class="w-full h-full flex flex-row flex-wrap items-center justify-center gap-6 p-14">
    <DisplayItems />
  </div>
</main>


<style>

</style>