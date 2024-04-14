<script>
  import { setItems, items } from "../store";
  import { metaData } from "../store";

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
  });
}

let selectedItems = []

$: {
    metaData.subscribe(value => {
        selectedItems = value.selectedItem
    });
}


function BuyClothes(item) {
    // Check if the item already exists in the selected items
    const index = selectedItems.findIndex(selected => selected.id === item.id);
    
    if (index !== -1) {
        // If the item already exists, update its quantity
        metaData.update(value => {
            const updatedSelectedItem = [...value.selectedItem];
            updatedSelectedItem[index] = {
                ...updatedSelectedItem[index],
                quantity: updatedSelectedItem[index].quantity + 1
            };
            return {...value, totalItem: value.totalItem + 1, selectedItem: updatedSelectedItem};
        });
    } else {
        // If the item is new, add it with quantity 1
        metaData.update(value => ({
            ...value,
            totalItem: value.totalItem + 1,
            selectedItem: [...value.selectedItem, {...item, quantity: 1}]
        }));
    }
    
    // Show alert message
    alertShow = true;
    setTimeout(() => {
        alertShow = false;
    }, 2000);
}


</script>
    <div class={`toast toast-center toast-top z-50 ${alertShow ? 'translate-y-0' : '-translate-y-[200px]'} duration-200`}>
      <div role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Your purchase has been confirmed!</span>
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
  }
</style>

<!-- markup (zero or more items) goes here -->