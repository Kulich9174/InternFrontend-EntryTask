<script lang="ts">
  let rates: { [key: string]: number } = {};
  let fromCurrency:string = 'USD';  
  let toCurrency:string = 'USD';    
  let sum:number = 1;               
  let convertedValue: string = '0'; 
  const url='https://open.er-api.com/v6/latest/USD'
  

  fetch(url)
    .then(response => response.json())
    .then(data => {
      rates = data.rates;
    })
    .catch(error => console.error('Ошибка:', error));

    function calculateConversion() {
    if (rates[fromCurrency] && rates[toCurrency]) {
      convertedValue = (sum * (rates[toCurrency] / rates[fromCurrency])).toFixed(3);
    }
  }
  $: calculateConversion(), [fromCurrency, toCurrency, sum];
</script>

<main>
  <h1>Task</h1>
  <div class="container">
    <div class='container_currency'>
        <label class="label">
          <span>Выбери валюту конвертации </span>
          <select bind:value={fromCurrency}>
            {#each Object.keys(rates) as currency}
              <option value={currency}>{currency}</option>
            {/each}
          </select>
        </label>
        <div class='container_inputs'>
          <label>
            <span>Введите сумму для конвертации:</span>
            <input type='number' class="input" bind:value={sum} min="0"/>
          </label>
          <label>
            <span>Введите сумму для конвертации:</span>
            <input type='number' class="input" bind:value={sum} min="0"/>
          </label>
        </div>
    </div>
    <div class='container_currency'>
      <label class="label">
        <span>Выбери валюту</span>
        <select bind:value={toCurrency}>
          {#each Object.keys(rates) as currency}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </label>
      <p class="text">Получится: {convertedValue} {toCurrency}</p>
    </div>
  </div>

</main>

<style>
  .container{
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    min-width:700px;
    padding-bottom:24px ;
    justify-items: center;
    align-items: center;
  }
  .label{
    align-items: center;
    gap:8px;
    justify-content: space-between;
    display: flex;
  }
  .container_currency{
    align-items: start;
    display: flex;
    flex-direction: column;
  }
  .input{
    max-width: 50px;
  }
  .text{
    margin:0;
  }
  .container_inputs{
    display: flex;
    flex-direction: column;
  }
</style>
