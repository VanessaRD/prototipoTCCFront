import { useContext } from 'react';

function Input(props) {

    const { label, id, type, Context, name } = props;
    const { objeto, handleChange } = useContext(Context);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className='FormInput'>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                className="form-control"
                id={id}
                type={type}
                name={name}
                value={objeto[name]}
                onChange={handleChange}
                required
            />
            <div className="valid-feedback">
                {label} OK
            </div>
            <div className="invalid-feedback">
                Informe o {label}
            </div>
        </div>
        
    )
}

export default Input;