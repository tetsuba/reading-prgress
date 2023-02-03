const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// const colors = [ 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', /* … */ ];
// const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

const speechToText = (function (SpeechGrammarList, SpeechRecognition) {
    // const speechRecognitionList = new SpeechGrammarList();
    const recognition = new SpeechRecognition()

    // speechRecognitionList.addFromString(grammar, 1);
    // recognition.grammars = speechRecognitionList;
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

    return function () {
        return recognition
    }
})(SpeechGrammarList, SpeechRecognition)

export default speechToText()
