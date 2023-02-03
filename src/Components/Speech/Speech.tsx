import { useEffect, useState } from 'react'
import speechToText from '../../lib/speechToText'

const STATUS = {
    CORRECT: 'correct',
    WRONG: 'wrong'
}

function createWordList(story: string) {
    const list: string[] = story.replace(/[^\w' ]/g, '').split(' ')

    return (
        list
            // .filter((word, index) => {
            //     return list.indexOf(word) === index;
            // })
            .map((word) => ({
                word: word,
                correct: false,
                status: ''
            }))
    )
}

type SpeechTypes = {
    story: string
}

const Speech = ({ story }: SpeechTypes) => {
    const [wordList, setWordList] = useState(createWordList(story))

    speechToText.onresult = (event) => {
        const { transcript } = event.results[event.results.length - 1][0]
        console.log('[RESULT]: ', transcript)
        const speech = transcript
            .toLowerCase()
            .replace(/[^\w ]/g, '')
            .split(' ')

        const update = wordList.map((wordObj) => {
            if (speech.includes(wordObj.word.toLowerCase().replace("'", ''))) {
                return {
                    ...wordObj,
                    status: STATUS.CORRECT
                }
            }
            return wordObj
        })
        setWordList(update)
    }

    return (
        <div>
            <button
                onClick={() => {
                    speechToText.start()
                    console.log('Ready to receive a color command.')
                }}
            >
                Start
            </button>
            <button
                onClick={() => {
                    speechToText.stop()
                    console.log('Stop recognition')
                }}
            >
                Stop
            </button>
            <div className="min-h-96 rounded-lg border-4 border-dashed border-gray-200 p-4">
                {wordList.map(({ word, status }, i) => (
                    <button
                        className={`word-button ${status}`}
                        key={`button--${i}`}
                        onClick={() => {
                            wordList[i].status =
                                wordList[i].status === STATUS.CORRECT
                                    ? STATUS.WRONG
                                    : STATUS.CORRECT
                            setWordList([...wordList])
                        }}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Speech
