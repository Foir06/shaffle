let teams = [
    "吉田誠一", "鈴木信夫", "ちび式じい", "田中清司", "佐藤勝美",
    "渡辺久雄", "山本昭一", "中村富雄", "小林和男", "加藤康夫",
    "伊藤義弘", "松本秀夫", "斉藤幸一", "三浦忠男", "藤田英二",
    "岡田光男", "村上昭三", "長谷川健", "近藤隆一", "石井弘道"
];

let landmarks = [
    "公園", "健康センター", "市民会館", "銭湯", "市民ホール",
    "図書館", "公民館", "競馬場", "福祉センター", "市民プール",
    "市役所", "神社", "河川敷", "パチンコ", "百貨店",
    "郵便局", "フィットネスジム", "カラオケ喫茶", "囲碁将棋サロン", "雀荘"
];

function updateTable() {
    let table = document.getElementById("teamTable");
    table.innerHTML = "";
    for (let i = 0; i < teams.length; i++) {
        let row = table.insertRow();
        row.insertCell(0).innerText = teams[i];
        row.insertCell(1).innerText = landmarks[i];
    }
}

function shuffleTeams() {
    pyodide.runPython(`
import random
random.shuffle(teams)
random.shuffle(landmarks)
    `).then(updateTable);
}

async function main() {
    window.pyodide = await loadPyodide();
    await pyodide.runPythonAsync(`
import random
teams = ${JSON.stringify(teams)}
landmarks = ${JSON.stringify(landmarks)}
    `);
    updateTable();
}
main();
