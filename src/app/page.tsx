import dynamic from "next/dynamic";

const ArticleTabs = dynamic(() => import("@/components/articleTabs"), {
  ssr: false,
});
const Latestblog = dynamic(() => import("@/components/latestblog"), {
  ssr: false,
});
const Mostpopular = dynamic(() => import("@/components/mostpopular"), {
  ssr: false,
});

export default function page() {
  return (
    <div className="pt-10">
      <div className="xl:w-3/4 w-full mx-auto p-5 flex flex-col gap-5">
        <Latestblog />
        <Mostpopular />
        <ArticleTabs />
      </div>
    </div>
  );
}
