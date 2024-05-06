
interface ModalProps  {
    showModal: boolean;
    toogleFunc: (show:boolean) => void
    title: string;
    children: React.ReactNode;
    size?:string;
}


export const Modal:React.FC<ModalProps> = ({showModal,title,children,toogleFunc,size = 'none'}) => {
  
  const sizeModal ={
    none:'',
    xs:'max-w-xs',
    sm:'max-w-sm',
    md:'max-w-md',
    lg:'max-w-lg',
    xl:'max-w-xl',
    '2xl':'max-w-2xl',
    '3xl':'max-w-3xl'
  }

  const realSize = sizeModal[size as keyof typeof sizeModal] ? sizeModal[size as keyof typeof sizeModal]  :'';
  
  return (
    <>
       { showModal && (
            <div
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className={`relative p-4 w-full ${realSize} max-h-full z-50`}>
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                            </h3>
                            <button
                            onClick={ () => toogleFunc(false)}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                            >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        {children}
                    </div>
                </div>
                <div className="absolute w-full min-h-screen bg-black bg-opacity-30 z-0"></div>
            </div>

       )}
    </>
    
  )
}
