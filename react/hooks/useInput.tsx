import { useState, useEffect, useCallback } from 'react'

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue)

    const onChange = useCallback(
        (e: EventInterface) => setValue(e.target.value),
        []
    )

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return {
        value,
        onChange
    }
}

export default useInput