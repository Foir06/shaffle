let pyodide;

async function loadPyodideAndPython() {
    pyodide = await loadPyodide();
    await pyodide.loadPackage("random"); // ランダムモジュールをロード
    await pyodide.runPythonAsync(await (await fetch("main.py")).text());
    initializeTable();
}

async function shuffleTeams() {
    let result = await pyodide.runPythonAsync("shuffle_data()");
    let data = JSON.parse(result);

    let tableBody = document.getElementById("teamTable");
    tableBody.innerHTML = ""; // 既存データをクリア

    data.forEach(row => {
        let tr = document.createElement("tr");
        let teamTd = document.createElement("td");
        let landmarkTd = document.createElement("td");
        teamTd.textContent = row[0];
        landmarkTd.textContent = row[1];
        tr.appendChild(teamTd);
        tr.appendChild(landmarkTd);
        tableBody.appendChild(tr);
    });
}

// 初期データを表示
async function initializeTable() {
    await shuffleTeams();
}

loadPyodideAndPython();
