import axios from 'axios';

const BASE_URL = 'http://localhost:3001/';

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

const questionPath = 'questions/';
const answersPath = 'answers/';

export const getAllQuestions = () => {
  return axiosApi.get(questionPath);
};

export const getAllAnswers = () => {
  return axiosApi.get(answersPath);
};

export const getQuestion = (id) => {
  return axiosApi.get(questionPath + id);
};

export const getAnswers = (id) => {
  return axiosApi.get(questionPath + id + `/${answersPath}`);
};

export const postAnswer = (id, answer) => {
  return axiosApi.post(questionPath + id + `/${answersPath}`, answer);
};

export const postQuestion = (question) => {
  return axiosApi.post(questionPath, question);
};

export const incrementViews = (id, views) => {
  return axiosApi.patch(questionPath + id, { views: views });
};

export const putViews = (id, obj) => {
  return axiosApi.put(questionPath + id, obj);
};

export const changeVotes = (id, votes) => {
  return axiosApi.patch(questionPath + id, { votes: votes });
};

export const changeAnswerVotes = (id, votes) => {
  return axiosApi.patch(answersPath + id, { votes: votes });
};

export const putAnswer = (id, answer) => {
  return axiosApi.patch(answersPath + id, answer);
};

export const convertDate = (date) => {
  const converted = new Date(date);
  return converted
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    .replace(',', ' at');
};
