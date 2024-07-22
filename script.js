const targetDate = new Date('2024-12-31T23:59:59'); // Replace with your target date
const result = document.getElementById('result');

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

function updateTimer() {
    const now = new Date();
    const timeDiff = targetDate > now ? calculateTimeDifference(now, targetDate) : calculateTimeDifference(targetDate, now);
    const isFuture = targetDate > now;

    const message = isFuture
        ? `Countdown: ${timeDiff.years} years ${timeDiff.months} months ${timeDiff.days} days ${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`
        : `Countup: ${timeDiff.years} years ${timeDiff.months} months ${timeDiff.days} days ${timeDiff.hours} hours ${timeDiff.minutes} minutes ${timeDiff.seconds} seconds`;

    result.innerHTML = message;
}

// Update every second
setInterval(updateTimer, 1000);

// Initial update
updateTimer();
