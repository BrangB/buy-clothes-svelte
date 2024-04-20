<script>
  import { UserStore } from "../store";
  import page from "page";
  import { getMetaData, insertUserData, signInWithGoogle } from "../services/firebase";

  let userdata;

  $: {
    if($UserStore){
      UserStore.subscribe(user => {
        userdata = user;
        if (userdata) { // Check if userdata is not null
          // Check if metadata exists before inserting
          getMetaData(userdata.userId)
            .then(metadata => {
              if (!metadata) {
                insertUserData(userdata.userId, {
                  metadata: {
                    totalItem: 0,
                    selectedItem: []
                  }
                });
              }
            })
            .catch(error => {
              console.error("Error getting metadata: ", error);
            });
        }
      });
      
      page.redirect("/");
    }
  }
</script>

<div class="login container">
<button on:click={signInWithGoogle}>Log In</button>;
</div>
