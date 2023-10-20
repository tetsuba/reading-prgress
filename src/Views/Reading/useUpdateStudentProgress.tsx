import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import * as R from 'ramda'

// STORE
import {
    currentBookIdSelector,
    currentCollectionIdSelector
} from '../../store/current/currentSelectors'
import {
    studentProgressBookSelector,
    studentSelector
} from '../../store/students/studentsSelectors'
import { addStudents } from '../../store/students/studentsSlice'
import { updateStudent } from '../../api/students'

// UTILS
import { transformStoryToTrackerHistory, WordType } from './reading-utils'
import { isArray } from '../../lib/utils'

// TYPES
import { StateStudentTypes, StateProgressTypes } from '../../store/store.types'

function bookIndex(collectionId: string, bookId: number) {
    return function findBook(
        data: StateProgressTypes[] | StateProgressTypes
    ): boolean {
        return isArray(data)
            ? (data as StateProgressTypes[]).some(
                  (book: StateProgressTypes) =>
                      book.collectionId === collectionId &&
                      book.bookId === bookId
              )
            : (data as StateProgressTypes).collectionId === collectionId &&
                  (data as StateProgressTypes).bookId === bookId
    }
}

function updateCurrentStudentProgress(
    currentStudent: StateStudentTypes,
    progress: StateProgressTypes[]
) {
    return {
        ...currentStudent,
        progress: JSON.stringify(progress)
    }
}

export default function useUpdateStudentProgress(
    setShowHistory: (v: boolean) => void
) {
    const dispatch = useDispatch()
    const collectionId = useSelector(currentCollectionIdSelector)
    const bookId = useSelector(currentBookIdSelector)
    const studentBookProgress = useSelector(studentProgressBookSelector)
    const currentStudent = useSelector(studentSelector)

    // SERVICES
    const mutation = useMutation(updateStudent, {
        onSuccess: (data) => {
            dispatch(addStudents(data.data))
            setShowHistory(true)
        }
    })

    const findBook = bookIndex(collectionId as string, bookId as number)

    const progress = R.isNil(studentBookProgress)
        ? { collectionId, bookId, history: [] }
        : studentBookProgress

    function updateStudentProgress(story: WordType[][]) {
        let studentUpdate
        const previousHistory = studentBookProgress
            ? studentBookProgress.history
            : []

        const studentProgressUpdate = {
            ...progress,
            history: transformStoryToTrackerHistory(story)
                .concat(previousHistory)
                .emit()
        } as StateProgressTypes

        if (currentStudent) {
            if (currentStudent.progress) {
                if (findBook(currentStudent.progress)) {
                    // Update a progress book
                    const studentProgress = currentStudent.progress.map(
                        (data) =>
                            findBook(data) ? studentProgressUpdate : data
                    )

                    studentUpdate = updateCurrentStudentProgress(
                        currentStudent,
                        studentProgress
                    )
                } else {
                    // Add a new progress book
                    studentUpdate = updateCurrentStudentProgress(
                        currentStudent,
                        [...currentStudent.progress, studentProgressUpdate]
                    )
                }
            } else {
                // Add the first progress book
                studentUpdate = updateCurrentStudentProgress(currentStudent, [
                    studentProgressUpdate
                ])
            }
            mutation.mutate(studentUpdate)
        }
    }

    return updateStudentProgress
}
