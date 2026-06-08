export const getOpeningStatus = () => {
  const openingHours = {
    0: { day: "Sunday", open: null, close: null, closed: true },
    1: { day: "Monday", open: 8, close: 18 },
    2: { day: "Tuesday", open: 8, close: 18 },
    3: { day: "Wednesday", open: 8, close: 18 },
    4: { day: "Thursday", open: 8, close: 18 },
    5: { day: "Friday", open: 8, close: 18 },
    6: { day: "Saturday", open: 9, close: 14 },
  };

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const today = openingHours[day];

  if (!today) {
    return { isOpen: false, isClosed: false, status: "unknown" };
  }

  if (today.closed) {
    return { isOpen: false, isClosed: true, status: "closed" };
  }

  const isOpen = hour >= today.open && hour < today.close;

  return {
    isOpen,
    isClosed: !isOpen,
    status: isOpen ? "open" : "closed",
  };
};
