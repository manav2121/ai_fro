document.getElementById("resume-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let fileInput = document.getElementById("resume");
    let resultDiv = document.getElementById("analysis-result");
    let resultText = document.getElementById("result-text");

    if (!fileInput.files.length) {
        alert("Please upload a resume file!");
        return;
    }

    resultDiv.classList.remove("hidden");
    resultText.innerHTML = "Analyzing your resume... Please wait.";

    // Simulate API call (Replace with actual backend request)
    setTimeout(() => {
        resultText.innerHTML = "✅ Resume analysis completed! You have a strong experience in Python and AI.";
    }, 2000);
});
