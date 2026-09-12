/* Trade Finance Calculator */
function money(n){return Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
function syncFinancePercent(v){document.getElementById('finance-percent').value=v;calculateTradeFinance();}
function syncTenor(v){document.getElementById('tenor-days').value=v;calculateTradeFinance();}
function calculateTradeFinance(){
  const currency=document.getElementById('currency').value;
  const deal=Number(document.getElementById('deal-value').value)||0;
  const pct=Math.min(100,Math.max(0,Number(document.getElementById('finance-percent').value)||0));
  const days=Math.max(1,Number(document.getElementById('tenor-days').value)||1);
  const rate=Math.max(0,Number(document.getElementById('interest-rate').value)||0);
  const feeRate=Math.max(0,Number(document.getElementById('finance-fee').value)||0);
  document.getElementById('finance-percent-range').value=pct;
  document.getElementById('tenor-days-range').value=days;
  const financed=deal*pct/100;
  const interest=financed*(rate/100)*(days/365);
  const fee=financed*(feeRate/100);
  const financeCost=interest+fee;
  const totalIncludingFinance=deal+financeCost;
  document.getElementById('output-total-value').textContent=`${currency} ${money(totalIncludingFinance)}`;
  document.getElementById('output-finance-cost').textContent=`Financing cost: ${currency} ${money(financeCost)}`;
  document.getElementById('output-currency').textContent=`${money(pct)}% financed for ${days} days`;
  const steps=[`${currency} ${money(deal)} deal value × ${money(pct)}% = ${currency} ${money(financed)} financed amount`,`${currency} ${money(financed)} × ${money(rate)}% annual rate × ${days}/365 = ${currency} ${money(interest)} interest`,`${currency} ${money(financed)} × ${money(feeRate)}% fee = ${currency} ${money(fee)} finance fee`,`${currency} ${money(interest)} + ${currency} ${money(fee)} = ${currency} ${money(financeCost)} total financing cost`,`${currency} ${money(deal)} invoice value + ${currency} ${money(financeCost)} financing cost = ${currency} ${money(totalIncludingFinance)} total value including financing`];
  document.getElementById('breakdown-list').innerHTML=steps.map(s=>`<li>${s}</li>`).join('');
}
document.addEventListener('DOMContentLoaded',calculateTradeFinance);
