export const AUTH_KEY = 'reading-progress-auth-key'
export default {
    save: function (value: string): void {
        localStorage.setItem(AUTH_KEY, value)
    },
    get: function (): string {
        return localStorage.getItem(AUTH_KEY) || ''
    },
    remove: function (): void {
        localStorage.removeItem(AUTH_KEY)
    }
}
