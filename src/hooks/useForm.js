import { useEffect, useState } from "react"

export const useForm = (initialForm, validateForm, addForm, closeModal) => {
  const[form, setForm] = useState(initialForm);
  const[errors, setErrors] = useState({});
  const[loading, setLoading] = useState(false);
  const[response, setResponse] = useState(null);

  useEffect(() => {
    setForm(initialForm);
}, [initialForm]);

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({
        ...form,
        [name]: value
    })
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if(Object.keys(errors).length === 0) {
        alert("Enviando formulario");
        addForm(form);
        closeModal();

    } else {
        return;
    }

  };

  return {
    form, errors, loading, response, 
    handleChange, handleBlur, handleSubmit, setForm
  }

};
