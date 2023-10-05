'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function DraftButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Save Draft
        </button>
    )
}