<script>
  import Dialog from "./lib/Blocks/Dialog.svelte";
</script>

<Dialog>
  <div slot="button">?</div>
  <div slot="content" class="about">
    <h3>What is this</h3>

    <h3>I think this sucks</h3>
    <p>well thats just like your opinion, man</p>
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
