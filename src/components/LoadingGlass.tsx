import { MagnifyingGlass } from "react-loader-spinner";

export function LoadingGlass() {
  return (
    <div className="dark:text-green-400 flex flex-col items-center h-full w-full text-black font-bold">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#7e22ce"
      />
    </div>
  );
}
