import { SubmissionError } from 'redux-form';

export const fetchErrorHandler = async (response: Error | Response) => {
    if (response instanceof Response) {
        const textResult = await response.text();
        return new SubmissionError({
            _error: textResult
        });
    }
    return response;
};