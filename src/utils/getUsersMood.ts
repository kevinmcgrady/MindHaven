import { Journal } from '@prisma/client';

export const getUsersMood = (journals: Journal[]) => {
  const moods = journals
    .slice(0, 3)
    .map((journal) => journal?.mood.toLowerCase());

  const uniqueMoods: string[] = [...new Set(moods)];

  if (journals.length === 1) {
    return {
      message: `You are ${moods[0]} today`,
      overallMood: moods[0],
    };
  }

  if (journals.length === 2) {
    return {
      message:
        uniqueMoods.length === 1
          ? `You are ${uniqueMoods[0]} today`
          : `You are ${uniqueMoods.join(' and ')} today`,
      overallMood: uniqueMoods.length === 1 ? uniqueMoods[0] : 'mixed',
    };
  }

  if (journals.length === 3) {
    if (uniqueMoods.length === 1) {
      return {
        message: `You are ${uniqueMoods[0]} today`,
        overallMood: uniqueMoods[0],
      };
    }

    if (uniqueMoods.length === 3) {
      return {
        message: `You are ${uniqueMoods[0]}, ${uniqueMoods[1]} and ${uniqueMoods[2]} today`,
        overallMood: 'mixed',
      };
    }

    const overallMood = uniqueMoods.find(
      (mood) => moods.filter((m) => m === mood).length > 1,
    );

    const otherMood = uniqueMoods.find((mood) => mood !== overallMood);

    return {
      message: `You are ${overallMood} overall today and ${otherMood}`,
      overallMood,
    };
  }
};
