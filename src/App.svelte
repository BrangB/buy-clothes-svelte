<script>
  import { setItems, items } from "./store";

  let storeData = [];

  async function fetchData() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setItems(data);
  }
  
  fetchData();

  $: {
    items.subscribe(value => {
      storeData = value;
      console.log(value)
    });
  }
</script>

<main class="w-full min-h-screen flex flex-row flex-wrap items-center justify-center gap-4 p-5">
  {#if storeData.length > 0}
      {#each storeData as item (item.id)}
        <div class="card card-compact w-72 bg-base-100 shadow-xl h-[400px] p-3">
          <figure><img src={item.image} alt="Shoes" class="w-24 h-28 object-contain" /></figure>
          <div class="card-body">
            <h2 class="card-title text-lg">{item.title}</h2>
            <p class="description">{item.description}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      {/each}
  {:else}
    <span class="loading loading-dots loading-lg"></span>
  {/if}
</main>


<style>
  .description {
    max-height: 50px; /* Limiting the height of the description */
    overflow: hidden; /* Hiding the overflow */
    text-overflow: ellipsis; /* Adding ellipsis to the overflow */
    white-space: nowrap; /* Preventing wrapping */
  }
</style>