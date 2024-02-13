import convertDateFormat from 'src/utils/convertDateFormat';
import axios from 'axios';

export const createChallenge = async (challenge) => {
  try {
    const accessToken = localStorage.getItem('AccessToken');
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_DEPLOY}api/challenge/register`, {
      challengeTitle: challenge.challengeTitle,
      challengeContent: challenge.challengeContent,
      challengeGoal: challenge.challengeGoal,
      submission: challenge.submission,
      startDate: String(convertDateFormat(challenge.startDate)),
      endDate: String(convertDateFormat(challenge.endDate)),
      categoryName: challenge.categoryName,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
}