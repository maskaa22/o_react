import './Input.css';
import './Input@media.css';

export function Input(props) {
    return (
        <input value={props.value}
               onChange={(event) => props.setValue(event.target.value)}
               type={props.type} placeholder={props.placeholder} className={`input-focus ${props.className}`}
               readOnly={props.readOnly} id={props.id} onInput={props.onInput} name={props.name}
               onBlur={props.onBlur} maxLength={props.maxLength} minLength={props.minLength}
        />
    );
}
