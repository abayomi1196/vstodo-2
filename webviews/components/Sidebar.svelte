<script lang="ts">
  import { onMount } from "svelte";


  let todos: Array<{text: string, completed: boolean}> = [];
  let text = "";


  onMount(() => {
    window.addEventListener("message", (event) => {
      // the json data that the extension sent
      const message = event.data;
      
      switch(message.type) {
        case "new-todo":
        todos = [{text: message.value, completed: false}, ...todos]

        break;
      }
    })
  })

</script>


<style>
  .complete {
    text-decoration: line-through;
  }
</style>


<form on:submit|preventDefault={()=> {
  todos = [{text, completed: false}, ...todos]
  text = ""
}}>
  <input bind:value={text}/>
</form>

<ul>
  {#each todos as todo (todo.text)}
    <li class:complete={todo.completed}
    on:click={() => todo.completed = !todo.completed}>{todo.text}</li>
  {/each}
</ul>


<button on:click={() => {
  tsVscode.postMessage({type: 'onInfo', value: 'Valuable info message'})
}}>
click me for info
</button>

<button on:click={() => {
  tsVscode.postMessage({type: 'onError', value: 'Valuable error message'})
}}>
click me for error
</button>
