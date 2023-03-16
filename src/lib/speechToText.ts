export default (function speechToText(SPR) {
    if (SPR) {
        const recognition: SpeechRecognition = new SPR()
        recognition.continuous = true
        recognition.lang = 'en-US'
        recognition.interimResults = true // This triggers the onResults a lot faster
        recognition.maxAlternatives = 1

        recognition.onaudiostart = () => console.log('[START]: Audio')
        recognition.onsoundstart = () => console.log('[START]: Sound')
        recognition.onspeechstart = () => console.log('[START]: Speech')
        recognition.onspeechend = () => console.log('[END]: Speech')
        recognition.onsoundend = () => console.log('[END]: Sound')
        recognition.onaudioend = () => console.log('[END]: Audio')

        recognition.onnomatch = () => console.log('[No Match]')
        recognition.onerror = () => console.log('[No Error]')
        recognition.onstart = () => console.log('[Start]')
        recognition.onend = () => console.log('[End]')
        recognition.onresult = () => console.log('[RESULT]')

        return recognition
    }
})(window.SpeechRecognition || webkitSpeechRecognition)
