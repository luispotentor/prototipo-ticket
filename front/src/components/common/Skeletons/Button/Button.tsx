

export const Button = ({style = ''}) => {
  return (
    <button className={`animate-pulse inline-flex items-center w-44 bg-gray-300 h-10 font-medium rounded-full  px-5 py-2.5 ${style} `} />
  )
}
