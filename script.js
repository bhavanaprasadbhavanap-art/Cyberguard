// ================================
// CYBERSHIELD LINK CHECKER
// ================================
// Store submitted reports
let reports = [];
const checkButton = document.getElementById("checkButton");

checkButton.addEventListener("click", function () {

    const url = document.getElementById("urlInput").value.trim();
    const result = document.getElementById("result");

    if (url === "") {
        result.innerHTML = "⚠️ Please enter a website link.";
        return;
    }

    const lowerUrl = url.toLowerCase();

    let riskScore = 0;
    let reasons = [];

    // Check HTTPS
    if (!lowerUrl.startsWith("https://")) {
        riskScore++;
        reasons.push("❌ Website does not use HTTPS");
    }

    // Check URL length
    if (url.length > 75) {
        riskScore++;
        reasons.push("⚠️ URL is unusually long");
    }

    // Check @ symbol
    if (url.includes("@")) {
        riskScore++;
        reasons.push("⚠️ URL contains an @ symbol");
    }
    // Check for IP address in URL
const ipPattern = /https?:\/\/\d+\.\d+\.\d+\.\d+/;

if (ipPattern.test(lowerUrl)) {
    riskScore++;
    reasons.push("⚠️ URL uses an IP address instead of a domain name");
}

    // Check suspicious words
    const suspiciousWords = ["login", "verify", "update", "free"];

    suspiciousWords.forEach(function(word) {

        if (lowerUrl.includes(word)) {
            riskScore++;
            reasons.push("⚠️ Contains suspicious keyword: " + word);
        }

    });

    // Show result
    if (riskScore >= 3) {
        result.className="high-risk";

        result.innerHTML =
            "<h3>🚨 HIGH RISK</h3>" +
            "<p><strong>Risk Score:</strong> " + riskScore + "</p>" +
            "<p><strong>Reasons:</strong></p>" +
            "<p>" + reasons.join("<br>") + "</p>" +
            "<p><strong>Recommendation:</strong><br>" +
            "Do not enter passwords or personal information.</p>";

    } else if (riskScore >= 1) {
        result.className="suspicious-risk";

        result.innerHTML =
            "<h3>⚠️ SUSPICIOUS</h3>" +
            "<p><strong>Risk Score:</strong> " + riskScore + "</p>" +
            "<p><strong>Reasons:</strong></p>" +
            "<p>" + reasons.join("<br>") + "</p>" +
            "<p><strong>Recommendation:</strong><br>" +
            "Verify the website before providing personal information.</p>";

    } else {
        result.className="low-risk";

        result.innerHTML =
            "<h3>✅ LOW RISK</h3>" +
            "<p>No suspicious characteristics were detected by our basic checks.</p>" +
            "<p><strong>Recommendation:</strong><br>" +
            "Still verify the website before sharing sensitive information.</p>";
    }

});


// ================================
// CYBERSHIELD THREAT REPORT
// ================================

const reportForm = document.getElementById("reportForm");

let totalThreats = 0;
let phishingReports = 0;
let scamReports = 0;
let suspiciousLinks = 0;

reportForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const threatType = document.getElementById("threatType").value;
    const reportedUrl = document.getElementById("reportedUrl").value.trim();
    const description = document.getElementById("description").value.trim();

    const reportResult = document.getElementById("reportResult");

    // Check if fields are empty
    if (
        threatType === "" ||
        reportedUrl === "" ||
        description === ""
    ) {

        reportResult.innerHTML =
            "⚠️ Please fill in all the fields.";

        return;
    }

    // Increase total reports
    totalThreats++;

    document.getElementById("threatCount").innerText =
        totalThreats;
        // Save the report
reports.push({
    type: threatType,
    url: reportedUrl,
    description: description
});
// Show saved reports
const reportsList = document.getElementById("reportsList");

reportsList.innerHTML =
    "<h3>📋 Recent Reports</h3>" +
    "<p><strong>Threat:</strong> " + threatType + "</p>" +
    "<p><strong>Link:</strong> " + reportedUrl + "</p>" +
    "<p><strong>Description:</strong> " + description + "</p>";

    // Count phishing reports
    if (threatType === "Phishing") {

        phishingReports++;

        document.getElementById("phishingCount").innerText =
            phishingReports;
    }

    // Count scam reports
    if (threatType === "Scam") {

        scamReports++;

        document.getElementById("scamCount").innerText =
            scamReports;
    }

    // Count malicious links
    if (threatType === "Malicious Link") {

        suspiciousLinks++;

        document.getElementById("linkCount").innerText =
            suspiciousLinks;
    }

    reportResult.innerHTML =
        "✅ Threat report submitted successfully!";

});
// Clear button

const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function() {

    document.getElementById("urlInput").value = "";

    document.getElementById("result").innerHTML = "";

});
