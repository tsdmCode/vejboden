export const saveBoothToLocalStorage = (boothId) => {
  const saved = JSON.parse(localStorage.getItem('vejbodensavedbooths') || '[]');
  if (!saved.includes(boothId)) {
    saved.push(boothId);
    localStorage.setItem('vejbodensavedbooths', JSON.stringify(saved));
  }
};