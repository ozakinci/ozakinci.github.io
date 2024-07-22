function calculateTimeDifference(startDate, endDate) {
    const diff = endDate - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);

    return {
        years,
        months,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
    };
}

function updateTimers() {
    const now = new Date();
    const resultsContainer = document.getElementById('result');
    resultsContainer.innerHTML = ''; // Clear previous results

    const birthdayEntries = document.querySelectorAll('.birthday-entry');

    birthdayEntries.forEach(entry => {
        const name = entry.getAttribute('data-name');
        const targetDate = new Date(entry.getAttribute('data-date'));
        const isFuture = targetDate > now;

        const timeDiff = isFuture ? calculateTimeDifference(now, targetDate) : calculateTimeDifference(targetDate, now);
        const message = isFuture
            ? `Countdown to ${name}'s birthday: ${timeDiff.years} years ${timeDiff.months} months ${timeDiff.days} days ${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`
            : `Countup since ${name}'s birthday: ${timeDiff.years} years ${timeDiff.months} months ${timeDiff.days} days ${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`;

        // Create a new div element for each birthday
        const resultDiv = document.createElement('div');
        resultDiv.textContent = message;
        resultsContainer.appendChild(resultDiv);
    });
}

// Update every second
setInterval(updateTimers, 1000);

// Initial update
updateTimers();
