export type ValidationRule = {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    message?: string;
};

export type ValidationSchema<T> = Record<keyof T, ValidationRule[]>;

export type ValidationErrors<T> = Record<keyof T, string>;

export function validateForm<T extends Record<string, any>>(
    form: T,
    schema: ValidationSchema<T>
) {
    const errors: ValidationErrors<T> = {} as ValidationErrors<T>;
    let valid: boolean = true;

    for (const key in schema) {
        const value = String(form[key] ?? "").trim();
        const rules = schema[key];

        for (const rule of rules) {
            if (rule.required && !value) {
                errors[key] = rule.message || `${key} is required`;
                valid = false;
                break;
            }

            if (rule.minLength && value.length < rule.minLength) {
                errors[key] =
                    rule.message || `${key} must be at least ${rule.minLength} characters`;
                valid = false;
                break;
            }

            if (rule.pattern && !rule.pattern.test(value)) {
                errors[key] = rule.message || `${key} format is invalid`;
                valid = false;
                break;
            }
        }

        if (!errors[key]) errors[key] = "";
    }

    return { valid, errors };
}
