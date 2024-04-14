<script>
    import { metaData } from "../store";

    let allData = {};
    let selectedItems = []

    $: {
        metaData.subscribe(value => {
            allData = value
            selectedItems = value.selectedItem
        });

    }

    function addItem(item){
        let tempData;
        let tempItem;
        metaData.update(value => {
            tempData = {...value, totalItem: value.totalItem +1}
            tempItem = value.selectedItem
            let newItemArray = tempItem.map(data => {
                if(data.id === item.id){
                    data.quantity += 1;
                }
            })
            return {...tempData, newItemArray}
        })

    }

    function removeItem(item) {
    let tempData;
    let tempItem;
    let newItemArray

    metaData.update(value => {
        if (value.totalItem > 0) 
            tempData = {...value, totalItem: value.totalItem - 1};
        
        tempItem = value.selectedItem;
        if(item.quantity === 1){
            newItemArray = tempItem.filter(data => {
                return data.id !== item.id
            })
        }else{
            newItemArray = tempItem.map(data => {
            if (data.id === item.id && data.quantity > 0) {
                data.quantity -= 1;
            }
            return data;
        });
        }

        
        return {...tempData, selectedItem: newItemArray};
    });
}


</script>

<div class="drawer flex justify-end drawer-end ">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="indicator drawer-button z-10">
        <span class="indicator-item badge badge-secondary ">{allData.totalItem}+</span> 
        <button class="btn p-2">
            <label for="my-drawer" class="cursor-pointer  min-w-10">
                <i class="fas fa-shopping-bag text-lg"></i>
            </label>
        </button>
      </div>

    </div> 
    <div class="drawer-side z-50 ">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay "></label>
      <ul class="menu p-4 w-[300px] md:w-[450px] min-h-full bg-base-200 text-base-content gap-6">
        {#if allData.selectedItem.length > 0}
            {#each allData.selectedItem as item}
                <div class="w-full bg-white rounded-lg p-4 flex flex-row gap-4">
                    <div class="image w-[120px] h-28 bg-red-700">
                        <img src={item.image} alt="clothes" class="w-full h-full object-cover object-top">
                    </div>
                    <div class="p-2 flex flex-col gap-4">
                        <p class="title text-[17px] font-semibold">{item.title}</p>
                        <div class="button flex gap-4">
                            <button class="btn btn-active btn-info rounded-md px-4 py-2 text-white" on:click={() => removeItem(item)}>-</button>
                            <button class="btn btn-active btn-info rounded-md px-4 py-2 text-white">{item.quantity}</button>
                            <button class="btn btn-active btn-info rounded-md px-4 py-2 text-white" on:click={() => addItem(item)}>+</button>
                        </div>
                    </div>
                </div>
            {/each}
        {:else}
            <p>No items added yet.</p>
        {/if}

      </ul>
    </div>
  </div>

<style>
</style>