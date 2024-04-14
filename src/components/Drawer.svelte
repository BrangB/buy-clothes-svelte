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
    <div class="drawer-side z-50">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
        {#each allData.selectedItem as item}
             <li>{item.title} - {item.quantity}</li>
        {/each}
      </ul>
    </div>
  </div>