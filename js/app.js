const goals = [
 {id:"iron",label:"Iron",emoji:"🩸"},{id:"protein",label:"Protein",emoji:"💪"},{id:"b12",label:"Vitamin B12",emoji:"⚡"},
 {id:"vitaminD",label:"Vitamin D",emoji:"☀️"},{id:"calcium",label:"Calcium",emoji:"🦴"},{id:"fiber",label:"Fiber",emoji:"🌾"},
 {id:"vitaminC",label:"Vitamin C",emoji:"🍊"},{id:"folate",label:"Folate",emoji:"🌿"},{id:"vitaminA",label:"Vitamin A",emoji:"🥕"}
];
let selectedGoals = ["iron","protein"];
let currentMeals = [];
const $ = id => document.getElementById(id);

function renderGoals(){
  $("goalGrid").innerHTML = goals.map(g=>`<button type="button" class="goal-option ${selectedGoals.includes(g.id)?"active":""}" data-goal="${g.id}"><span class="emoji">${g.emoji}</span><small>${g.label}</small></button>`).join("");
  document.querySelectorAll(".goal-option").forEach(b=>b.onclick=()=>{const g=b.dataset.goal;if(selectedGoals.includes(g)) selectedGoals=selectedGoals.filter(x=>x!==g);else selectedGoals.push(g);renderGoals();});
}
function getPrefs(){
  return {diet:$("diet").value,budget:$("budget").value,time:$("time").value,avoid:$("avoid").value.toLowerCase().split(",").map(x=>x.trim()).filter(Boolean)};
}
function matchFoods(){
  const p=getPrefs();
  return FOODS.filter(f=>f.diet.includes(p.diet) && !p.avoid.some(a=>f.name.toLowerCase().includes(a)||f.id.toLowerCase().includes(a)))
    .map(f=>({...f,match:Math.min(99, f.score + selectedGoals.filter(g=>f.goals.includes(g)).length*2)}))
    .filter(f=>selectedGoals.some(g=>f.goals.includes(g)))
    .sort((a,b)=>b.match-a.match).slice(0,8);
}
function renderFoods(){
  const foods=matchFoods();
  $("foodResults").innerHTML=foods.length?foods.map(f=>`<div class="col-md-6 col-xl-3"><div class="food-card"><div class="d-flex justify-content-between align-items-start"><div class="food-icon">${f.emoji}</div><span class="match">${f.match}% match</span></div><h5 class="fw-bold mt-3 mb-1">${f.name}</h5><p class="small text-secondary mb-2">${f.group}</p><div>${f.nutrients.map(n=>`<span class="nutrient-pill">${n}</span>`).join("")}</div><div class="small text-secondary mt-3"><i class="bi bi-lightbulb me-1"></i>${f.goals.filter(g=>selectedGoals.includes(g)).map(prettyGoal).join(", ") || "Balanced choice"}</div></div></div>`).join(""):`<div class="col-12"><div class="panel p-4 text-secondary">No matches. Try removing an avoided food or selecting another goal.</div></div>`;
  $("matchCount").textContent=foods.length;
  $("foodLabel").textContent=foods.length+" foods matched";
}
function prettyGoal(id){return goals.find(g=>g.id===id)?.label||id}
function pickMeals(){
  const p=getPrefs();
  const available=MEALS.filter(m=>m.diet.includes(p.diet)&&!p.avoid.some(a=>m.name.toLowerCase().includes(a)||m.desc.toLowerCase().includes(a)));
  const slots=["BREAKFAST","LUNCH","SNACK","DINNER"];
  return slots.map(slot=>{
    const candidates=available.filter(m=>m.time===slot);
    const scored=candidates.map(m=>({...m,score:m.goals.filter(g=>selectedGoals.includes(g)).length*10 + (m.cost===p.budget||p.budget==="high"?2:0)})).sort((a,b)=>b.score-a.score);
    return scored[0]||MEALS.find(m=>m.time===slot);
  });
}
function renderMeals(){
  currentMeals=pickMeals();
  $("mealResults").innerHTML=currentMeals.map(m=>`<div class="col-md-6 col-lg-3"><div class="meal-card"><div class="meal-time">${m.time}</div><div class="meal-emoji my-3">${m.emoji}</div><h5 class="fw-bold">${m.name}</h5><p class="small text-secondary">${m.desc}</p><div>${m.tags.map(t=>`<span class="nutrient-pill">${t}</span>`).join("")}</div></div></div>`).join("");
  $("mealCount").textContent=currentMeals.length;
  renderBars(); renderGrocery();
}
function renderBars(){
  const target=["iron","protein","calcium","b12","vitaminD","fiber","vitaminC"];
  const weights={iron:0,protein:0,calcium:0,b12:0,vitaminD:0,fiber:0,vitaminC:0};
  currentMeals.forEach(m=>m.goals.forEach(g=>{if(weights[g]!==undefined)weights[g]+=1}));
  $("nutrientBars").innerHTML=target.map(g=>{let val=Math.min(100,35+weights[g]*22+(selectedGoals.includes(g)?12:0));return `<div class="bar-row"><div class="bar-label"><span>${prettyGoal(g)}${selectedGoals.includes(g)?' • priority':''}</span><b>${val}%</b></div><div class="progress"><div class="progress-bar" style="width:${val}%"></div></div></div>`}).join("");
  const priority=selectedGoals.length?Math.round(selectedGoals.reduce((s,g)=>s+Math.min(100,35+weights[g]*22+12),0)/selectedGoals.length):0;
  $("score").textContent=priority+"";
  $("summaryText").textContent=selectedGoals.map(prettyGoal).join(", ")+" prioritized with your diet and preferences.";
}
function renderGrocery(){
  const map={};
  const add=(group,item)=>{map[group]??=[];if(!map[group].includes(item))map[group].push(item)};
  currentMeals.forEach(m=>{
    if(m.name.includes("poha")){add("Staples","Poha");add("Vegetables","Peas");add("Fruits","Orange / Guava");add("Nuts & Seeds","Peanuts")}
    if(m.name.includes("oats")){add("Staples","Oats");add("Dairy","Milk / Yogurt");add("Nuts & Seeds","Chia seeds");}
    if(m.name.includes("Dal")){add("Protein","Lentils");add("Staples","Whole-wheat atta");add("Vegetables","Leafy greens");add("Vegetables","Tomato & cucumber");}
    if(m.name.includes("Rajma")){add("Protein","Rajma");add("Staples","Rice");add("Vegetables","Tomato & cucumber");}
    if(m.name.includes("Chana")){add("Protein","Roasted chana");add("Fruits","Guava / Orange");}
    if(m.name.includes("Yogurt")){add("Dairy","Yogurt");add("Nuts & Seeds","Chia / sesame")}
    if(m.name.includes("Paneer")){add("Dairy","Paneer / tofu");add("Vegetables","Mixed vegetables");add("Staples","Roti")}
    if(m.name.includes("Egg")){add("Protein","Eggs");add("Vegetables","Mixed vegetables");add("Staples","Whole-grain bread")}
    if(m.name.includes("Fish")){add("Protein","Fish");add("Vegetables","Leafy greens");add("Staples","Rice")}
  });
  $("groceryList").innerHTML=Object.entries(map).map(([g,items])=>`<div class="grocery-group"><h6>${g}</h6>${items.map(i=>`<span class="grocery-item"><i class="bi bi-check2"></i>${i}</span>`).join("")}</div>`).join("");
  $("groceryCount").textContent=Object.values(map).flat().length;
}
function generate(){
  if(!selectedGoals.length){showToast("Select at least one nutrition goal.");return}
  renderFoods();renderMeals();renderBars();renderGrocery();
  document.querySelector("#foods").scrollIntoView({behavior:"smooth"});
}
function showToast(msg){$("toast").querySelector(".toast-body").textContent=msg;bootstrap.Toast.getOrCreateInstance($("toast")).show()}
$("startBtn").onclick=()=>document.querySelector("#planner").scrollIntoView({behavior:"smooth"});
$("buildNav").onclick=()=>document.querySelector("#planner").scrollIntoView({behavior:"smooth"});
$("generateBtn").onclick=generate;
$("shuffleBtn").onclick=()=>{currentMeals=currentMeals.sort(()=>Math.random()-.5);renderMeals();};
$("copyGrocery").onclick=async()=>{const text=[...$("groceryList").querySelectorAll(".grocery-group")].map(g=>g.innerText).join("\n");try{await navigator.clipboard.writeText(text);showToast("Grocery list copied!")}catch{showToast("Select and copy the list manually.")}};
renderGoals();renderFoods();renderMeals();
