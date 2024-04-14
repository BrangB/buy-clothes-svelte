<script>
  import { func } from "three/examples/jsm/nodes/code/FunctionNode.js";
     import { setItems, items } from "../store";

let storeData = [];

async function fetchData() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  setItems(data);
}

let alertShow = false;

fetchData();

$: {
  items.subscribe(value => {
    storeData = value;
    console.log(value)
  });
}

function BuyClothes(item){
    console.log(item)
    alertShow = true
    setTimeout(() => {
        alertShow = false
    }, 2000);
}

</script>
    <div class={`toast toast-center toast-top z-50 ${alertShow ? 'translate-y-0' : '-translate-y-[100px]'} duration-200`}>
        <div class="alert alert-success">
            <span>Add New Item</span>
        </div>
    </div>

    {#if storeData.length > 0}
        {#each storeData as item (item.id)}
        <div class="card card-compact w-72 bg-base-100 shadow-xl h-[400px] p-3">
            <figure><img src={item.image} alt="Shoes" class="w-24 h-28 object-contain" /></figure>
            <div class="card-body flex justify-between">
            <div>
                <h2 class="card-title text-lg">{item.title}</h2>
                <p class="description">{item.description}</p>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" on:click={() => BuyClothes(item)}>Buy Now</button>
            </div>
            </div>
        </div>
        {/each}
    {:else}
        {#each Array(10) as _, i (i)}
        <div class="skeleton w-32 h-32"></div>
        {/each}
    {/if}

<style>
  .description {
    max-height: 50px; /* Limiting the height of the description */
    overflow: hidden; /* Hiding the overflow */
    text-overflow: ellipsis; /* Adding ellipsis to the overflow */
    white-space: nowrap; /* Preventing wrapping */
  }</style>

<!-- markup (zero or more items) goes here -->