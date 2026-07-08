type ApiErrorData = {
    message?: string | string[];
    error?: string;
};

type ApiError = {
    response?: {
        data?: ApiErrorData;
    };
};

export function getAuthErrorMessage(
    error: unknown,
    fallbackMessage: string,
) {
    const apiError = error as ApiError;
    const message = apiError.response?.data?.message;

    if (Array.isArray(message)) {
        return message.join(" ");
    }

    if (typeof message === "string") {
        return message;
    }

    if (typeof apiError.response?.data?.error === "string") {
        return apiError.response.data.error;
    }

    return fallbackMessage;
}