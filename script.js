$(document).ready(function () {
    $("#uploadForm").submit(function (event) {
        event.preventDefault();

        let formData = new FormData(this);
        $("#progressContainer").removeClass("d-none");

        // Progress Bar Animation
        let progressBar = $(".progress-bar");
        progressBar.css("width", "0%");
        let progress = 0;
        let interval = setInterval(function () {
            progress += 20;
            progressBar.css("width", progress + "%");

            if (progress >= 100) clearInterval(interval);
        }, 500);

        // Upload and Analyze Resume
        $.ajax({
            url: "https://ai-resume-checker-o2jh.onrender.com/upload", // Change this
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $("#resultContainer").removeClass("d-none");
                $("#resultList").empty();

                // Display Results
                $("#resultList").append(`<li>🛠 Skills: ${response.skills_detected.join(", ")}</li>`);
                $("#resultList").append(`<li>📅 Experience: ${response.experience_level}</li>`);
                $("#resultList").append(`<li>🔠 Grammar Issues: ${response.grammar_issues.length}</li>`);
                $("#resultList").append(`<li>📊 Readability Score: ${response.readability_score}/10</li>`);
            },
            error: function () {
                alert("Error analyzing resume! Please try again.");
            },
        });
    });
});
