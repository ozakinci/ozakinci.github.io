function startTimer() {
    const input = document.getElementById('dateInput').value;
    const result = document.getElementById('result');
    
    if (!input) {
        result.innerHTML = 'Please enter a date.';
        return;
    }

    const targetDate = new Date(input);
    const now = new Date();
    const isFuture = targetDate > now;

    function updateTimer() {
        const currentTime = new Date();
        const difference = targetDate - currentTime;
        
        let message;
        
        if (isFuture) {
            if (difference <= 0) {
                message = 'The event is happening now!';
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                message = `Countdown: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
            }
        } else {
            const elapsed = now - targetDate;
            const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
            message = `Countup: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        }

        result.innerHTML = message;
    }

    // Update every second
    setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();
}
