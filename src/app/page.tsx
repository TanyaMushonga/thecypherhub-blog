import Latestblog from "@/components/latestblog";
import Mostpopular from "@/components/mostpopular";

export default function Home() {
  return (
    <div className="pt-10">
      <div className="md:w-3/4 w-full mx-auto p-5 flex flex-col gap-5">
        <Latestblog />
        <Mostpopular />
      </div>
    </div>
  );
}
