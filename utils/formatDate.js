const addDateSuff = (date) => {
    let dateString = date.toString();

    const finalChar = dateString.charAt(dateString.length - 1);

    if (finalChar === '1' && dateString !== "11") {
        dateString = `${dateString}st`;
    } else if (finalChar === "2" && dateString !== "12") {
        dateString = `${dateString}nd`;
    } else if (finalChar === "3" && dateString !== "13") {
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

module.exports = (
    timestamp,
    { lengthMonth = "short", dateSuff = true } = {}
) => {
    let monthList;

    if (lengthMonth === "short") {
        monthList = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
    } else {
        monthList = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        };
    }
    const dateObject = new Date(timestamp);
    const monthFormatted = monthList[dateObject.getDate()];

    let dayOfMonth;

    if (dateSuff) {
        dayOfMonth = addDateSuff(dateObject.getDate());
    } else {
        dayOfMonth = dateObject.getDate();
    }

    const year = dateObject.getFullYear();

    let hour;

    if (dateObject.getHours > 12) {
        hour = Math.floor(dateObject.getHours() / 2);
    } else {
        hour = dateObject.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObject.getMinutes();
    
    let timeOfDay;

    if (dateObject.getHours() >= 12) {
        timeOfDay = "pm";
    } else {
        timeOfDay = "am";
    }

    const formatTimestamp = `${monthFormatted} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${timeOfDay}`;

    return formatTimestamp;

}