export const formatFirebaseDate = (
    seconds: number,
    nanoseconds: number
): string => {
    const newDate = new Date(seconds * 1000 + nanoseconds / 1000000);
    return newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export function isDateBeforeToday(dateToCheck) {
    // Create a new Date object for today's date
    let today = new Date();

    // Set the time part of today's date to 00:00:00 to only compare dates
    today.setHours(0, 0, 0, 0);

    // Create a new Date object from the provided date to check
    let date = new Date(dateToCheck);

    // Compare the two dates
    return date < today;
}

export function convertDateToSecondsAndNanos(createdDate) {
    // Check if createdDate is a valid Date object
    if (!(createdDate instanceof Date)) {
        throw new Error("Invalid date object provided");
    }

    const seconds = Math.floor(createdDate.getTime() / 1000);
    const approximateNanoseconds = (createdDate.getTime() % 1000) * 1000000; // Get milliseconds remainder and convert to nanoseconds

    return {
        seconds,
        nanoseconds: approximateNanoseconds,
    };
}

export const formatDateString = (dateString: string): string => {
    if (!dateString) {
        return "Not Valid Date";
    }
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 for comparison

    // Get yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Get tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Check if the provided date is yesterday
    if (date.getTime() === yesterday.getTime()) {
        return "Yesterday";
    } else if (date.getTime() === today.getTime()) {
        return "Today";
    } else if (date.getTime() === tomorrow.getTime()) {
        return "Tomorrow";
    } else {
        // Array of month names
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // Extract day, month, and year
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    }
};
