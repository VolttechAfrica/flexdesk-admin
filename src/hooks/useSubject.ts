import { apiService } from "@services/api/apiService"
import { API_URL } from "@config/constants"
import { GenAIResponse } from "@type/genAI"

interface CreateQuestionResponse {
    status: boolean,
    message: string
}

export const createSubjectMany = async (
    subjectId: string,
    sessionId: string,
    questions: GenAIResponse
): Promise<CreateQuestionResponse> => {

    try{
        const questionData  = {
            subjectId,
            sessionId,
            questions
        }
        const createSubject = await apiService.post(API_URL, '/subject/create', questionData);
        if(!createSubject) throw new Error('Failed to create subject, please try again')
        return Promise.resolve({
            status: true,
            message: 'Question successfully created'
        })
    } catch (error: any) {
        return Promise.reject({
            status: false,
            message: error?.message || 'Failed to create subject, please try again'
        })
    }
}

