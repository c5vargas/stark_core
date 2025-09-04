import { useState } from 'react';

type FormValues = Record<string, any>;
type FormErrors = Record<string, string[]> | null;

const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: [],
    }));
  };

	const setFormValues = (formData: T) => {
		setValues(formData);
	}

  const handleSubmit = async (callback: (values: FormValues) => Promise<void>) => {
    try {
      await callback(values);
      setErrors(null);
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors || null);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const renderErrors = (fieldName: string, errors: FormErrors) => {
    if (errors?.[fieldName]) {
      return errors[fieldName].map((error) => (
        <span key={error} className="text-red-500 text-xs">{error}</span>
      ));
    }
    return null;
  };

  return { values, errors, handleChange, handleSubmit, setFormValues, renderErrors };
};

export default useForm;
