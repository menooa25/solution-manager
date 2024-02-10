import ReactFlowThoughtsContainer from "../ui/thoughts/ReactFlowThoughtsContainer";
import ThoughtsNodeProvider from "../ui/thoughts/ThoughtsNodeProvider";

export default function Home() {
  return (
    <main>
      <ThoughtsNodeProvider>
        <ReactFlowThoughtsContainer />
      </ThoughtsNodeProvider>
    </main>
  );
}
