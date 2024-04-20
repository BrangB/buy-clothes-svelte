<script>
  import Home from "./pages/home.svelte";
  import router from "page";
  let page;
  import Login from "./pages/login.svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { UserStore } from "./store";
  import { onMount } from "svelte";

  const auth = getAuth();
  onMount(async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        UserStore.set({userId: user.uid, username: user.displayName, avatar: user.photoURL});
        console.log("User signed in with ID:", user.uid);
        if (user.photoURL) {
          console.log("Profile picture URL:", user.photoURL);
        } else {
          console.log("User doesn't have a profile picture");
        }
      } else {
        UserStore.set(user);
        console.log("User signed out");
      }
    });
  });

  router("/", () => page = Home);
  router("/login", () => page = Login);
  router.start();
</script>

<svelte:component this={page} />
