<script>
  import { setItems, items } from "../store";
  import { metaData } from "../store";
  import buyNow from "../assets/buyNow.json";
  // @ts-ignore
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ];

let storeData = [];

async function fetchData() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  let newData = data.map(item => {
    return {...item, favorite: false}
  })
  setItems(newData);
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


function addFavortie(item){
  let newData = storeData.map(data => {
    if(data.id === item.id){
      return {...data, favorite: !data.favorite};
    }else{
      return data
    }
  })
  setItems(newData)
  console.log(newData)
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
        <div class="card card-compact w-64 bg-base-100 shadow-xl h-[450px] p-3 relative">
            <button class="bg-gray-200 absolute top-4 right-4 rounded-full w-8 h-8 overflow-hidden flex items-center justify-center p-4 text-white" on:click={() => addFavortie(item)}>
              {#if item.favorite}
                <i class="fa-solid fa-heart text-red-600 text-sm"></i>
              {:else}
                <i class="fa-regular fa-heart text-black text-sm "></i>
              {/if}
            </button>
            <div class="w-full h-[200px]  flex items-center justify-center">
              <img src={item.image} alt="Shoes" class="w-full h-[60%] object-contain" />
            </div>
            <div class="card-body flex justify-between">
              <div>
                  <h2 class=" font-semibold text-[15px] w-full max-h-[90px] overflow-y-hidden description">{item.title}</h2>
                  <p class="description py-3">{item.description}</p>
              </div>
              <div class="card-actions flex items-center justify-between">
                  <p class="text-lg">${item.price}</p>
                  <button class="btn rounded-full w-12 h-12 flex items-center justify-center p-2 text-white" on:click={() => BuyClothes(item)}>
                      <LottiePlayer
                        src={buyNow}
                        autoplay="{true}"
                        loop="{true}"
                        renderer="svg"
                        background="transparent"
                        height="{30}"
                        width="{30}"
                        controlsLayout="{controlsLayout}"
                      />
                  </button>
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
    white-space: wrap; /* Preventing wrapping */
  }
</style>

<!-- markup (zero or more items) goes here -->