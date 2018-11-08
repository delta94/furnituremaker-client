import { SubmissionError } from 'redux-form';

export const fetchErrorHandler = async (response: Error | Response) => {
    if (response instanceof Response) {
        // tslint:disable-next-line:no-any
        let content: any;
        try {
            const json = await response.json();
            if (json.message) {
                content = json.message;
            } else {
                content = json;
            }
        } catch (error) {
            content = await response.text();
        }

        return new SubmissionError({
            _error: content
        });
    }
    return response;
};