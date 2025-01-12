/**
+ * Formats a date string into a localized date-time string
+ * @param {string} dateString - The date string to format
+ * @returns {string} Formatted date string or "Invalid Date" if parsing fails
+ */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};