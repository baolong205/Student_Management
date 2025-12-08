
export const getCreditColor = (credits) => {
  if (credits >= 4) return 'error';
  if (credits >= 3) return 'warning';
  return 'success';
};
export const calculateTotalCredits = (subjects) => {
  return subjects.reduce((total, subject) => total + subject.credits, 0);
};

// Phân loại môn học theo số tín chỉ
export const categorizeSubjects = (subjects) => {
  return {
    low: subjects.filter(s => s.credits <= 2),
    medium: subjects.filter(s => s.credits === 3),
    high: subjects.filter(s => s.credits >= 4),
  };
};

// Sắp xếp môn học
export const sortSubjects = (subjects, criteria = 'name') => {
  const sorted = [...subjects];
  switch (criteria) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'credits':
      return sorted.sort((a, b) => b.credits - a.credits);
    case 'created':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sorted;
  }
};