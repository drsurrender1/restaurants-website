import React from 'react';

class Input extends React.Component {
    render(){
        const {className, type, placeholder, update, value, href} = this.props
        return <>
            <input type={type}
                    className={className}
                    placeholder={placeholder}
                   value={value}
                   onChange={event => update(event.target.value)}

                   //style={{width: 200, height: 40, fontSize: '2em'}}
            ></input>
        </>
    }
}

export default Input;