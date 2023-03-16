import { useState } from 'react'
import speechToText from '../../lib/speechToText'
import Button from '../Button/Button'
import { WordTypes } from '../../Views/Reading/Sentence'
import {
    allWordsAreCorrect,
    updateSentence
} from '../../Views/Reading/reading-utils'

type PropTypes = {
    story: WordTypes[][]
    count: number
    setCount: (count: number) => void
    setStory: (story: WordTypes[][]) => void
}

const MIC_ON = 'text-green-500'
const MIC_OFF = 'text-red-500'

export default function Speech(props: PropTypes) {
    const { story, count, setStory, setCount } = props
    const [micOn, setMicOn] = useState(false)
    const [speech, setSpeech] = useState('')

    function stop() {
        speechToText && speechToText.stop()
    }

    function start() {
        speechToText && speechToText.start()
    }

    if (speechToText) {
        speechToText.onresult = (event: SpeechRecognitionEvent) => {
            const { transcript } = event.results[event.results.length - 1][0]
            const speech = transcript.toLowerCase().split(' ')
            setSpeech(transcript)

            story[count] = updateSentence(story, count, speech)
            setStory([...story])
            if (allWordsAreCorrect(story, count)) {
                setCount(count + 1)
            }
        }
        speechToText.onend = (event) => {
            setMicOn(false)
            setSpeech('')
            stop()
        }
    }

    return (
        <div className="mb-3 flex place-content-between">
            <span className="place-self-start">{speech}</span>
            <Button
                dataTestid="speech-button"
                svg="mic"
                template="icon"
                type="button"
                className={`${
                    micOn ? MIC_ON : MIC_OFF
                } p-2 hover:border-white hover:bg-gray-100 focus:outline-none`}
                clickHandler={() => {
                    setMicOn(!micOn)
                    micOn ? stop() : start()
                }}
            />
        </div>
    )
}
