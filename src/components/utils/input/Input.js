import './Input.css';

export function Input(props) {
    return (
        <input value={props.value}
               onChange={(event) => props.setValue(event.target.value)}
               type={props.type} placeholder={props.placeholder} className={'input-focus'} readOnly={props.readOnly}/>
    );
}
