const LazyLoad = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div> */}
      {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
      <div className="overflow-x-auto rounded-xl bg-muted/50 p-4">
        <table className="min-w-full animate-pulse">
          <thead>
            <tr>
              <th className="px-4 py-2">
                <div className="h-4 w-24 rounded bg-muted/70" />
              </th>
              <th className="px-4 py-2">
                <div className="h-4 w-24 rounded bg-muted/70" />
              </th>
              <th className="px-4 py-2">
                <div className="h-4 w-24 rounded bg-muted/70" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 rounded bg-muted/60" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 rounded bg-muted/60" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 rounded bg-muted/60" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LazyLoad;
