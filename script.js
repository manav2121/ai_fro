$(document).ready(function () {
    $("#uploadForm").submit(function (event) {
        event.preventDefault();

        let formData = new FormData(this);
        $("#progressContainer").removeClass("d-none");

        // Simulate Progress
        let progressBar = $(".progress-bar");
        progressBar.css("width", "0%");
        let progress = 0;
        let interval = setInterval(function () {
            progress += 20;
            progressBar.css("width", progress + "%");

            if (progress >= 100) clearInterval(interval);
        }, 500);

        // Upload Resume
        $.ajax({
            url: "https://ai-resume-checker-o2jh.onrender.com/upload", // Change to your backend API URL
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $("#resultContainer").removeClass("d-none");
                $("#resultList").empty();

                // Display Analysis Results
                $("#resultList").append(`<li>🛠 Skills: ${response.analysis.matched_keywords.join(", ")}</li>`);
                $("#resultList").append(`<li>📅 Word Count: ${response.analysis.word_count}</li>`);
                $("#resultList").append(`<li>💯 Match Score: ${response.analysis.keyword_match_score.toFixed(2)}%</li>`);
            },
            error: function () {
                alert("Error analyzing resume! Please try again.");
            },
        });
    });
});
