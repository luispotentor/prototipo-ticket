
interface FormProps {
    numRows?:number;
}

export const Form:React.FC<FormProps> = ({numRows = 4}) => {

  const body = [];

  for ( let i = 1; i <= numRows; i++ ){
    body.push(
        <div className="w-full pt-4" key={i}>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-1/3 mb-2.5"></div>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    );
  }

  return (
    <div role="status" className="w-full p-4 animate-pulse ">
        {body}
        <span className="sr-only">Loading...</span>
    </div>

  )
}
