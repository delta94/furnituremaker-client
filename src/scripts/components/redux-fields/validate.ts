export const required = (message) => (value) => !value && (message || 'This field is required!');