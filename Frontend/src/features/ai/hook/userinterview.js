import {GenrateInterviewReport,GenrateAllInterviews,GenrateInterviewbyId} from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../Interview.context";


export const useInterview = () => {
  
    const context = useContext(InterviewContext);
    if (!context) {
      throw new Error("useInterview must be used within an InterviewProvider");
    }

    const {setReport, setLoading,} = context;

    const generateReport = async ({resumeFile,selfDescription,jobDescription,}) => {
        setLoading(true);
        try {
          const response = await GenrateInterviewReport({resumeFile,selfDescription,jobDescription,});
          setReport(response.interViewReportByAi);
        } catch (error) {
          console.error("Error generating report:", error);
        } finally {
          setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
      setLoading(true);
        try {
            const response = await GenrateInterviewbyId(interviewId);
            setReport(response.interviewReport);
        } catch (error) {
            console.error("Error fetching report by ID:", error);
        }finally {
          setLoading(false);
        }

    };

    const getAllReports = async () => {
      setLoading(true);
        try {
            const response = await GenrateAllInterviews();
            setReports(response.interviewReports);  
        } catch (error) {
            clear.error("Error fetching all reports:", error);
        }finally {
          setLoading(false);
        }
    }

    return{
        generateReport,
        getReportById,
        getAllReports,
    }

}