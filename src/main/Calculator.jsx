import React, {useState, setState, useEffect} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

export default props => {
    const [displayValue, setDisplayValue] = useState('0')
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operation, setOperation] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0)

    const clearMemory = () => {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperation(null)
        setValues([0, 0])
        setCurrentArrayIndex(0)
    }

    const addOperation = newOperation => {
        if (currentArrayIndex === 0) {
            setOperation(newOperation)
            setCurrentArrayIndex(1)
            setClearDisplay(true)
        } else {
            const finish = newOperation === '='
            const currentOperation = operation

            const valuesArray = [...values]
            try{
               valuesArray[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                valuesArray[0] = values[0]
            }
            valuesArray[1] = 0

            setDisplayValue(valuesArray[0])
            setOperation(finish ? null : operation)
            setCurrentArrayIndex(finish ? 0 : 1)
            setClearDisplay(!finish)
            setValues(valuesArray)
        }
    }

    const addDigit = n => {
        if(n === '.' && displayValue.includes('.')) {
            return
        }

        const clear = displayValue === '0' || clearDisplay
        const currentValue = clear ? '' : displayValue
        const newDisplayValue = currentValue + n
        setDisplayValue(newDisplayValue)
        setClearDisplay(false)

        if(n !== '.') {
            const i = currentArrayIndex
            const newValue = parseFloat(newDisplayValue)
            const currentValues = [...values]
            currentValues[i] = newValue
            setValues(currentValues)
        }
    }
    return (
        <div className="calculator">
            <Display value={displayValue} />
            <Button label="AC" click={clearMemory} triple/>
            <Button label="/" click={addOperation} operation/>
            <Button label="7" click={addDigit}/>
            <Button label="8" click={addDigit}/>
            <Button label="9" click={addDigit}/>
            <Button label="*" click={addOperation} operation/>
            <Button label="4" click={addDigit}/>
            <Button label="5" click={addDigit}/>
            <Button label="6" click={addDigit}/>
            <Button label="-" click={addOperation} operation/>
            <Button label="1" click={addDigit}/>
            <Button label="2" click={addDigit}/>
            <Button label="3" click={addDigit}/>
            <Button label="+" click={addOperation} operation/>
            <Button label="0" click={addDigit} double/>
            <Button label="." click={addDigit}/>
            <Button label="=" click={addOperation} operation/>
        </div>
    )
}