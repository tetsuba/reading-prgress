import { useState } from 'react'
import speechToText from '../../lib/speechToText'
import Button from '../Button/Button'
import { WordTypes } from '../../Views/Reading/Sentence'
import {
    allWordsAreCorrect,
    updateSentence
} from '../../Views/Reading/reading-utils'

type PropTypes = {
    story: any
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

    // TODO: fix types any
    speechToText.onresult = (event: any) => {
        const { transcript } = event.results[event.results.length - 1][0]
        const speech = transcript.toLowerCase().split(' ')
        setSpeech(transcript)

        story[count] = updateSentence(story, count, speech)
        setStory([...story])
        if (allWordsAreCorrect(story, count)) {
            setCount(count + 1)
        }
    }
    speechToText.onend = (event: any) => {
        setMicOn(false)
        setSpeech('')
        speechToText.stop()
        console.log('[End]')
    }

    return (
        <div className="mb-3 flex w-full place-content-between">
            <span className="place-self-start pl-8">{speech}</span>
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
                    micOn ? speechToText.stop() : speechToText.start()
                }}
            />
        </div>
    )
}
