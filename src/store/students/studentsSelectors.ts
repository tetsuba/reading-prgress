import { createSelector } from '@reduxjs/toolkit'
import moment from 'moment'
import { StateProgressTypes, StateTypes } from '../store.types'

import {
    currentBookIdSelector,
    currentCollectionIdSelector,
    currentStudentIdSelector
} from '../current/currentSelectors'
import { countDuplicates, dateIsAfterOne, formatDate } from '../store.utils'
import { SelectorStudentLastProgressTypes } from '../selector.types'

export const studentsSelector = (state: StateTypes) => state.students

export const studentSelector = createSelector(
    [studentsSelector, currentStudentIdSelector],
    (students, studentId) =>
        students.find((student) => student.studentId === studentId)
)

export const studentProgressSelector = createSelector(
    [studentSelector],
    (student): StateProgressTypes[] | undefined | null => student?.progress
)

export const studentProgressBookSelector = createSelector(
    [
        studentProgressSelector,
        currentCollectionIdSelector,
        currentBookIdSelector
    ],
    (progress, collectionId, bookId) =>
        progress
            ? progress.find(
                  (data) =>
                      data.collectionId === collectionId &&
                      data.bookId === bookId
              )
            : null
)

export const studentProgressBookHistorySelector = createSelector(
    [studentProgressBookSelector],
    (progressBook) => (progressBook ? progressBook.history : [])
)

export const studentNameSelector = createSelector(
    [studentSelector],
    (student) => (student ? `${student?.firstname} ${student?.lastname}` : '')
)

export const studentLastProgress = createSelector(
    [studentProgressSelector],
    (progress): SelectorStudentLastProgressTypes => {
        // moment
        if (progress) {
            return progress.reduce(
                (
                    capture: SelectorStudentLastProgressTypes,
                    data: StateProgressTypes
                ) => {
                    const { collectionId, bookId, history } = data
                    const lastStudentUpdate = {
                        collectionId,
                        bookId,
                        date: history[history.length - 1].date,
                        completed: history[history.length - 1].words.length < 1
                    }

                    if (capture === undefined) {
                        return [lastStudentUpdate]
                    }

                    const compareDate = formatDate(
                        capture[capture.length - 1].date
                    )
                    const newDate = formatDate(history[history.length - 1].date)

                    if (moment(newDate).isAfter(compareDate)) {
                        return [lastStudentUpdate]
                    } else if (moment(newDate).isSame(compareDate)) {
                        return [lastStudentUpdate, ...capture]
                    }

                    return capture
                },
                undefined
            )
        }
        return undefined
    }
)

export const progressWords = createSelector(
    [studentProgressSelector],
    (progress) => {
        if (progress) {
            const words = progress
                .map((data) => data.history)
                .flat()
                .reduce(
                    (acc, cur) => {
                        if (dateIsAfterOne('week', cur.date)) {
                            return {
                                ...acc,
                                oneWeekAgo: [...cur.words, ...acc.oneWeekAgo]
                            }
                        }
                        if (dateIsAfterOne('month', cur.date)) {
                            return {
                                ...acc,
                                oneMonthAgo: [...cur.words, ...acc.oneMonthAgo]
                            }
                        }
                        return {
                            ...acc,
                            history: [...cur.words, ...acc.history]
                        }
                    },
                    { oneWeekAgo: [''], oneMonthAgo: [''], history: [''] }
                )

            return {
                oneWeekAgo: countDuplicates(words.oneWeekAgo),
                oneMonthAgo: countDuplicates(words.oneMonthAgo),
                history: countDuplicates(words.history)
            }
        }
        return undefined
    }
)

export const filteredStudentProgressByCollectionId = createSelector(
    [studentProgressSelector, currentCollectionIdSelector],
    (progress, collectionId) =>
        progress?.filter((data) => data.collectionId === collectionId)
)
