function readCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const rows = e.target.result.split("\n$pymaster$\n").filter(row => row.trim().length > 0); // Custom delimiter
        let html = "";
        let questionNumber = 1;  // Ensure correct numbering
        rows.forEach((row) => {
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.trim().replace(/^"|"$/g, '')); // Proper CSV parsing
            if (cols.length >= 4) { // Ensure the row has all required fields
                html += `
                <div class="question">
                    <h3>שאלה ${questionNumber}</h3>
                    <p>${cols[0]}</p>
                    <div class="icons">
                        <span class="topic">נושא: ${cols[3]}</span>
                        <button onclick="toggleHint(${questionNumber})">🔍 רמז</button>
                        <button onclick="toggleSolution(${questionNumber})">👁 פתרון</button>
                    </div>
                    <div class="hint" id="hint-${questionNumber}" style="display: none;">
                        <strong>רמז:</strong> ${cols[1]}
                    </div>
                    <div class="solution" id="solution-${questionNumber}" style="display: none;">
                        <strong>פתרון:</strong>
                        <pre>${cols[2]}</pre>
                    </div>
                </div>
                `;
                questionNumber++; // Increment for next question
            }
        });
        document.getElementById("questions").innerHTML = html;
    };
    reader.readAsText(file);
}

function toggleHint(id) {
    var hint = document.getElementById('hint-' + id);
    hint.style.display = (hint.style.display === 'block') ? 'none' : 'block';
}

function toggleSolution(id) {
    var solution = document.getElementById('solution-' + id);
    solution.style.display = (solution.style.display === 'block') ? 'none' : 'block';
}
