/* Freight Rate Calculator */
const KG = { kg:1, mt:1000, g:0.001, lb:0.45359237 };
const CONTAINER_KG = { '20ft':28000, '40ft':26000 };
function money(n) { return Number(n || 0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}); }
function calculateFreight() {
  const weight=Number(document.getElementById('shipment-weight').value)||0;
  const weightUnit=document.getElementById('weight-unit').value;
  const rate=Number(document.getElementById('freight-rate').value)||0;
  const rateUnit=document.getElementById('rate-unit').value;
  const kg=weight*KG[weightUnit];
  let total=0, steps=[];
  if (rateUnit==='kg' || rateUnit==='mt' || rateUnit==='g' || rateUnit==='lb') {
    const rateKg=rate/(KG[rateUnit]);
    total=kg*rateKg;
    const unitName={kg:'kg',mt:'MT',g:'g',lb:'lb'}[rateUnit];
    const billable=kg/KG[rateUnit];
    steps=[`${money(weight)} ${weightUnit} = ${money(kg)} kg`,`${money(kg)} kg = ${money(billable)} ${unitName}`,`${money(billable)} ${unitName} × ${money(rate)} per ${unitName} = ${money(total)}`];
    document.getElementById('output-note').textContent=`Equivalent shipment quantity: ${money(billable)} ${unitName}`;
  } else {
    const capacity=CONTAINER_KG[rateUnit];
    const containers=Math.ceil(kg/capacity);
    total=containers*rate;
    steps=[`${money(weight)} ${weightUnit} = ${money(kg)} kg`,`Planning capacity assumed: ${money(capacity/1000)} MT per ${rateUnit === '20ft' ? '20ft' : '40ft'} container`,`${money(kg)} kg ÷ ${money(capacity)} kg = ${containers} container(s) required (rounded up)`,`${containers} × ${money(rate)} per container = ${money(total)}`];
    document.getElementById('output-note').textContent=`Planning estimate: ${containers} × ${rateUnit === '20ft' ? '20ft' : '40ft'} container(s). Container capacity is an assumption for estimation.`;
  }
  document.getElementById('output-total').textContent=money(total);
  document.getElementById('breakdown-list').innerHTML=steps.map(s=>`<li>${s}</li>`).join('');
}
document.addEventListener('DOMContentLoaded',calculateFreight);
