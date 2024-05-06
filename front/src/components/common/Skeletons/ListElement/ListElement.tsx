import { JSX } from "react";

interface PropsListElemnet {
    rows?:number;
}

export const ListElement:React.FC<PropsListElemnet> = ({rows = 1}) => {
  
  const rowsContent: JSX.Element[] = []
  const renderRow = () => {

    for (let i = 0; i < rows; i++) {
      rowsContent.push (
        <div key={i} className="animate-pulse flex ">
            <div className=" w-1/12 mx-1">
                <div  className=" w-full py-5 bg-white text-sm">
                    <div className=" w-full h-3 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className=" w-8/12 mx-1">
                <div  className="py-5 w-full bg-white text-sm">
                    <div className=" w-full h-3 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className=" w-1/12 mx-1">
                <div  className=" w-full py-5 bg-white text-sm">
                    <div className=" w-full h-3 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className=" w-1/12 mx-1">
                <div  className=" w-full py-5 bg-white text-sm">
                    <div className=" w-full h-3 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className=" w-1/12 mx-1 sm:hidden">
                <div  className=" w-full py-5 bg-white text-sm">
                    <div className=" w-full h-3 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className=" hidden  w-1/12 sm:flex justify-evenly items-center">
                <div className=" h-4 w-4 bg-gray-200 rounded-md mr-1 "></div>
                <div className=" h-4 w-4 bg-gray-200 rounded-md mr-1 "></div>
                <div className=" h-4 w-4 bg-gray-200 rounded-md "></div>
            </div>
        </div>
        )
    }

    return rowsContent;
  }

  return (
    <>{renderRow()}</>
  )
}
