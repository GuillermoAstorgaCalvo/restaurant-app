export function generateTimeSlots(
  startHour = 12,
  endHour = 23,
  interval = 30,
): string[] {
  const timeSlots: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const time = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  return timeSlots;
}

export function combineDateAndTime(date: Date, timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes);
  return newDate;
}
