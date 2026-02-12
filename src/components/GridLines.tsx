import useScreenSize from "../hooks/useScreenSize";

interface GridLineProps {
  sectionId?: string;
}

const GridLines = ({ sectionId }: GridLineProps) => {
  const screenSize: string = useScreenSize();
  const length: number =
    screenSize === "xs"
      ? 3
      : screenSize === "sm" || screenSize === "md"
      ? 5
      : 10;

  return (
    <div className={`${(sectionId === 'navbar' || sectionId === 'footer') && 'w-11/12 mx-auto'} absolute inset-0 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 pointer-events-none z-[-1]`}>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`${i < length - 1 ? 'border-l-1' : 'border-x-1'} ${sectionId !== 'footer' ? 'border-gray-800/10 dark:border-white/15' : 'dark:border-gray-800/10 border-white/15'}`}
        ></div>
      ))}
    </div>
  );
};

export default GridLines;
