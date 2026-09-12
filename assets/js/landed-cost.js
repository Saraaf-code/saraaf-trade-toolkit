/* Landed Cost Calculator */
function money(n) { return Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }
function calculateLandedCost() {
  const currency=document.getElementById('currency').value;
  const product=Number(document.getElementById('product-value').value)||0;
  const freight=Number(document.getElementById('freight-cost').value)||0;
  const insurance=Number(document.getElementById('insurance-cost').value)||0;
  const duty=Number(document.getElementById('import-duty').value)||0;
  const other=Number(document.getElementById('other-charges').value)||0;
  const total=product+freight+insurance+duty+other;
  document.getElementById('output-total').textContent=`${currency} ${money(total)}`;
  document.getElementById('output-currency').textContent=`All inputs treated as ${currency}. No FX conversion is applied.`;
  const steps=[`${currency} ${money(product)} product value`,`+ ${currency} ${money(freight)} freight`,`+ ${currency} ${money(insurance)} insurance`,`+ ${currency} ${money(duty)} import duty`,`+ ${currency} ${money(other)} other charges`,`= ${currency} ${money(total)} estimated landed cost`];
  document.getElementById('breakdown-list').innerHTML=steps.map(s=>`<li>${s}</li>`).join('');
}
document.addEventListener('DOMContentLoaded',calculateLandedCost);
