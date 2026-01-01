let data = {
  low: [],
  mid: [],
  high: []
};

let currentList = [];

// ❶ 從 Google Sheet 抓資料
fetch("
https://api.sheetbest.com/sheets/2285af9f-f165-4a09-9fb3-9084061dd96d")
  .then(response => response.json())
  .then(rows => {
    rows.forEach(row => {
      const text = row["Self care"];
      const energy = row["energy type"];

      if (energy === "低能量") data.low.push(text);
      if (energy === "中能量") data.mid.push(text);
      if (energy === "高能量") data.high.push(text);
    });

    console.log("資料載入完成", data);
  });

// ❷ 選能量
function chooseEnergy(level) {
  currentList = data[level];

  document.getElementById("energy-select").style.display = "none";
  document.getElementById("shuffle").style.display = "block";
  document.getElementById("result").style.display = "none";
}

// ❸ 抽籤
function draw() {
  if (currentList.length === 0) {
    document.getElementById("result-text").innerText =
      "目前還沒有這個能量等級的分享，晚點再來看看 🤍";

    document.getElementById("shuffle").style.display = "none";
    document.getElementById("result").style.display = "block";
    return;
  }

  const randomIndex = Math.floor(Math.random() * currentList.length);
  document.getElementById("result-text").innerText =
    currentList[randomIndex];

  document.getElementById("shuffle").style.display = "none";
  document.getElementById("result").style.display = "block";
}

// ❹ 再來一次
function runAgain() {
  draw();
}

// ❺ 回到能量選擇
function backToGroup() {
  document.getElementById("energy-select").style.display = "block";
  document.getElementById("shuffle").style.display = "none";
  document.getElementById("result").style.display = "none";
}