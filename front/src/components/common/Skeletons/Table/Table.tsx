
export const Table = ( {cols = 3,rows = 4}) => {

  const header = [];
  const body = [];
  let rowContent = [];
 

  for( let i = 1; i <= cols; i++) {
    header.push(<td key={i}  className="px-5 py-3 border-b-2"><div className="h-2.5 bg-gray-300 rounded-full  w-full mb-2.5"></div></td>);
    
  }

  for( let k = 1; k <= rows; k++ ){

    for( let n = 1; n <= cols; n++) {
        rowContent.push(<td key={n} className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><div className="w-full h-2 bg-gray-200 rounded-full "></div></td>)
    }  

    body.push(<tr key={k}>{rowContent}</tr>)
    rowContent = [];
  }
  return (
    <div className="w-100 rounded-xl  bg-slate-50 shadow-md overflow-auto  animate-pulse">
        <table className=" min-h-full leading-normal w-full py-4">
            <thead>
                <tr>
                    { header}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
            <tfoot></tfoot>
        </table>
    </div>
  )
}
