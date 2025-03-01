<script module>
  export { add };
</script>

{#snippet add(v)}
  <div>
    {JSON.stringify(v)}
  </div>
{/snippet}
