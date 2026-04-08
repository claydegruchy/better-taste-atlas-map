<script>
  import Dialog from "./lib/Blocks/Dialog.svelte";
</script>

<Dialog>
  <div slot="button">?</div>
  <div slot="content" class="about">
    <h3>What is this</h3>
    <p>its tasteatlas but it in the modern area</p>

    <h3>Why did you make this</h3>
    <p>
      i want to use taste atlas when i'm travelling but it really sucks on
      mobile
    </p>
    <p>and i wanted the search to be more responsive</p>
    <p>
      and i want to see more than the top 5 things in a city or other location
      with a lot of points in close prox
    </p>
    <p>and have ux from the modern era</p>
    <p>
      anyway, the map function of taste atlas isn't their priority so i made
      this.
    </p>
    <h3>How did you make this</h3>
    <p>openlayers mostly and svelte 4. yes the robot was involved.</p>
    <h3>Where did you get the data for this</h3>
    <p>i nicked it</p>
    <h3>I think this sucks</h3>
    <p>well thats just like your opinion man</p>
  </div></Dialog
>

<style>
  .about {
    max-width: 50vw;
    text-align: left;
  }

  @media (max-width: 640px) {
    .about {
      max-width: 90vw;
    }
  }
</style>
