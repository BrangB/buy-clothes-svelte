<script>
// @ts-nocheck
    import { metaData } from "../store";
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player"
    import shoppingBaganimation from "../assets/shoppingbag.json"
    import noFile from "../assets/nofile.json"
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

<div class="drawer flex w-auto justify-end drawer-end ">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <div class="indicator drawer-button z-10">
        <span class="indicator-item badge badge-primary text-white h-5 rounded-xl text-center p-2 animate-pulse">{allData.totalItem}+</span> 
        <button class="p-2 bg-transparent">
            <label for="my-drawer" class="cursor-pointer  min-w-10">
                <LottiePlayer
                src={shoppingBaganimation}
                autoplay="{true}"
                loop="{true}"
                renderer="svg"
                background="transparent"
                height="{30}"
                width="{30}"
                controlsLayout="{controlsLayout}"
              />
            </label>
        </button>
      </div>

    </div> 
    <div class="drawer-side z-50 ">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay "></label>
      <ul class="menu p-4 w-[300px] md:w-[450px] min-h-full bg-base-200 text-base-content gap-6 relative">
        {#if allData.selectedItem.length > 0}
            {#each allData.selectedItem as item}
                <div class="w-full bg-white rounded-lg p-4 flex flex-row gap-4 items-center justify-center">
                    <div class="w-[150px] h-full flex items-center justify-center">
                        <div class="w-[80px]">
                            <img src={item.image} alt="clothes" class="w-full h-full object-cover object-top">
                        </div>
                    </div>
                    <div class="p-2 flex flex-col gap-4">
                        <p class="title text-[17px] font-semibold">{item.title}</p>
                        <p class="text-lg">${item.price * item.quantity}</p>
                        <div class="button flex gap-4">
                            <button class="btn-active bg-[#52b0db] rounded-sm px-6 py-2 text-white" on:click={() => removeItem(item)}>-</button>
                            <button class="btn-active bg-[#52b0db] rounded-sm px-6 py-2 text-white">{item.quantity}</button>
                            <button class="btn-active bg-[#52b0db] rounded-sm px-6 py-2 text-white" on:click={() => addItem(item)}>+</button>
                        </div>
                    </div>
                </div>
            {/each}
        {:else}
            <div class="absolute m-auto flex items-center justify-center gap-3  w-full">
                <LottiePlayer
                    src={noFile}
                    autoplay="{true}"
                    loop="{true}"
                    renderer="svg"
                    background="transparent"
                    height="{40}"
                    width="{40}"
                    controlsLayout="{controlsLayout}"
                />
                <p>No items added yet.</p>
            </div>
        {/if}

      </ul>
    </div>
  </div>

<style>
</style>