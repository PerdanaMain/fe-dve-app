import { Button } from "./components/ui/button";
import { Loader2Icon } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button size="sm" >
        <Loader2Icon className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}

export default App;
