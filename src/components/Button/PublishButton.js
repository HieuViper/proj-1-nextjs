'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function PublishButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Save Publish
        </button>
    )
}