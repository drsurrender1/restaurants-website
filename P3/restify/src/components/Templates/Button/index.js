const Button = ({ value, update, isOperator }) => {
    const style = !isOperator ? {backgroundColor: 'black', color: 'white'} : {backgroundColor: 'orange', color: 'white'}
    return <button
        style={{...style, "margin-left":"20%","margin-right":"20%"}}
        onClick={() => update(value)}

    >
        {value}
    </button>
}

export default Button;