let pyodide;

async function loadPyodideAndPython() {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("random"); // ランダムモジュールをロード
    await pyodide.runPythonAsync(await (await fetch("main.py")).text());
    
    // 初期テーブルを表示
    await initializeTable();
}

async function shuffleTeams() {
    let result = await pyodide.runPythonAsync("shuffle_data()"); // Python関数を実行
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
}

// 初回表示のためにシャッフルを実行
async function initializeTable() {
    await shuffleTeams();
}

// PyodideをロードしてPythonを実行
loadPyodideAndPython();
