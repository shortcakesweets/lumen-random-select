const itemTable = document.getElementById('item-table');
const itemInput = document.getElementById('item-input');
const toggleBtn = document.getElementById("random-btn");

itemInput.setAttribute('autocomplete', 'off');

itemInput.addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') return;

    const itemText = itemInput.value.trim();
    if (itemText) {
        const row = itemTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell2.contentEditable = true;
        cell2.textContent = itemText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => {
            itemTable.deleteRow(row.rowIndex);
        });
        cell3.appendChild(deleteBtn);

        itemInput.value = '';
    }

    // Prevent form submission
    event.preventDefault();
});

let intervalId;
let prevCard = -1;

toggleBtn.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        pickAndHighlightRandomRow(true);
        toggleBtn.textContent = "재추첨";
    } else{
        if (itemTable.rows.length <= 2){
            alert("최소 2개 이상의 카드가 필요합니다.");
            return;
        }
        intervalId = setInterval(() => {
            pickAndHighlightRandomRow();
        }, 50);
        toggleBtn.textContent = "(눌러서 멈추기)";
    }
});

function pickAndHighlightRandomRow(allowSame = false) {
    const rows = itemTable.rows;
    const rowCount = rows.length;
    if (rowCount <= 1) return;

    for (let i = 1; i < rowCount; i++) {
        rows[i].style.backgroundColor = '';
        rows[i].cells[0].textContent = '';
    }

    let randomIndex = Math.floor(Math.random() * (rowCount - 1)) + 1;
    const availableIndices = [];
    for (let i = 1; i < rowCount; i++) {
        if (allowSame || i !== prevCard) {
            availableIndices.push(i);
        }
    }
    randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    prevCard = randomIndex;
    
    const row = rows[randomIndex];
    row.style.backgroundColor = 'lightgreen';
    row.cells[0].textContent = '레디!';
}