const ImgWrapperHalf = ({ children, position }: { children: React.ReactNode, position: string }) => {
  const padding = position === "1" ? 'lg:pr-3' : 'lg:pl-3';
  return (
     <div className={`col-span-full lg:col-span-5 ${padding}`}>
        {children}
    </div>
  )
}

export default ImgWrapperHalf