let pyodide;

async function loadPyodideAndPython() {
    console.log("Pyodideのロードを開始...");
    pyodide = await loadPyodide();
    console.log("Pyodideロード完了！");

    // Pythonスクリプトを読み込む
    let pythonScript = await (await fetch("main.py")).text();
    await pyodide.runPythonAsync(pythonScript);
    console.log("Pythonスクリプトを実行しました！");

    // 初回表示
    await initializeTable();
}

async function shuffleTeams() {
    console.log("シャッフル開始...");

    let result = await pyodide.runPythonAsync("shuffle_data()");
    console.log("Python実行結果:", result);

    let data = JSON.parse(result); // JSONをパース

    let tableBody = document.getElementById("teamTable");
    tableBody.innerHTML = ""; // 既存データをクリア
    
    data.forEach(row => {
        let tr = document.createElement("tr");
        let teamTd = document.createElement("td");
        let landmarkTd = document.createElement("td");
        
        teamTd.textContent = row[0]; // チーム名
        landmarkTd.textContent = row[1]; // ランドマーク名
        
        tr.appendChild(teamTd);
        tr.appendChild(landmarkTd);
        tableBody.appendChild(tr);
    });

    console.log("シャッフル完了！");
}

// 初回表示のためにシャッフルを実行
async function initializeTable() {
    await shuffleTeams();
}

// PyodideをロードしてPythonを実行
loadPyodideAndPython();
