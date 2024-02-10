import ReactFlowThoughtsContainer from "../ui/thoughts/ReactFlowThoughtsContainer";
import ReactFlowThoughtsProvider from "../ui/thoughts/ReactFlowThoughtsProvider";

export default function Home() {
  return (
    <main>
      <ReactFlowThoughtsProvider>
        <ReactFlowThoughtsContainer />
      </ReactFlowThoughtsProvider>
    </main>
  );
}
