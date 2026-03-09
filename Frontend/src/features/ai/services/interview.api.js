import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description This function generates an interview report based on the provided resume file,
 *  self-description, and job description. It sends a POST request to the server with the form data containing the resume file and descriptions. The server processes the data and returns an interview report, which is then returned by this function.
  @returns  The generated interview report based on the provided resume file, self-description, and job description.
 */

export const GenrateInterviewReport = async ({resumeFile,selfDescription,jobDescription,}) =>{
  const formData = new FormData();  
  formData.append("resumeFile", resumeFile);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const res = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/**
 * @description This function retrieves an interview report based on the provided interview ID. It sends a GET request to the server with the interview ID as a parameter. The server processes the request and returns the corresponding interview report, which is then returned by this function.
 * @returns  The interview report corresponding to the provided interview ID.
 */

export const GenrateInterviewbyId = async ({interviewId}) =>{
  const res = await api.get(`/api/interview/${interviewId}`);
  return res.data;
};

/**
 * @description This function retrieves all interview reports. It sends a GET request to the server to fetch all interview reports. The server processes the request and returns a list of all interview reports, which is then returned by this function.
 * @returns  A list of all interview reports.
 */

export const GenrateAllInterviews = async () =>{
  const res = await api.get("/api/interview/");
  return res.data;
}