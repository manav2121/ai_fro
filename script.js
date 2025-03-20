document.getElementById("uploadBox").addEventListener("click", () => {
    document.getElementById("fileInput").click();
});

document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput").files[0];

    if (!fileInput) {
        alert("Please upload a resume!");
        return;
    }

    const formData = new FormData();
    formData.append("resume", fileInput);

    try {
        // Send to backend API (replace with your actual API URL)
        const response = await fetch("https://ai-resume-checker-o2jh.onrender.com/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        // Update UI with results
        document.getElementById("name").innerText = data.name || "N/A";
        document.getElementById("email").innerText = data.email || "N/A";
        document.getElementById("skills").innerText = data.skills ? data.skills.join(", ") : "N/A";
        document.getElementById("matchScore").innerText = data.matchScore || "0";
        
        const suggestionsList = document.getElementById("suggestions");
        suggestionsList.innerHTML = "";
        (data.suggestions || []).forEach(suggestion => {
            const li = document.createElement("li");
            li.innerText = suggestion;
            suggestionsList.appendChild(li);
        });

        document.getElementById("results").classList.remove("hidden");
    } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Error analyzing resume. Please try again.");
    }
});
