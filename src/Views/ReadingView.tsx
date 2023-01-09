import data from "../api/walter.json";
import Speech from "../Components/Speech/Speech";

export default function ReadingView() {
  return (
    <div className="reading-view">
      <h2>{data.books[0].name}</h2>
      <Speech story={data.books[0].story} />
    </div>
  );
}
