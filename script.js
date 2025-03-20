$(document).ready(function () {
    // Show selected file name
    $("#resume").change(function () {
        let file = this.files[0];
        if (file) {
            $("#fileName").text(file.name);
        } else {
            $("#fileName").text("No file selected");
        }
    });

    // Handle Form Submission
    $("#uploadForm").submit(function (event) {
        event.preventDefault();

        let formData = new FormData(this);
        $("#progressContainer").removeClass("hidden");

        // Simulate Progress
        let progressBar = $(".progress-bar");
        progressBar.css("width", "0%");
        let progress = 0;
        let interval = setInterval(function () {
            progress += 25;
            progressBar.css("width", progress + "%");

            if (progress >= 100) clearInterval(interval);
        }, 500);

        // Upload & Analyze
        $.ajax({
            url: "https://ai-resume-checker-o2jh.onrender.com/upload", // Change this to your backend URL
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $("#resultContainer").removeClass("hidden");
                $("#resultList").empty();

                // Display Results
                $("#resultList").append(`<li><b>Skills:</b> ${response.skills_detected.join(", ")}</li>`);
                $("#resultList").append(`<li><b>Experience:</b> ${response.experience_level}</li>`);
                $("#resultList").append(`<li><b>Grammar Issues:</b> ${response.grammar_issues.length}</li>`);
                $("#resultList").append(`<li><b>Readability Score:</b> ${response.readability_score}/10</li>`);
            },
            error: function () {
                alert("Error analyzing resume! Please try again.");
            },
        });
    });
});
