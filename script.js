document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("resume");
    const resultDiv = document.getElementById("result");

    if (fileInput.files.length === 0) {
        resultDiv.innerHTML = "<p>Please select a file.</p>";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("https://ai-resume-checker-e833.onrender.com/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Server Response:", data);

        if (data.analysis) {
            resultDiv.innerHTML = `
                <h2>Analysis Result:</h2>
                <p><strong>Name:</strong> ${data.analysis.name}</p>
                <p><strong>Email:</strong> ${data.analysis.email}</p>
                <p><strong>Phone:</strong> ${data.analysis.phone}</p>
                <p><strong>LinkedIn:</strong> <a href="${data.analysis.linkedin}" target="_blank">${data.analysis.linkedin}</a></p>
                <p><strong>GitHub:</strong> <a href="${data.analysis.github}" target="_blank">${data.analysis.github}</a></p>
                <p><strong>Skills:</strong> ${data.analysis.skills.join(", ")}</p>
            `;
        } else {
            resultDiv.innerHTML = "<p>No analysis found.</p>";
        }
    } catch (error) {
        console.error("Error processing file:", error);
        resultDiv.innerHTML = "<p>Error processing file. Please try again.</p>";
    }
});
