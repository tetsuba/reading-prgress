import data from '../api/walter.json'
import Speech from '../Components/Speech/Speech'
import Header from '../Components/Header/Header'

export default function ReadingView() {
  return (
    <>
      <Header text="Reading Exercise" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl">Book: {data.books[0].name}</h2>
            <div className="min-h-96 rounded-lg border-4 border-dashed border-gray-200 p-4">
              <div className="reading-view">
                <Speech story={data.books[0].story} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
