export const AUTH_KEY = 'reading-progress-auth-key'
export const STUDENT_ID = 'reading-progress-studentId'

export default {
    save: function (value: string): void {
        localStorage.setItem(AUTH_KEY, value)
    },
    get: function (): string {
        return localStorage.getItem(AUTH_KEY) || ''
    },
    remove: function (): void {
        localStorage.removeItem(AUTH_KEY)
    },
    saveStudentId: function (value: number) {
        localStorage.setItem(STUDENT_ID, String(value))
    },
    getStudentId: function (): number | undefined {
        return Number(localStorage.getItem(STUDENT_ID)) || undefined
    },
    removeStudentId: function (): void {
        localStorage.removeItem(STUDENT_ID)
    }
}
