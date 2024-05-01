import React, { useState } from 'react'

function MenuManagement(props) {

    const [listMenu, setListMenu] = useState([
        {
            row:1,
            title:"صفحه اصلی",
            iconURL:"",
            sortNum:1,
            route:'/home',
            date:'',
            status:false,
        }
    ]);


  return (
    <div className={`table-wrapper flex flex-col-reverse my-8  ml-10 px-4 `} style={{ transition:' all 0.3s ease',marginRight:props.isOpen?'260px':'70px'}}>
        <p className='fs-4'>فهرست سایت</p>
        <div className="my-5 relative overflow-x-auto max-h-96 overflow-y-auto shadow rounded border-1 border-zinc-800">
            <table className="w-full text-sm text-left rtl:text-right  ">
                <thead className="text-xs text-gray-900  border-b border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-l border-neutral-500">
                                ردیف
                            </th>
                            <th scope="col" className="px-6 py-3 border-l border-neutral-500">
                                عنوان
                            </th>
                            <th scope="col" className="px-6 py-3 border-l border-neutral-500">
                                آیکون فهرست
                            </th>
                            <th scope="col" className="px-6 py-3 border-l border-neutral-500">
                                ترتیب
                            </th>
                            <th scope="col" className="px-6 py-3 border-l border-neutral-500">
                                لینک
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                تاریخ
                            </th>
                            <th scope="col" className="w-10">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listMenu.map((obj,index)=>{
                                return(
                                    <tr className="bg-white text-black border-b-0 ">
                                        <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap border-l border-neutral-500 ">
                                            {obj.row}     
                                        </th>
                                        <td className="px-6 py-4 border-l border-neutral-500">
                                            {obj.title}
                                        </td>
                                        <td className="px-6 py-4 border-l border-neutral-500">
                                            {obj.iconURL}
                                        </td>
                                        <td className="px-6 py-4 border-l border-neutral-500">
                                            {obj.sortNum}
                                        </td>
                                        <td className="px-6 py-4 border-l border-neutral-500">
                                            {obj.route}
                                        </td>
                                        <td className="px-6 py-4 border-l border-neutral-500">
                                            {obj.date}
                                        </td>
                                        <td className="flex flex-col p-1">
                                            <button className={`btn ${obj.status?'btn-success':'btn-danger'} py-1`} >{obj.status?'فعال':'غیرفعال'}</button>
                                            <i className='bi bi-pencil-square btn btn-secondary py-1 my-1'></i>
                                            <i className='bi bi-trash btn btn-danger py-1 my'></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default MenuManagement
